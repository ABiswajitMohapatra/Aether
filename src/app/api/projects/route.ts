import { desc } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { jsonError, publicProject } from "@/lib/api";
import { createId } from "@/lib/id";
import { ensureSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";

export async function GET() {
  await ensureSeeded();
  const rows = await db.select().from(projects).orderBy(desc(projects.updatedAt));
  return Response.json({ projects: rows.map(publicProject) });
}

export async function POST(request: Request) {
  await ensureSeeded();
  const body = (await request.json()) as {
    name?: string;
    goal?: string;
    datasetId?: string;
    maxExperiments?: number;
    minExperiments?: number;
  };
  if (!body.goal?.trim()) return jsonError("A natural-language goal is required");
  if (!body.datasetId) return jsonError("Select a dataset");

  const minExperiments = Math.min(12, Math.max(3, Number(body.minExperiments ?? 5) || 5));
  const maxExperiments = Math.min(12, Math.max(minExperiments, Number(body.maxExperiments ?? 6) || 6));
  const [row] = await db
    .insert(projects)
    .values({
      id: createId("prj"),
      name: body.name?.trim() || deriveName(body.goal),
      goal: body.goal.trim(),
      datasetId: body.datasetId,
      minExperiments,
      maxExperiments,
      status: "draft",
      phase: "idle",
    })
    .returning();
  return Response.json({ project: publicProject(row) });
}

function deriveName(goal: string) {
  const clipped = goal.replace(/\s+/g, " ").trim();
  return clipped.length > 42 ? `${clipped.slice(0, 42)}…` : clipped || "Untitled experiment";
}
