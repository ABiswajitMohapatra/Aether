import { eq } from "drizzle-orm";
import { db } from "@/db";
import { agentLogs, experiments, projects } from "@/db/schema";
import { loadProjectBundle } from "@/lib/agent/graph";
import { jsonError, publicDataset, publicExperiment, publicProject } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const bundle = await loadProjectBundle(id);
  if (!bundle) return jsonError("Project not found", 404);
  return Response.json({
    project: publicProject(bundle.project),
    dataset: bundle.dataset ? publicDataset(bundle.dataset) : null,
    experiments: bundle.experiments.map(publicExperiment),
    logs: bundle.logs.map((log) => ({
      ...log,
      createdAt: log.createdAt.toISOString(),
    })),
  });
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = (await request.json()) as {
    name?: string;
    goal?: string;
    datasetId?: string;
    maxExperiments?: number;
    minExperiments?: number;
  };
  const [existing] = await db.select().from(projects).where(eq(projects.id, id));
  if (!existing) return jsonError("Project not found", 404);
  if (existing.status === "running") return jsonError("Pause or wait for the run to finish before editing");

  const [row] = await db
    .update(projects)
    .set({
      name: body.name?.trim() || existing.name,
      goal: body.goal?.trim() || existing.goal,
      datasetId: body.datasetId ?? existing.datasetId,
      maxExperiments: body.maxExperiments ?? existing.maxExperiments,
      minExperiments: body.minExperiments ?? existing.minExperiments,
      updatedAt: new Date(),
    })
    .where(eq(projects.id, id))
    .returning();
  return Response.json({ project: publicProject(row) });
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  await db.delete(agentLogs).where(eq(agentLogs.projectId, id));
  await db.delete(experiments).where(eq(experiments.projectId, id));
  await db.delete(projects).where(eq(projects.id, id));
  return Response.json({ ok: true });
}
