import { stepProject } from "@/lib/agent/graph";
import { jsonError } from "@/lib/api";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  try {
    const result = await stepProject(id);
    return Response.json(result);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Experiment step failed", 500);
  }
}
