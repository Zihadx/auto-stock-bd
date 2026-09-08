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
  const trend =
    deltaPct > 0 ? "up" : deltaPct < 0 ? "down" : "flat";

  const TrendIcon =
    trend === "up"
      ? TrendingUp
      : trend === "down"
        ? TrendingDown
        : Minus;

  return (
    <div
      className={cn(
        "rounded-md border p-5",
        "transition-[border-color,box-shadow,transform] duration-200",
        "hover:-translate-y-0.5 hover:shadow-sm",
        "bg-paper-raised border-line hover:border-line-strong",
        "dark:bg-paper-raised dark:border-line",
      )}
    >
      <p className="text-label text-ink-faint font-medium">
        {label}
      </p>

      <p className="text-h2 font-tabular mt-2 text-ink">
        {value}
      </p>

      <div className="mt-2 flex items-center gap-1.5">
        <span
          className={cn(
            "flex items-center gap-0.5 text-xs font-semibold",
            trend === "up" && "text-success",
            trend === "down" && "text-danger",
            trend === "flat" && "text-ink-faint",
          )}
        >
          <TrendIcon
            className="h-3.5 w-3.5"
            strokeWidth={2}
            aria-hidden
          />

          {deltaPct > 0 ? "+" : ""}
          {deltaPct}%
        </span>

        <span className="text-xs font-medium text-ink-faint">
          {context}
        </span>
      </div>
    </div>
  );
}