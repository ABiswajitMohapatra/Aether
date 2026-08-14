type Level = "debug" | "info" | "warn" | "error";

function stamp(level: Level, scope: string, message: string, extra?: unknown) {
  const line = `[${new Date().toISOString()}] [${level.toUpperCase()}] [${scope}] ${message}`;
  if (extra !== undefined) {
    console.log(line, extra);
    return;
  }
  console.log(line);
}

export const logger = {
  debug(scope: string, message: string, extra?: unknown) {
    stamp("debug", scope, message, extra);
  },
  info(scope: string, message: string, extra?: unknown) {
    stamp("info", scope, message, extra);
  },
  warn(scope: string, message: string, extra?: unknown) {
    stamp("warn", scope, message, extra);
  },
  error(scope: string, message: string, extra?: unknown) {
    stamp("error", scope, message, extra);
  },
};
