import { formatMetric } from "@/lib/ml/metrics";
import { prettyModel } from "@/lib/format";

export function MetricBars({
  items,
  invert,
  metric,
}: {
  items: Array<{ label: string; value: number; active?: boolean }>;
  invert?: boolean;
  metric: string;
}) {
  if (items.length === 0) {
    return <EmptyPlot label="Metrics appear after the first completed run" />;
  }
  const values = items.map((item) => item.value).filter((value) => Number.isFinite(value));
  const max = Math.max(...values, 1e-6);
  const min = Math.min(...values);
  return (
    <div className="space-y-3">
      {items.map((item) => {
        const width = invert
          ? ((max - item.value + (max - min) * 0.08) / (max - min + 1e-6)) * 100
          : (item.value / max) * 100;
        return (
          <div key={item.label}>
            <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-[#8b93a7]">
              <span>{prettyModel(item.label)}</span>
              <span className="mono text-[#e8ebf4]">{formatMetric(metric, item.value)}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/5">
              <div
                className={`h-full rounded-full ${item.active ? "bg-[#5eead4]" : "bg-gradient-to-r from-[#8b9cff] to-[#5eead4]"}`}
                style={{ width: `${Math.max(8, Math.min(100, width))}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function HistoryLine({
  points,
  metric,
}: {
  points: Array<{ x: number; y: number; label: string }>;
  metric: string;
}) {
  if (points.length === 0) return <EmptyPlot label="The learning curve will plot here" />;
  const w = 520;
  const h = 180;
  const ys = points.map((p) => p.y);
  const min = Math.min(...ys);
  const max = Math.max(...ys);
  const pad = (max - min) * 0.18 || 0.05;
  const yAt = (value: number) => {
    const lo = min - pad;
    const hi = max + pad;
    return h - 24 - ((value - lo) / (hi - lo || 1)) * (h - 40);
  };
  const xAt = (index: number) => 24 + (index * (w - 48)) / Math.max(points.length - 1, 1);
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${xAt(i)},${yAt(p.y)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-44 w-full">
      <text x="16" y="16" fill="#8b93a7" fontSize="10">
        {metric.toUpperCase()}
      </text>
      <path d={d} fill="none" stroke="#5eead4" strokeWidth="2.2" />
      {points.map((p, i) => (
        <g key={`${p.label}-${i}`}>
          <circle cx={xAt(i)} cy={yAt(p.y)} r="3.5" fill="#e3c27a" />
          <text x={xAt(i)} y={h - 6} textAnchor="middle" fill="#8b93a7" fontSize="10">
            {p.x}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function ScatterPlot({ y, pred }: { y: number[]; pred: number[] }) {
  if (!y.length) return <EmptyPlot label="Predicted vs actual appears after evaluation" />;
  const w = 320;
  const h = 220;
  const all = [...y, ...pred];
  const min = Math.min(...all);
  const max = Math.max(...all);
  const proj = (value: number) => {
    const t = (value - min) / (max - min || 1);
    return 24 + t * (Math.min(w, h) - 48);
  };
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-52 w-full">
      <line x1="24" y1={h - 24} x2={w - 16} y2="24" stroke="rgba(227,194,122,0.35)" strokeDasharray="4 4" />
      {y.map((value, i) => (
        <circle
          key={i}
          cx={24 + ((pred[i] - min) / (max - min || 1)) * (w - 48)}
          cy={h - 24 - ((value - min) / (max - min || 1)) * (h - 48)}
          r="3"
          fill="rgba(94,234,212,0.8)"
        />
      ))}
      <text x="24" y={h - 8} fill="#8b93a7" fontSize="10">
        predicted
      </text>
      <text x="12" y="16" fill="#8b93a7" fontSize="10">
        actual {proj(min) ? "" : ""}
      </text>
    </svg>
  );
}

export function ImportanceBars({ items }: { items: Array<{ name: string; importance: number }> }) {
  if (!items.length) return <EmptyPlot label="Feature importance is recorded per run" />;
  const max = Math.max(...items.map((item) => item.importance), 1e-6);
  return (
    <div className="space-y-2">
      {items
        .slice()
        .sort((a, b) => b.importance - a.importance)
        .slice(0, 8)
        .map((item) => (
          <div key={item.name} className="grid grid-cols-[110px_1fr_42px] items-center gap-2 text-xs">
            <span className="truncate text-[#8b93a7]">{item.name}</span>
            <div className="h-1.5 rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-[#8b9cff]"
                style={{ width: `${(item.importance / max) * 100}%` }}
              />
            </div>
            <span className="mono text-right text-[#e8ebf4]">{item.importance.toFixed(2)}</span>
          </div>
        ))}
    </div>
  );
}

function EmptyPlot({ label }: { label: string }) {
  return (
    <div className="grid h-36 place-items-center rounded-2xl border border-dashed border-white/10 text-center text-sm text-[#8b93a7]">
      {label}
    </div>
  );
}
