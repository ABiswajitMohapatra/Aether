import { db } from "@/db";
import { datasets } from "@/db/schema";
import { createId } from "@/lib/id";
import { builtinDatasets, describeBuiltin } from "@/lib/ml/datasets";
import { logger } from "@/lib/logger";

let seeded = false;
// Jab do API routes ek saath seeding shuru karte hain, dono ko ek hi promise
// par wait karana hai — warna dono same slug insert karke duplicate key error dete hain.
let seeding: Promise<void> | null = null;

async function runSeed() {
  const existing = await db.select({ slug: datasets.slug }).from(datasets);
  const have = new Set(existing.map((row) => row.slug));
  const builtins = builtinDatasets();

  for (const dataset of builtins) {
    if (have.has(dataset.slug)) continue;
    const described = describeBuiltin(dataset);

    const inserted = await db
      .insert(datasets)
      .values({
        id: createId("ds"),
        name: described.name,
        slug: described.slug,
        source: "builtin",
        taskType: described.taskType,
        targetColumn: described.targetColumn,
        featureColumns: described.featureColumns,
        rowCount: described.rowCount,
        description: described.description,
        stats: described.stats,
        payload: described.payload,
      })
      // Agar koi doosra request pehle hi ye slug daal chuka hai to chup-chaap skip karo.
      .onConflictDoNothing({ target: datasets.slug })
      .returning({ slug: datasets.slug });

    if (inserted.length > 0) {
      logger.info("seed", `Inserted builtin dataset ${dataset.slug}`);
    } else {
      logger.info("seed", `Builtin dataset ${dataset.slug} already present, skipped`);
    }
  }

  seeded = true;
}

export async function ensureSeeded() {
  if (seeded) return;
  if (!seeding) {
    seeding = runSeed().finally(() => {
      seeding = null;
    });
  }
  await seeding;
}
