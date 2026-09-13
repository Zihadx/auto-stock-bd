
import { EDITORIAL_INK_LIGHT, PAPER } from "@/components/ui/tokens";
import { HEADLINE_STATS } from "./utils";

interface StatsListProps {
  vertical?: boolean;
  /**
   * "light"  — force light text. Use when the surrounding surface is always
   *            dark regardless of page theme (e.g. the panel over the hero photo).
   * "auto"   — follow the page theme. Use when the surrounding surface itself
   *            flips with the page theme (e.g. the mobile stats bar).
   */
  tone: "auto" | "light";
  isLight: boolean;
}

export function StatsList({ vertical = false, tone, isLight }: StatsListProps) {
  const useLightText = tone === "light" || !isLight;
  const valueColor = useLightText ? PAPER : EDITORIAL_INK_LIGHT;
  const labelColor = useLightText ? "rgba(243,238,230,0.66)" : "rgba(23,21,18,0.6)";
  const dividerColor = useLightText ? "rgba(243,238,230,0.16)" : "rgba(23,21,18,0.14)";

  return (
    <>
      {HEADLINE_STATS.map(({ icon: Icon, value, label }, i) => (
        <div
          key={label}
          className={
            vertical
              ? `flex flex-col items-center gap-2 text-center ${i > 0 ? "mt-4 border-t pt-4" : ""}`
              : "flex flex-1 flex-col items-center gap-2 text-center"
          }
          style={vertical && i > 0 ? { borderColor: dividerColor } : undefined}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#CBA36B]/[0.16]">
            <Icon size={14} className="text-[#CBA36B]" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <div className="[font-family:var(--font-display)] text-[15px] font-semibold" style={{ color: valueColor }}>
            {value}
          </div>
          <div className="text-[10px] font-medium uppercase tracking-[0.12em]" style={{ color: labelColor }}>
            {label}
          </div>
        </div>
      ))}
    </>
  );
}