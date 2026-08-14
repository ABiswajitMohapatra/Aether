"use client";

import { useCallback, useEffect, useState } from "react";
import type { AgentLogRow, ExperimentRow, ProjectRow } from "@/db/schema";
import type { AgentPhase, DatasetStats, FinalReport, MetricName } from "@/lib/domain";
import { formatDuration, formatTime, prettyMetric, prettyModel } from "@/lib/format";
import { formatMetric, metricValue } from "@/lib/ml/metrics";
import { HistoryLine, ImportanceBars, MetricBars, ScatterPlot } from "@/components/charts";
import { PHASE_LABELS, PHASE_ORDER } from "@/lib/domain";

type PublicDataset = {
  id: string;
  name: string;
  slug: string;
  source: string;
  taskType: "regression" | "classification";
  targetColumn: string;
  featureColumns: string[];
  rowCount: number;
  description: string;
  stats: DatasetStats;
};

type PublicProject = Omit<ProjectRow, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

type PublicExperiment = Omit<ExperimentRow, "createdAt" | "completedAt"> & {
  createdAt: string;
  completedAt: string | null;
};

type PublicLog = Omit<AgentLogRow, "createdAt"> & { createdAt: string };

const DEFAULT_GOAL =
  "Use the California Housing dataset and find the best regression model. Try different algorithms and hyperparameters and minimize RMSE. Try at least 5 different experiments.";

const DATASET_GOALS: Record<string, { name: string; goal: string }> = {
  "california-housing": {
    name: "California Housing Sweep",
    goal: DEFAULT_GOAL,
  },
  diabetes: {
    name: "Diabetes Progression Sweep",
    goal: "Use the Diabetes Progression dataset and find the best regression model. Minimize MAE, then compare RMSE. Try at least 5 different algorithms and hyperparameters.",
  },
  "wine-quality": {
    name: "Wine Quality Sweep",
    goal: "Predict wine quality from physicochemical tests. Find the best regression model and minimize RMSE. Try linear models, trees, and boosting.",
  },
  iris: {
    name: "Iris Classifier Sweep",
    goal: "Classify Iris flowers and maximize accuracy. Try logistic regression, kNN, trees, and ensembles. Report precision, recall, and F1.",
  },
  income: {
    name: "Income Bracket Sweep",
    goal: "Predict whether income exceeds $50K and maximize F1. Compare linear and tree models, then tune the winner.",
  },
};

function suggestionFor(dataset: PublicDataset | undefined) {
  if (!dataset) return { name: "New experiment", goal: DEFAULT_GOAL };
  return (
    DATASET_GOALS[dataset.slug] ?? {
      name: `${dataset.name} Sweep`,
      goal:
        dataset.taskType === "classification"
          ? `Use the ${dataset.name} dataset and find the best classification model. Maximize accuracy and F1. Try at least 5 experiments.`
          : `Use the ${dataset.name} dataset and find the best regression model. Minimize RMSE. Try different algorithms and hyperparameters.`,
    }
  );
}

export function Dashboard() {
  const [projects, setProjects] = useState<PublicProject[]>([]);
  const [datasets, setDatasets] = useState<PublicDataset[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [project, setProject] = useState<PublicProject | null>(null);
  const [dataset, setDataset] = useState<PublicDataset | null>(null);
  const [runs, setRuns] = useState<PublicExperiment[]>([]);
  const [logs, setLogs] = useState<PublicLog[]>([]);
  const [goal, setGoal] = useState(DEFAULT_GOAL);
  const [name, setName] = useState("California Housing Sweep");
  const [datasetId, setDatasetId] = useState("");
  const [maxExperiments, setMaxExperiments] = useState(6);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [llm, setLlm] = useState<{ label: string; model: string; generative: boolean } | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);

  const loadLists = useCallback(async () => {
    const [projectRes, datasetRes, metaRes] = await Promise.all([
      fetch("/api/projects"),
      fetch("/api/datasets"),
      fetch("/api/meta"),
    ]);
    const projectJson = (await projectRes.json()) as { projects: PublicProject[] };
    const datasetJson = (await datasetRes.json()) as { datasets: PublicDataset[] };
    const metaJson = (await metaRes.json()) as { llm: { label: string; model: string; generative: boolean } };
    setProjects(projectJson.projects);
    setDatasets(datasetJson.datasets);
    setLlm(metaJson.llm);
    setDatasetId((current) => {
      if (current) return current;
      const housing = datasetJson.datasets.find((item) => item.slug === "california-housing") ?? datasetJson.datasets[0];
      return housing?.id ?? "";
    });
  }, []);

  const refreshSelected = useCallback(async (id: string) => {
    const res = await fetch(`/api/projects/${id}`);
    if (!res.ok) return;
    const json = (await res.json()) as {
      project: PublicProject;
      dataset: PublicDataset | null;
      experiments: PublicExperiment[];
      logs: PublicLog[];
    };
    setProject(json.project);
    setDataset(json.dataset);
    setRuns(json.experiments);
    setLogs(json.logs);
    setGoal(json.project.goal);
    setName(json.project.name);
    setMaxExperiments(json.project.maxExperiments);
    if (json.project.datasetId) setDatasetId(json.project.datasetId);
  }, []);

  useEffect(() => {
    void loadLists();
  }, [loadLists]);

  useEffect(() => {
    if (selectedId) void refreshSelected(selectedId);
  }, [selectedId, refreshSelected]);

  const metric = (project?.primaryMetric ?? "rmse") as MetricName;
  const invert = project?.optimize === "minimize";
  const best = runs.find((run) => run.id === project?.bestExperimentId) ?? null;
  const completed = runs.filter((run) => run.status === "completed" && run.testMetrics);

  async function createProject() {
    setError(null);
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, goal, datasetId, maxExperiments, minExperiments: Math.min(5, maxExperiments) }),
    });
    const json = (await res.json()) as { project?: PublicProject; error?: string };
    if (!res.ok || !json.project) {
      setError(json.error ?? "Could not create project");
      return null;
    }
    setSelectedId(json.project.id);
    await loadLists();
    return json.project.id;
  }

  async function saveAndRun() {
    setBusy(true);
    setError(null);
    try {
      let id = selectedId;
      if (!id || project?.status === "completed" || project?.status === "failed") {
        id = await createProject();
      } else if (id) {
        await fetch(`/api/projects/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, goal, datasetId, maxExperiments, minExperiments: Math.min(5, maxExperiments) }),
        });
      }
      if (!id) return;
      const start = await fetch(`/api/projects/${id}/start`, { method: "POST" });
      if (!start.ok) {
        const json = (await start.json()) as { error?: string };
        throw new Error(json.error ?? "Unable to start the agent");
      }
      await refreshSelected(id);
      let done = false;
      while (!done) {
        const step = await fetch(`/api/projects/${id}/step`, { method: "POST" });
        const json = (await step.json()) as { done?: boolean; error?: string };
        if (!step.ok) throw new Error(json.error ?? "Experiment step failed");
        await refreshSelected(id);
        done = Boolean(json.done);
      }
      await loadLists();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Run failed");
    } finally {
      setBusy(false);
    }
  }

  const currentPhase = project?.phase ?? "idle";

  return (
    <div className="relative min-h-screen px-4 py-4 text-[#e8ebf4] md:px-6">
      <header className="panel mb-4 flex flex-wrap items-center justify-between gap-4 rounded-3xl px-5 py-4">
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 64 64" className="h-11 w-11" aria-label="Aether">
  <defs>
    <linearGradient id="ag" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#f4c56a" />
      <stop offset="55%" stopColor="#d79b3c" />
      <stop offset="100%" stopColor="#8a5cf6" />
    </linearGradient>
  </defs>
  <rect x="2" y="2" width="60" height="60" rx="16" fill="#0d1117" />
  <rect x="2.75" y="2.75" width="58.5" height="58.5" rx="15.25" fill="none" stroke="url(#ag)" strokeWidth="1.5" opacity="0.7" />
  <ellipse cx="32" cy="32" rx="21" ry="9.5" fill="none" stroke="url(#ag)" strokeWidth="2" opacity="0.55" transform="rotate(-28 32 32)" />
  <path d="M32 14 L44 46 L37.6 46 L34.9 38.4 L29.1 38.4 L26.4 46 L20 46 Z" fill="url(#ag)" />
  <path d="M32 25.5 L34.2 33.2 L29.8 33.2 Z" fill="#0d1117" />
  <circle cx="50" cy="21" r="3" fill="#f4c56a" />
  <circle cx="14" cy="43" r="2.4" fill="#8a5cf6" />
</svg>
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#e3c27a]">Agentic experiment lab</p>
            <h1 className="text-xl font-semibold tracking-tight">Aether</h1>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-[#8b93a7]">
          <span className="rounded-full border border-white/10 px-3 py-1">
            Planner → Train → Evaluate → Analyze → Decide
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1">
            LLM {llm?.generative ? "live" : "policy + optional Ollama"} · {llm?.model ?? "adaptive"}
          </span>
        </div>
      </header>

      <div className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)_320px]">
        <aside className="panel rounded-[28px] p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm uppercase tracking-[0.16em] text-[#8b93a7]">Projects</h2>
            <button
              className="rounded-full bg-white/8 px-3 py-1 text-xs text-[#5eead4]"
              onClick={() => {
                setSelectedId(null);
                setProject(null);
                setRuns([]);
                setLogs([]);
                const first = datasets.find((item) => item.slug === "california-housing") ?? datasets[0];
                if (first) {
                  setDatasetId(first.id);
                  const suggestion = suggestionFor(first);
                  setName(suggestion.name);
                  setGoal(suggestion.goal);
                }
              }}
            >
              New
            </button>
          </div>
          <div className="space-y-2">
            {projects.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`w-full rounded-2xl border px-3 py-3 text-left ${
                  selectedId === item.id ? "border-[#5eead4]/40 bg-white/8" : "border-white/5 bg-white/3"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-medium">{item.name}</span>
                  <StatusPill status={item.status} />
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-[#8b93a7]">{item.goal}</p>
              </button>
            ))}
            {projects.length === 0 && <p className="text-sm text-[#8b93a7]">No projects yet. Launch the first sweep.</p>}
          </div>
        </aside>

        <main className="space-y-4">
          <section className="panel rounded-[28px] p-5">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#8b93a7]">Natural-language goal</p>
                <h2 className="text-2xl font-semibold">What should the agent optimize?</h2>
              </div>
              <button
                disabled={busy}
                onClick={() => void saveAndRun()}
                className="rounded-full bg-[#5eead4] px-5 py-2.5 text-sm font-semibold text-[#06221d] disabled:opacity-60"
              >
                {busy ? "Agent running…" : "Start experiment"}
              </button>
            </div>
            <div className="grid gap-3 md:grid-cols-[1fr_110px]">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
                placeholder="Project name"
              />
              <label className="flex flex-col justify-center rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                <span className="text-[10px] uppercase tracking-[0.14em] text-[#8b93a7]">Max runs</span>
                <input
                  type="number"
                  min={3}
                  max={12}
                  value={maxExperiments}
                  onChange={(e) => setMaxExperiments(Number(e.target.value))}
                  className="bg-transparent outline-none"
                />
              </label>
            </div>
            <div className="mt-4">
              <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-[#8b93a7]">Pick a dataset</p>
              <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                {datasets.map((item) => {
                  const active = item.id === datasetId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setDatasetId(item.id);
                        const suggestion = suggestionFor(item);
                        setName(suggestion.name);
                        setGoal(suggestion.goal);
                        setSelectedId(null);
                        setProject(null);
                        setRuns([]);
                        setLogs([]);
                      }}
                      className={`rounded-2xl border px-3 py-3 text-left ${
                        active ? "border-[#5eead4]/50 bg-[#5eead4]/8" : "border-white/8 bg-black/20"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-medium">{item.name}</span>
                        <span className="text-[10px] uppercase tracking-[0.12em] text-[#e3c27a]">
                          {item.taskType}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-[#8b93a7]">
                        {item.rowCount} rows · {item.featureColumns.length} features · {item.source}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              rows={4}
              className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-[15px] leading-7 outline-none"
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-[#8b93a7]">
              <button className="text-[#8b9cff]" onClick={() => setUploadOpen((v) => !v)}>
                Or upload your own CSV
              </button>
              {error && <span className="text-[#fb7185]">{error}</span>}
            </div>
            {uploadOpen && (
              <UploadPanel
                onDone={(id) => {
                  void loadLists().then(() => {
                    if (!id) return;
                    setDatasetId(id);
                    setSelectedId(null);
                    setProject(null);
                    setRuns([]);
                    setLogs([]);
                    setName("Uploaded dataset sweep");
                    setGoal("Use the uploaded dataset and find the best model. Try at least 5 experiments.");
                  });
                }}
              />
            )}
          </section>

          <Pipeline phase={currentPhase} running={busy || project?.status === "running"} />

          <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="panel rounded-[28px] p-5">
              <h3 className="mb-3 text-sm uppercase tracking-[0.16em] text-[#8b93a7]">Agent activity</h3>
              <div className="max-h-[360px] space-y-3 overflow-auto pr-1">
                {logs.length === 0 && <p className="text-sm text-[#8b93a7]">The agent will narrate each node here.</p>}
                {logs.map((log) => (
                  <article key={log.id} className="rounded-2xl border border-white/5 bg-black/20 px-3 py-3">
                    <div className="mb-1 flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.14em] text-[#8b93a7]">
                      <span className={log.level === "error" ? "text-[#fb7185]" : "text-[#5eead4]"}>{log.node}</span>
                      <span className="mono">{formatTime(log.createdAt)}</span>
                    </div>
                    <p className="text-sm leading-6">{log.message}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="panel rounded-[28px] p-5">
              <h3 className="mb-3 text-sm uppercase tracking-[0.16em] text-[#8b93a7]">Current experiment</h3>
              <CurrentCard run={runs[runs.length - 1] ?? null} metric={metric} phase={currentPhase} />
            </div>
          </section>

          <section className="panel rounded-[28px] p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm uppercase tracking-[0.16em] text-[#8b93a7]">Experiment history</h3>
              <span className="text-xs text-[#8b93a7]">{completed.length} completed runs</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="text-[11px] uppercase tracking-[0.14em] text-[#8b93a7]">
                  <tr>
                    <th className="pb-3">Run</th>
                    <th className="pb-3">Model</th>
                    <th className="pb-3">Hyperparameters</th>
                    <th className="pb-3">{prettyMetric(metric)}</th>
                    <th className="pb-3">R² / Acc</th>
                    <th className="pb-3">Duration</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {runs.map((run) => (
                    <tr key={run.id} className="border-t border-white/5">
                      <td className="py-3 mono text-[#e3c27a]">#{run.runNumber}</td>
                      <td className="py-3">{prettyModel(run.modelName)}</td>
                      <td className="py-3 text-xs text-[#8b93a7]">{JSON.stringify(run.hyperparameters)}</td>
                      <td className="py-3 mono">{formatMetric(metric, metricValue(run.testMetrics, metric))}</td>
                      <td className="py-3 mono">
                        {formatMetric("r2", run.testMetrics?.r2 ?? run.testMetrics?.accuracy)}
                      </td>
                      <td className="py-3 mono">{formatDuration(run.trainDurationMs)}</td>
                      <td className="py-3">
                        <StatusPill status={run.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <div className="panel rounded-[28px] p-5">
              <h3 className="mb-3 text-sm uppercase tracking-[0.16em] text-[#8b93a7]">Model comparison</h3>
              <MetricBars
                metric={metric}
                invert={invert}
                items={completed.map((run) => ({
                  label: `${run.modelName} #${run.runNumber}`,
                  value: metricValue(run.testMetrics, metric),
                  active: run.id === best?.id,
                }))}
              />
            </div>
            <div className="panel rounded-[28px] p-5">
              <h3 className="mb-3 text-sm uppercase tracking-[0.16em] text-[#8b93a7]">Search trajectory</h3>
              <HistoryLine
                metric={metric}
                points={completed.map((run) => ({
                  x: run.runNumber,
                  y: metricValue(run.testMetrics, metric),
                  label: run.modelName,
                }))}
              />
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <div className="panel rounded-[28px] p-5">
              <h3 className="mb-3 text-sm uppercase tracking-[0.16em] text-[#8b93a7]">Predicted vs actual</h3>
              <ScatterPlot y={best?.preview?.y ?? []} pred={best?.preview?.pred ?? []} />
            </div>
            <div className="panel rounded-[28px] p-5">
              <h3 className="mb-3 text-sm uppercase tracking-[0.16em] text-[#8b93a7]">Feature importance</h3>
              <ImportanceBars items={best?.featureImportance ?? []} />
            </div>
          </section>

          {project?.report && <ReportCard report={project.report} />}
        </main>

        <aside className="space-y-4">
          <BestModelCard best={best} metric={metric} />
          <DatasetCard dataset={dataset ?? datasets.find((item) => item.id === datasetId) ?? null} />
          <div className="panel overflow-hidden rounded-[28px]">
            <img src="/images/lab-orb.svg" alt="" className="h-44 w-full object-cover opacity-80" />
            <div className="p-4 text-sm leading-6 text-[#8b93a7]">
              Safe tools only: dataset inspection, registry models, holdout metrics, and MLflow-style tracking. The LLM
              never executes generated code.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Pipeline({ phase, running }: { phase: AgentPhase; running: boolean }) {
  return (
    <section className="panel rounded-[28px] p-4">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-7">
        {PHASE_ORDER.map((item) => {
          const active = phase === item || (item === "training" && phase === "selecting");
          return (
            <div
              key={item}
              className={`rounded-2xl border px-3 py-3 ${active ? "phase-active border-[#5eead4]/40 bg-[#5eead4]/8" : "border-white/5"}`}
            >
              <div className="mb-2 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${active && running ? "pulse-dot bg-[#5eead4]" : "bg-white/20"}`} />
                <span className="text-[10px] uppercase tracking-[0.14em] text-[#8b93a7]">{active && running ? "live" : "node"}</span>
              </div>
              <p className="text-sm font-medium">{PHASE_LABELS[item]}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CurrentCard({
  run,
  metric,
  phase,
}: {
  run: PublicExperiment | null;
  metric: string;
  phase: AgentPhase;
}) {
  if (!run) {
    return <p className="text-sm text-[#8b93a7]">Waiting for the planner to queue the first training job.</p>;
  }
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.16em] text-[#e3c27a]">{PHASE_LABELS[phase]}</p>
      <h4 className="mt-1 text-xl font-semibold">{prettyModel(run.modelName)}</h4>
      <p className="mt-2 text-sm text-[#8b93a7]">{run.decisionReason || run.notes}</p>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-black/20 p-3">
          <dt className="text-[11px] uppercase tracking-[0.14em] text-[#8b93a7]">Holdout {prettyMetric(metric)}</dt>
          <dd className="mono mt-1 text-lg">{formatMetric(metric, metricValue(run.testMetrics, metric))}</dd>
        </div>
        <div className="rounded-2xl bg-black/20 p-3">
          <dt className="text-[11px] uppercase tracking-[0.14em] text-[#8b93a7]">Duration</dt>
          <dd className="mono mt-1 text-lg">{formatDuration(run.trainDurationMs)}</dd>
        </div>
      </dl>
    </div>
  );
}

function BestModelCard({ best, metric }: { best: PublicExperiment | null; metric: string }) {
  return (
    <section className="panel rounded-[28px] p-5">
      <p className="text-[11px] uppercase tracking-[0.18em] text-[#e3c27a]">Best model</p>
      {best ? (
        <>
          <h3 className="mt-2 text-2xl font-semibold">{prettyModel(best.modelName)}</h3>
          <p className="mono mt-3 text-3xl text-[#5eead4]">{formatMetric(metric, metricValue(best.testMetrics, metric))}</p>
          <p className="text-xs uppercase tracking-[0.16em] text-[#8b93a7]">{prettyMetric(metric)}</p>
          <pre className="mt-4 overflow-auto rounded-2xl bg-black/30 p-3 text-xs text-[#cdd3e3]">
            {JSON.stringify(best.hyperparameters, null, 2)}
          </pre>
          {best.coefficients && (
            <p className="mt-3 text-xs leading-6 text-[#8b93a7]">
              {Object.entries(best.coefficients)
                .slice(0, 6)
                .map(([key, value]) => `${key} ${value.toFixed(3)}`)
                .join(" · ")}
            </p>
          )}
        </>
      ) : (
        <p className="mt-3 text-sm text-[#8b93a7]">The leaderboard fills in as soon as the first model is evaluated.</p>
      )}
    </section>
  );
}

function DatasetCard({ dataset }: { dataset: PublicDataset | null }) {
  if (!dataset) return null;
  const top = dataset.stats.correlations?.slice(0, 4) ?? [];
  return (
    <section className="panel rounded-[28px] p-5">
      <p className="text-[11px] uppercase tracking-[0.18em] text-[#8b93a7]">Dataset</p>
      <h3 className="mt-2 text-xl font-semibold">{dataset.name}</h3>
      <p className="mt-2 text-sm leading-6 text-[#8b93a7]">{dataset.description}</p>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <Stat label="Rows" value={String(dataset.rowCount)} />
        <Stat label="Features" value={String(dataset.featureColumns.length)} />
        <Stat label="Task" value={dataset.taskType} />
        <Stat label="Target" value={dataset.targetColumn} />
      </div>
      <div className="mt-4 space-y-1 text-xs text-[#8b93a7]">
        {top.map((item) => (
          <div key={item.feature} className="flex justify-between">
            <span>{item.feature}</span>
            <span className="mono text-[#e8ebf4]">r={item.corr.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ReportCard({ report }: { report: FinalReport }) {
  return (
    <section className="panel rounded-[28px] p-6">
      <p className="text-[11px] uppercase tracking-[0.18em] text-[#e3c27a]">Final report</p>
      <h3 className="mt-2 text-2xl font-semibold">{report.headline}</h3>
      <p className="mt-3 max-w-3xl text-[15px] leading-8 text-[#c5cad8]">{report.narrative}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <h4 className="text-sm font-semibold">Why it won</h4>
          <p className="mt-2 text-sm leading-7 text-[#8b93a7]">{report.whyItWon}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Dataset insight</h4>
          <p className="mt-2 text-sm leading-7 text-[#8b93a7]">{report.datasetInsights}</p>
        </div>
      </div>
      <ul className="mt-5 space-y-2 text-sm text-[#c5cad8]">
        {report.experimentLessons.map((item) => (
          <li key={item} className="rounded-2xl bg-black/20 px-3 py-2">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function UploadPanel({ onDone }: { onDone: (id?: string) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [target, setTarget] = useState("");
  const [message, setMessage] = useState("");

  async function inspect(next: File) {
    const form = new FormData();
    form.set("file", next);
    const res = await fetch("/api/datasets/preview", { method: "POST", body: form });
    const json = (await res.json()) as { headers?: string[]; error?: string };
    if (!res.ok) {
      setMessage(json.error ?? "Could not parse CSV");
      return;
    }
    setHeaders(json.headers ?? []);
    setTarget(json.headers?.[json.headers.length - 1] ?? "");
  }

  async function upload() {
    if (!file) return;
    const form = new FormData();
    form.set("file", file);
    form.set("targetColumn", target);
    form.set("name", file.name);
    const res = await fetch("/api/datasets", { method: "POST", body: form });
    const json = (await res.json()) as { error?: string };
    if (!res.ok) {
      setMessage(json.error ?? "Upload failed");
      return;
    }
    setMessage("Dataset added to the lab.");
    onDone();
  }

  return (
    <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
      <input
        type="file"
        accept=".csv"
        onChange={(e) => {
          const next = e.target.files?.[0] ?? null;
          setFile(next);
          if (next) void inspect(next);
        }}
      />
      {headers.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <select value={target} onChange={(e) => setTarget(e.target.value)} className="rounded-xl bg-black/30 px-3 py-2">
            {headers.map((header) => (
              <option key={header}>{header}</option>
            ))}
          </select>
          <button onClick={() => void upload()} className="rounded-full bg-white/10 px-4 py-2 text-sm">
            Add dataset
          </button>
        </div>
      )}
      {message && <p className="mt-2 text-xs text-[#8b93a7]">{message}</p>}
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const color =
    status === "completed" ? "text-[#86efac]" : status === "running" ? "text-[#5eead4]" : status === "failed" ? "text-[#fb7185]" : "text-[#8b93a7]";
  return <span className={`text-[11px] uppercase tracking-[0.14em] ${color}`}>{status}</span>;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-black/20 px-3 py-2">
      <div className="text-[10px] uppercase tracking-[0.14em] text-[#8b93a7]">{label}</div>
      <div className="mt-1 text-sm">{value}</div>
    </div>
  );
}
