import { formatBDT } from "@/lib/format";
import { cn } from "@/lib/utils";

export function PriceDisplay({
  amount,
  negotiable,
  className,
  size = "md",
}: {
  amount: number;
  negotiable?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl md:text-3xl",
  }[size];

  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <span className={cn("font-tabular font-semibold text-ink", sizeClass)}>
        {formatBDT(amount)}
      </span>
      {negotiable && <span className="text-xs text-ink-faint">Negotiable</span>}
    </div>
  );
}
