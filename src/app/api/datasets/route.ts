import { desc } from "drizzle-orm";
import { db } from "@/db";
import { datasets } from "@/db/schema";
import { jsonError, publicDataset } from "@/lib/api";
import { createId } from "@/lib/id";
import { computeDatasetStats, csvToPayload, parseCsv } from "@/lib/ml/preprocess";
import { ensureSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";

/**
 * Upload row cap.
 *
 * Override with MAX_UPLOAD_ROWS in .env (e.g. MAX_UPLOAD_ROWS=50000).
 * The cap exists because every experiment trains on the full dataset and the
 * k-fold cross-validation re-trains it once per fold, all inside the request
 * process. Distance-based models such as k-NN are the practical limit: their
 * cost grows with the square of the row count, so a run that takes ~2s at
 * 2,000 rows takes ~60s at 10,000.
 */
const MAX_UPLOAD_ROWS = (() => {
  const raw = Number(process.env.MAX_UPLOAD_ROWS);
  return Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : 25000;
})();

export async function GET() {
  await ensureSeeded();
  const rows = await db.select().from(datasets).orderBy(desc(datasets.createdAt));
  return Response.json({ datasets: rows.map(publicDataset) });
}

export async function POST(request: Request) {
  await ensureSeeded();
  const form = await request.formData();
  const file = form.get("file");
  const targetColumn = String(form.get("targetColumn") ?? "");
  const name = String(form.get("name") ?? "").trim();
  if (!(file instanceof File)) return jsonError("Upload a CSV file");
  if (!targetColumn) return jsonError("Choose a target column");

  const text = await file.text();
  const parsed = parseCsv(text);
  if (parsed.rows.length > MAX_UPLOAD_ROWS) {
    return jsonError(
      `Please keep uploaded CSVs to ${MAX_UPLOAD_ROWS.toLocaleString("en-US")} rows or fewer (this file has ${parsed.rows.length.toLocaleString("en-US")}).`,
    );
  }
  const payload = csvToPayload(parsed.headers, parsed.rows, targetColumn);
  const taskType = payload.classNames ? "classification" : "regression";
  const stats = computeDatasetStats(payload, taskType);
  const [row] = await db
    .insert(datasets)
    .values({
      id: createId("ds"),
      name: name || file.name.replace(/\.csv$/i, ""),
      slug: `upload-${Date.now()}`,
      source: "upload",
      taskType,
      targetColumn,
      featureColumns: payload.featureNames,
      rowCount: payload.X.length,
      description: `Uploaded CSV with ${payload.X.length} rows.`,
      stats,
      payload,
    })
    .returning();
  return Response.json({ dataset: publicDataset(row) });
}

