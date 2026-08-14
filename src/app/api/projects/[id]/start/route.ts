import { startProject } from "@/lib/agent/graph";
import { jsonError } from "@/lib/api";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  try {
    const result = await startProject(id);
    return Response.json({ ok: true, ...result });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to start project", 500);
  }
}
