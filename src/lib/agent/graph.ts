import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { agentLogs, datasets, experiments, projects } from "@/db/schema";
import type {
  AgentPhase,
  ExperimentConfig,
  ExperimentPlan,
  FinalReport,
} from "@/lib/domain";
import { createId } from "@/lib/id";
import { logger } from "@/lib/logger";
import { runSafeExperiment } from "@/lib/ml/engine";
import { formatMetric, metricValue } from "@/lib/ml/metrics";
import { configSignature, modelLabel, modelsForTask, paramKeysOf, sanitizeParams } from "@/lib/ml/registry";
import { logTrackingRun } from "@/lib/tracking/store";
import { completeJson } from "@/lib/agent/llm";
import {
  analyzeRuns,
  buildDirectionGuard,
  buildHeuristicPlan,
  describeObjectiveDirections,
  describeObjectives,
  objectivesOf,
  parseGoal,
  pickBestRunMulti,
  sanitizeStrategy,
  suggestNextExperiment,
  writeReport,
  type CompletedRun,
} from "@/lib/agent/policy";

async function writeLog(
  projectId: string,
  node: string,
  phase: AgentPhase,
  message: string,
  level: "info" | "success" | "warn" | "error" = "info",
  payload?: unknown,
  experimentId?: string,
) {
  await db.insert(agentLogs).values({
    id: createId("log"),
    projectId,
    experimentId,
    node,
    phase,
    level,
    message,
    payload: payload ?? null,
  });
}

async function setPhase(projectId: string, phase: AgentPhase, extra?: Partial<typeof projects.$inferInsert>) {
  await db
    .update(projects)
    .set({ phase, updatedAt: new Date(), ...extra })
    .where(eq(projects.id, projectId));
}

function asCompleted(rows: Array<typeof experiments.$inferSelect>): CompletedRun[] {
  return rows
    .filter((row) => row.status === "completed" && row.testMetrics)
    .map((row) => ({
      modelName: row.modelName,
      hyperparameters: sanitizeParams(row.modelName, row.hyperparameters),
      trainMetrics: row.trainMetrics,
      testMetrics: row.testMetrics,
      cvMetrics: row.cvMetrics,
    }));
}

export async function startProject(projectId: string) {
  const [project] = await db.select().from(projects).where(eq(projects.id, projectId));
  if (!project) throw new Error("Project not found");
  if (!project.datasetId) throw new Error("Select a dataset before starting");
  const [dataset] = await db.select().from(datasets).where(eq(datasets.id, project.datasetId));
  if (!dataset) throw new Error("Dataset not found");

  await db.delete(experiments).where(eq(experiments.projectId, projectId));
  await db.delete(agentLogs).where(eq(agentLogs.projectId, projectId));

  await setPhase(projectId, "analyzing_dataset", {
    status: "running",
    error: null,
    report: null,
    summary: null,
    bestExperimentId: null,
    iteration: 0,
    nextConfig: null,
  });
  await writeLog(
    projectId,
    "dataset_analyst",
    "analyzing_dataset",
    `Inspecting ${dataset.name}: ${dataset.rowCount} rows, ${dataset.featureColumns.length} features, target ${dataset.targetColumn}.`,
  );

  const parsed = parseGoal(project.goal, dataset.taskType);
  const top = dataset.stats.correlations?.slice(0, 4) ?? [];
  await writeLog(
    projectId,
    "dataset_analyst",
    "analyzing_dataset",
    `Task inferred as ${parsed.taskType}, optimizing ${describeObjectives(parsed.objectives)}. Strongest linear signals against the target ${dataset.targetColumn}: ${
      top.map((item) => `${item.feature} (r=${item.corr.toFixed(2)})`).join(", ") || "n/a"
    }.`,
    "success",
    { stats: dataset.stats, parsed },
  );

  await setPhase(projectId, "planning");
  await writeLog(projectId, "planner", "planning", "Creating an experiment strategy from the goal and dataset profile.");

  const fallbackPlan = buildHeuristicPlan(
    project.goal,
    dataset.stats,
    dataset.taskType,
    project.minExperiments,
    project.maxExperiments,
  );

  // Model names and their legal hyperparameters come from the registry, so the
  // planner prompt stays correct for whatever models are registered.
  const allowedModels = modelsForTask(dataset.taskType);
  const planned = await completeJson<ExperimentPlan>(
    [
      "You are the planner node of an ML experiment orchestrator.",
      "Return only JSON matching the experiment plan schema.",
      `Use only these model names: ${allowedModels.map((spec) => spec.name).join(", ")}.`,
      "For each model use only its listed hyperparameters:",
      allowedModels
        .map((spec) => `${spec.name}: ${paramKeysOf(spec.name).join(", ") || "(none)"}`)
        .join("; "),
      "Never invent models, never mix hyperparameters between models, and never execute code.",
    ].join(" "),
    JSON.stringify(
      {
        goal: project.goal,
        dataset: {
          name: dataset.name,
          taskType: dataset.taskType,
          stats: dataset.stats,
        },
        availableModels: fallbackPlan.strategy.map((item) => item.model),
        constraints: {
          minExperiments: project.minExperiments,
          maxExperiments: project.maxExperiments,
        },
      },
      null,
      2,
    ),
    () => fallbackPlan,
  );

  // The objective set is derived from the goal text, never from the LLM, so a goal
  // naming several metrics can't be silently collapsed to a single one.
  const llmStrategy = sanitizeStrategy(planned.value?.strategy, dataset.taskType);
  const strategy = (llmStrategy.length ? llmStrategy : fallbackPlan.strategy).slice(
    0,
    project.maxExperiments,
  );
  const plan: ExperimentPlan = {
    ...fallbackPlan,
    rationale: planned.value?.rationale?.trim() || fallbackPlan.rationale,
    adaptationPolicy: planned.value?.adaptationPolicy?.trim() || fallbackPlan.adaptationPolicy,
    taskType: dataset.taskType,
    objectives: fallbackPlan.objectives,
    primaryMetric: fallbackPlan.primaryMetric,
    optimize: fallbackPlan.optimize,
    minExperiments: project.minExperiments,
    maxExperiments: project.maxExperiments,
    strategy: strategy.length ? strategy : fallbackPlan.strategy,
  };

  const first = plan.strategy[0] ?? null;
  await setPhase(projectId, "planning", {
    plan,
    taskType: plan.taskType,
    primaryMetric: plan.primaryMetric,
    optimize: plan.optimize,
    nextConfig: first,
    summary: plan.rationale,
  });
  await writeLog(
    projectId,
    "planner",
    "planning",
    `Plan ready (${planned.source}): ${plan.rationale}`,
    "success",
    plan,
  );
  if (first) {
    await writeLog(
      projectId,
      "planner",
      "planning",
      `First experiment queued: ${modelLabel(first.model)} â€” ${first.reason}`,
    );
  }

  return { plan, first };
}

export async function stepProject(projectId: string) {
  const [project] = await db.select().from(projects).where(eq(projects.id, projectId));
  if (!project) throw new Error("Project not found");
  if (project.status !== "running") {
    return { done: project.status === "completed", project };
  }
  if (!project.datasetId || !project.plan) {
    throw new Error("Project is missing a dataset or plan");
  }
  const [dataset] = await db.select().from(datasets).where(eq(datasets.id, project.datasetId));
  if (!dataset) throw new Error("Dataset not found");

  const history = await db
    .select()
    .from(experiments)
    .where(eq(experiments.projectId, projectId))
    .orderBy(experiments.runNumber);

  const completed = asCompleted(history);
  const plan = project.plan;
  const objectives = objectivesOf(plan);
  const rawPending = (project.nextConfig as ExperimentConfig | null) ?? null;
  // Strip any parameter that does not belong to this model before it is stored
  // or trained, so history always reflects the real hyperparameters used.
  const pending = rawPending
    ? { ...rawPending, params: sanitizeParams(rawPending.model, rawPending.params) }
    : null;

  if (!pending) {
    return finalize(projectId, project, dataset, completed, plan);
  }

  const runNumber = history.length + 1;
  const experimentId = createId("exp");

  await setPhase(projectId, "selecting");
  await writeLog(
    projectId,
    "selector",
    "selecting",
    `Selected experiment ${runNumber}: ${modelLabel(pending.model)} ${JSON.stringify(pending.params)}`,
    "info",
    pending,
    experimentId,
  );

  await db.insert(experiments).values({
    id: experimentId,
    projectId,
    runNumber,
    modelName: pending.model,
    hyperparameters: pending.params,
    datasetInfo: {
      name: dataset.name,
      rows: dataset.rowCount,
      features: dataset.featureColumns,
      target: dataset.targetColumn,
      split: "80/20 holdout",
    },
    status: "running",
    decisionReason: pending.reason,
  });

  await setPhase(projectId, "training");
  await writeLog(
    projectId,
    "executor",
    "training",
    `Training ${modelLabel(pending.model)} on ${dataset.name}. Arbitrary generated code is not executed; only the validated registry path runs.`,
    "info",
    undefined,
    experimentId,
  );

  try {
    const result = runSafeExperiment({
      model: pending.model,
      params: pending.params,
      task: dataset.taskType,
      X: dataset.payload.X,
      y: dataset.payload.y,
      featureNames: dataset.payload.featureNames,
      seed: 42 + runNumber,
    });

    await setPhase(projectId, "evaluating");
    await writeLog(
      projectId,
      "evaluator",
      "evaluating",
      `Holdout ${objectives
        .map((objective) => `${objective.metric}=${formatMetric(objective.metric, metricValue(result.testMetrics, objective.metric))}`)
        .join(", ")} in ${result.durationMs}ms.`,
      "success",
      result.testMetrics,
      experimentId,
    );

    if (result.cvMetrics) {
      await writeLog(
        projectId,
        "evaluator",
        "evaluating",
        `${result.cvMetrics.folds}-fold cross-validation on ${result.cvMetrics.rows} rows: ${objectives
          .map(
            (objective) =>
              `${objective.metric}=${formatMetric(objective.metric, metricValue(result.cvMetrics!.mean, objective.metric))}` +
              `±${formatMetric(objective.metric, metricValue(result.cvMetrics!.std, objective.metric))}`,
          )
          .join(", ")} in ${result.cvMetrics.durationMs}ms.`,
        "success",
        result.cvMetrics,
        experimentId,
      );
    }

    await db
      .update(experiments)
      .set({
        status: "completed",
        // Record the exact validated parameters the trainer used.
        modelName: result.model,
        hyperparameters: result.params,
        trainMetrics: result.trainMetrics,
        testMetrics: result.testMetrics,
        cvMetrics: result.cvMetrics,
        featureImportance: result.featureImportance,
        preview: result.preview,
        coefficients: result.coefficients,
        trainDurationMs: result.durationMs,
        notes: pending.reason,
        completedAt: new Date(),
      })
      .where(eq(experiments.id, experimentId));

    await logTrackingRun({
      id: createId("run"),
      experimentId,
      projectId,
      name: `${pending.model}-${runNumber}`,
      params: result.params,
      metrics: result.testMetrics,
      tags: {
        dataset: dataset.slug,
        task: dataset.taskType,
        metric: objectives.map((objective) => objective.metric).join("+"),
      },
    });

    const updatedCompleted: CompletedRun[] = [
      ...completed,
      {
        modelName: result.model,
        hyperparameters: result.params,
        trainMetrics: result.trainMetrics,
        testMetrics: result.testMetrics,
        cvMetrics: result.cvMetrics,
      },
    ];

    await setPhase(projectId, "analyzing");
    const analysisFallback = analyzeRuns(
      updatedCompleted,
      updatedCompleted[updatedCompleted.length - 1],
      objectives,
    );
    const analysis = await completeJson<{ commentary: string }>(
      "You are the experiment analyst. Return JSON {commentary: string} using only the provided metrics. Do not invent numbers or claim any evaluation that is not listed.",
      JSON.stringify({
        objectives,
        latest: updatedCompleted[updatedCompleted.length - 1],
        history: updatedCompleted,
      }),
      () => ({ commentary: analysisFallback.commentary }),
    );
    await writeLog(
      projectId,
      "analyst",
      "analyzing",
      analysis.value.commentary || analysisFallback.commentary,
      "info",
      analysisFallback,
      experimentId,
    );

    const { best } = pickBestRunMulti(updatedCompleted, objectives);
    const bestRow = (
      await db.select().from(experiments).where(eq(experiments.projectId, projectId))
    ).find(
      (row) =>
        best !== null &&
        row.status === "completed" &&
        configSignature(row.modelName, row.hyperparameters) ===
          configSignature(best.modelName, best.hyperparameters),
    );

    await setPhase(projectId, "deciding");
    const decisionFallback = suggestNextExperiment(plan, updatedCompleted);
    const decision = await completeJson<{ stop: boolean; reason: string; config?: ExperimentConfig | null }>(
      "You are the decision agent. Return JSON {stop:boolean, reason:string, config?:{model,params,reason}|null}. Use only registry models and numeric params. Prefer stopping after the minimum experiments if gains are tiny.",
      JSON.stringify({
        plan,
        completed: updatedCompleted,
        suggested: decisionFallback,
      }),
      () => decisionFallback,
    );

    // The LLM may not stop early: the goal's minimum experiment count wins.
    const belowMinimum = updatedCompleted.length < plan.minExperiments;
    const wantsStop = decision.value.stop && !belowMinimum;
    const proposed = decision.value.config ?? decisionFallback.config;
    const validated = proposed ? sanitizeStrategy([proposed], plan.taskType)[0] ?? null : null;
    const chosen = validated ?? decisionFallback.config;

    const nextConfig =
      wantsStop || updatedCompleted.length >= plan.maxExperiments
        ? null
        : chosen
          ? { ...chosen, params: sanitizeParams(chosen.model, chosen.params) }
          : null;

    await setPhase(projectId, nextConfig ? "deciding" : "reporting", {
      iteration: runNumber,
      nextConfig,
      bestExperimentId: bestRow?.id ?? experimentId,
    });
    await writeLog(
      projectId,
      "decision",
      "deciding",
      nextConfig
        ? `${decision.value.reason || decisionFallback.reason} Next: ${modelLabel(nextConfig.model)}.`
        : decision.value.reason || decisionFallback.reason,
      nextConfig ? "info" : "success",
      { nextConfig, stop: !nextConfig },
      experimentId,
    );

    if (!nextConfig) {
      return finalize(projectId, { ...project, bestExperimentId: bestRow?.id ?? experimentId }, dataset, updatedCompleted, plan);
    }

    return { done: false, experimentId };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Training failed";
    logger.error("executor", message, error);
    await db
      .update(experiments)
      .set({ status: "failed", notes: message, completedAt: new Date() })
      .where(eq(experiments.id, experimentId));
    await writeLog(projectId, "executor", "training", message, "error", undefined, experimentId);

    const fallback = suggestNextExperiment(plan, completed);
    await setPhase(projectId, fallback.config ? "deciding" : "failed", {
      nextConfig: fallback.config,
      error: fallback.config ? null : message,
      status: fallback.config ? "running" : "failed",
    });
    return { done: !fallback.config, error: message };
  }
}

async function finalize(
  projectId: string,
  project: typeof projects.$inferSelect,
  dataset: typeof datasets.$inferSelect,
  completed: CompletedRun[],
  plan: ExperimentPlan,
) {
  await setPhase(projectId, "reporting");
  const objectives = objectivesOf(plan);
  const selection = pickBestRunMulti(completed, objectives);
  const best = selection.best;
  const fallback = writeReport(project.goal, dataset.stats, plan, completed, best, selection);
  const generated = await completeJson<FinalReport>(
    [
      "You are the final report agent. Return JSON with keys headline, narrative, bestModel, bestParams, bestMetrics, whyItWon, datasetInsights, experimentLessons, recommendedNextSteps.",
      "Use ONLY the numbers provided. Never invent metrics, models, or hyperparameters.",
      best?.cvMetrics
        ? `Evaluation was an 80/20 holdout split PLUS ${best.cvMetrics.folds}-fold cross-validation on all ${best.cvMetrics.rows} rows; both sets of numbers are supplied. Report the cross-validated figures as the more reliable estimate. Do NOT claim a 'genuine search over the hypothesis space', generalization guarantees, or that a model is 'best on unseen data'.`
        : "Evaluation was a single 80/20 holdout split. Do NOT claim cross-validation, a 'genuine search over the hypothesis space', generalization guarantees, or that a model is 'best on unseen data'.",
      // The winner is chosen by the code, never by the model. State the rule so
      // the generated prose cannot justify the choice with the wrong evidence.
      selection.basis === "cross_validation"
        ? `The final model was ALREADY selected, using the mean ${selection.folds}-fold cross-validation score as the primary metric${
            selection.decidingMetric ? ` (decided by ${selection.decidingMetric})` : ""
          }. Say that the winner was selected on the mean ${selection.folds}-fold cross-validation score, and report the holdout numbers separately as a single-split reference. NEVER say or imply the winner was chosen because it had the best holdout score.${
            selection.tied
              ? " The cross-validated results are exactly tied between two or more configurations: report this as a tie and do not claim the winner performed better."
              : ""
          }`
        : "No cross-validated results are available, so the winner was selected on the single holdout split. Do not claim any other evidence was used.",
      "Say 'best measured <metric> among the evaluated experiments'. If several objectives were given, mention every one of them.",
      // Direction is stated per metric so error metrics are never described as
      // "highest". This list is generated from the objectives, so it stays
      // correct for any metric set on any dataset.
      `Optimisation direction for each metric: ${describeObjectiveDirections(objectives)}. ` +
        `For a metric that is minimised, the best result is the LOWEST value: write "lowest <metric>" and never "highest <metric>", "strongest <metric>", "greatest <metric>" or "improved <metric>" when you mean the winner.`,
      `datasetInsights must be about predicting the target column "${dataset.targetColumn}" and must not describe another column as the thing being predicted.`,
    ].join(" "),
    JSON.stringify({
      goal: project.goal,
      objectives,
      targetColumn: dataset.targetColumn,
      evaluation: best?.cvMetrics
        ? `80/20 holdout split plus ${best.cvMetrics.folds}-fold cross-validation`
        : "single 80/20 holdout split, no cross-validation",
      // How the winner was actually chosen, so the prose matches the code.
      selection: {
        basis: selection.basis,
        folds: selection.folds,
        decidingMetric: selection.decidingMetric,
        tied: selection.tied,
        primaryValue: selection.primaryValue,
      },
      dataset: dataset.stats,
      completed,
      fallback,
    }),
    () => fallback,
  );

  // Anything the model says that we cannot verify is replaced by the measured text.
  const generatedValue = generated.value ?? fallback;
  // Only affirmative claims are rejected. An honest disclaimer such as
  // "these numbers were not cross-validated" must be allowed through.
  const NEGATED = String.raw`(?<!\b(?:not|never|without|no)\s)(?<!\b(?:not|never|without|no)\s\w{1,12}\s)`;
  const banned = new RegExp(
    [
      String.raw`genuine search over the hypothesis space`,
      String.raw`\bexhaustive(?:ly)? search`,
      NEGATED + String.raw`best on unseen data`,
      NEGATED + String.raw`generali[sz]es best`,
      // Claiming cross-validation is only a lie when it did not run. When the
      // winner really has k-fold results, the claim is true and allowed.
      ...(best?.cvMetrics ? [] : [NEGATED + String.raw`cross[- ]validat(?:ed|ion)\b`]),
      NEGATED + String.raw`\bguarantee[sd]?\b`,
      NEGATED + String.raw`will (?:perform|generali[sz]e) best`,
      NEGATED + String.raw`proven to\b`,
      String.raw`\bstatistically significant\b`,
    ].join("|"),
    "i",
  );
  // A minimised metric (RMSE, MAE, MAPE) described with a "bigger is better"
  // superlative is factually wrong, so that sentence is discarded in favour of
  // the measured text. Built from the objectives, so it covers any metric.
  const wrongDirection = buildDirectionGuard(objectives);
  const rejectsClaim = (text: unknown) =>
    typeof text !== "string" || !text.trim() || banned.test(text) || wrongDirection(text);

  const report: FinalReport = {
    ...fallback,
    headline: rejectsClaim(generatedValue.headline) ? fallback.headline : generatedValue.headline,
    narrative: rejectsClaim(generatedValue.narrative) ? fallback.narrative : generatedValue.narrative,
    whyItWon: rejectsClaim(generatedValue.whyItWon) ? fallback.whyItWon : generatedValue.whyItWon,
    // These four are always the measured values, never the model's version.
    bestModel: fallback.bestModel,
    bestParams: fallback.bestParams,
    bestMetrics: best?.testMetrics ?? fallback.bestMetrics,
    datasetInsights: fallback.datasetInsights,
    experimentLessons: fallback.experimentLessons,
    recommendedNextSteps: fallback.recommendedNextSteps,
  };

  await setPhase(projectId, "completed", {
    status: "completed",
    report,
    summary: report.narrative,
    nextConfig: null,
  });
  await writeLog(projectId, "reporter", "completed", report.headline, "success", report);
  return { done: true, report };
}

export async function runProjectToCompletion(projectId: string) {
  await startProject(projectId);
  let guard = 0;
  while (guard < 20) {
    const result = await stepProject(projectId);
    if (result.done) return result;
    guard += 1;
  }
  throw new Error("Experiment loop exceeded the safety guard");
}

export async function loadProjectBundle(projectId: string) {
  const [project] = await db.select().from(projects).where(eq(projects.id, projectId));
  if (!project) return null;
  const [dataset] = project.datasetId
    ? await db.select().from(datasets).where(eq(datasets.id, project.datasetId))
    : [null];
  const runs = await db
    .select()
    .from(experiments)
    .where(eq(experiments.projectId, projectId))
    .orderBy(experiments.runNumber);
  const logs = await db
    .select()
    .from(agentLogs)
    .where(eq(agentLogs.projectId, projectId))
    .orderBy(desc(agentLogs.createdAt));
  return { project, dataset, experiments: runs, logs: logs.reverse() };
}

