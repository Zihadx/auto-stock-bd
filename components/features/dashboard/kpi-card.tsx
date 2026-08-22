import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export function KpiCard({
  label,
  value,
  deltaPct,
  context,
}: {
  label: string;
  value: string;
  deltaPct: number;
  context: string;
}) {
  const trend = deltaPct > 0 ? "up" : deltaPct < 0 ? "down" : "flat";
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  return (
    <div className="rounded-md border border-line bg-paper-raised p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">{label}</p>
      <p className="mt-2 font-tabular text-2xl font-semibold text-ink">{value}</p>
      <div className="mt-2 flex items-center gap-1.5">
        <span
          className={cn(
            "flex items-center gap-0.5 text-xs font-medium",
            trend === "up" && "text-success",
            trend === "down" && "text-danger",
            trend === "flat" && "text-ink-faint",
          )}
        >
          <TrendIcon className="h-3 w-3" aria-hidden />
          {deltaPct > 0 ? "+" : ""}
          {deltaPct}%
        </span>
        <span className="text-xs text-ink-faint">{context}</span>
      </div>
    </div>
  );
}
