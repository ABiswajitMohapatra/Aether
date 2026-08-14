import type { DatasetRow, ExperimentRow, ProjectRow } from "@/db/schema";

export function publicDataset(row: DatasetRow) {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    source: row.source,
    taskType: row.taskType,
    targetColumn: row.targetColumn,
    featureColumns: row.featureColumns,
    rowCount: row.rowCount,
    description: row.description,
    stats: row.stats,
    createdAt: row.createdAt.toISOString(),
  };
}

export function publicProject(row: ProjectRow) {
  return {
    ...row,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export function publicExperiment(row: ExperimentRow) {
  return {
    ...row,
    createdAt: row.createdAt.toISOString(),
    completedAt: row.completedAt ? row.completedAt.toISOString() : null,
  };
}

export function jsonError(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}
