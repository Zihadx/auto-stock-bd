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
    <div className="rounded-md border border-line bg-paper-raised p-5 transition-[border-color,box-shadow] duration-200 hover:border-line-strong hover:shadow-sm">
      <p className="text-label text-ink-faint">{label}</p>
      <p className="text-h2 font-tabular mt-2 text-ink">{value}</p>
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
