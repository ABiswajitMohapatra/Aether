import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { experiments, trackingRuns } from "@/db/schema";
import type { HyperParams, Metrics } from "@/lib/domain";
import { logger } from "@/lib/logger";

export async function logTrackingRun(input: {
  id: string;
  experimentId: string;
  projectId: string;
  name: string;
  params: HyperParams;
  metrics: Metrics;
  tags: Record<string, string>;
}) {
  const artifactUri = `experiments/mlruns/${input.projectId}/${input.id}`;
  await db.insert(trackingRuns).values({
    id: input.id,
    experimentId: input.experimentId,
    projectId: input.projectId,
    name: input.name,
    params: input.params,
    metrics: input.metrics,
    tags: input.tags,
    artifactUri,
  });

  await db
    .update(experiments)
    .set({ trackingUri: artifactUri })
    .where(eq(experiments.id, input.experimentId));

  try {
    const dir = path.join(process.cwd(), artifactUri);
    await mkdir(path.join(dir, "params"), { recursive: true });
    await mkdir(path.join(dir, "metrics"), { recursive: true });
    await mkdir(path.join(dir, "tags"), { recursive: true });
    await writeFile(
      path.join(dir, "meta.yaml"),
      [
        `run_id: ${input.id}`,
        `experiment_id: ${input.experimentId}`,
        `name: ${input.name}`,
        `status: FINISHED`,
        `start_time: ${Date.now()}`,
      ].join("\n"),
    );
    await Promise.all(
      Object.entries(input.params).map(([key, value]) =>
        writeFile(path.join(dir, "params", key), String(value)),
      ),
    );
    await Promise.all(
      Object.entries(input.metrics)
        .filter(([, value]) => typeof value === "number")
        .map(([key, value]) => writeFile(path.join(dir, "metrics", key), String(value))),
    );
    await Promise.all(
      Object.entries(input.tags).map(([key, value]) => writeFile(path.join(dir, "tags", key), value)),
    );
  } catch (error) {
    logger.warn("tracking", "Unable to persist MLflow-style files", error);
  }
}
