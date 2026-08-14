export function formatDuration(ms: number | null | undefined) {
  if (!ms && ms !== 0) return "—";
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

export function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export function prettyModel(name: string) {
  return name.replace(/_/g, " ").replace(/\b\w/g, (ch) => ch.toUpperCase());
}

export function prettyMetric(name: string) {
  if (name === "r2") return "R²";
  if (name === "rmse") return "RMSE";
  if (name === "mae") return "MAE";
  if (name === "mape") return "MAPE";
  if (name === "f1") return "F1";
  return name[0]?.toUpperCase() + name.slice(1);
}
