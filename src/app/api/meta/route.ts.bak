import { describeLLM } from "@/lib/agent/llm";
import { MODEL_REGISTRY } from "@/lib/ml/registry";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    llm: describeLLM(),
    models: MODEL_REGISTRY.map((model) => ({
      name: model.name,
      label: model.label,
      family: model.family,
      tasks: model.tasks,
      description: model.description,
    })),
  });
}
