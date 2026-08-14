import "dotenv/config";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { datasets, projects } from "@/db/schema";
import { loadProjectBundle, startProject, stepProject } from "@/lib/agent/graph";
import { createId } from "@/lib/id";
import { ensureSeeded } from "@/lib/seed";

async function main() {
  await ensureSeeded();
  const [housing] = await db.select().from(datasets).where(eq(datasets.slug, "california-housing"));
  if (!housing) throw new Error("housing dataset missing");
  const id = createId("prj");
  await db.insert(projects).values({
    id,
    name: "Integration Sweep",
    goal: "Find the best regression model for California Housing and minimize RMSE. Try at least 5 different experiments.",
    datasetId: housing.id,
    minExperiments: 5,
    maxExperiments: 5,
    status: "draft",
    phase: "idle",
  });
  await startProject(id);
  let steps = 0;
  while (steps < 12) {
    const result = await stepProject(id);
    steps += 1;
    console.log("step", steps, "done", result.done);
    if (result.done) break;
  }
  const bundle = await loadProjectBundle(id);
  console.log(
    JSON.stringify(
      {
        status: bundle?.project.status,
        phase: bundle?.project.phase,
        runs: bundle?.experiments.map((experiment) => ({
          n: experiment.runNumber,
          model: experiment.modelName,
          status: experiment.status,
          rmse: experiment.testMetrics?.rmse,
          params: experiment.hyperparameters,
        })),
        headline: bundle?.project.report?.headline,
        logs: bundle?.logs.length,
      },
      null,
      2,
    ),
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
