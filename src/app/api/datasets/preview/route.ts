import { jsonError } from "@/lib/api";
import { parseCsv } from "@/lib/ml/preprocess";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return jsonError("Upload a CSV file");
  const text = await file.text();
  const parsed = parseCsv(text);
  return Response.json({
    headers: parsed.headers,
    preview: parsed.rows.slice(0, 6),
    rowCount: parsed.rows.length,
  });
}
