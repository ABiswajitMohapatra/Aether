import { integer, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import type {
  AgentPhase,
  CrossValidation,
  DatasetPayload,
  DatasetStats,
  ExperimentPlan,
  FeatureImportance,
  FinalReport,
  HyperParams,
  Metrics,
  PredictionPreview,
  ProjectStatus,
  TaskType,
} from "@/lib/domain";

export const datasets = pgTable("datasets", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  source: text("source").notNull(),
  taskType: text("task_type").$type<TaskType>().notNull(),
  targetColumn: text("target_column").notNull(),
  featureColumns: jsonb("feature_columns").$type<string[]>().notNull(),
  rowCount: integer("row_count").notNull(),
  description: text("description").notNull(),
  stats: jsonb("stats").$type<DatasetStats>().notNull(),
  payload: jsonb("payload").$type<DatasetPayload>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const projects = pgTable("projects", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  goal: text("goal").notNull(),
  status: text("status").$type<ProjectStatus>().notNull().default("draft"),
  phase: text("phase").$type<AgentPhase>().notNull().default("idle"),
  taskType: text("task_type").$type<TaskType>(),
  primaryMetric: text("primary_metric"),
  optimize: text("optimize"),
  datasetId: text("dataset_id").references(() => datasets.id),
  maxExperiments: integer("max_experiments").notNull().default(6),
  minExperiments: integer("min_experiments").notNull().default(5),
  bestExperimentId: text("best_experiment_id"),
  plan: jsonb("plan").$type<ExperimentPlan | null>(),
  report: jsonb("report").$type<FinalReport | null>(),
  summary: text("summary"),
  error: text("error"),
  nextConfig: jsonb("next_config"),
  iteration: integer("iteration").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const experiments = pgTable("experiments", {
  id: text("id").primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  runNumber: integer("run_number").notNull(),
  modelName: text("model_name").notNull(),
  hyperparameters: jsonb("hyperparameters").$type<HyperParams>().notNull(),
  datasetInfo: jsonb("dataset_info").$type<Record<string, unknown>>(),
  status: text("status").notNull().default("queued"),
  trainMetrics: jsonb("train_metrics").$type<Metrics | null>(),
  testMetrics: jsonb("test_metrics").$type<Metrics | null>(),
  cvMetrics: jsonb("cv_metrics").$type<CrossValidation | null>(),
  featureImportance: jsonb("feature_importance").$type<FeatureImportance[] | null>(),
  preview: jsonb("preview").$type<PredictionPreview | null>(),
  coefficients: jsonb("coefficients").$type<Record<string, number> | null>(),
  trainDurationMs: integer("train_duration_ms"),
  notes: text("notes"),
  decisionReason: text("decision_reason"),
  trackingUri: text("tracking_uri"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});

export const agentLogs = pgTable("agent_logs", {
  id: text("id").primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  experimentId: text("experiment_id"),
  node: text("node").notNull(),
  phase: text("phase").notNull(),
  level: text("level").notNull().default("info"),
  message: text("message").notNull(),
  payload: jsonb("payload"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const trackingRuns = pgTable("tracking_runs", {
  id: text("id").primaryKey(),
  experimentId: text("experiment_id")
    .notNull()
    .references(() => experiments.id, { onDelete: "cascade" }),
  projectId: text("project_id").notNull(),
  name: text("name").notNull(),
  params: jsonb("params").$type<HyperParams>().notNull(),
  metrics: jsonb("metrics").$type<Metrics>().notNull(),
  tags: jsonb("tags").$type<Record<string, string>>().notNull(),
  artifactUri: text("artifact_uri"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type DatasetRow = typeof datasets.$inferSelect;
export type ProjectRow = typeof projects.$inferSelect;
export type ExperimentRow = typeof experiments.$inferSelect;
export type AgentLogRow = typeof agentLogs.$inferSelect;
