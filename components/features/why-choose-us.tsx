"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { AnimatePresence, motion } from "framer-motion";

import {
  ArrowUpRight,
  FileCheck2,
  Gauge,
  ShieldCheck,
  Tag,
  TrendingUp,
  Truck,
  Wrench,
} from "lucide-react";

import { useTheme } from "next-themes";

import { ACCENT, BURGUNDY, CHARCOAL, GOLD, LINE, PAPER, PINK } from "../ui/tokens";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useMounted } from "@/hooks/use-mounted";


const DISPLAY_SERIF = "Georgia, 'Times New Roman', serif";

function alpha(color: string, opacity: number) {
  if (!color.startsWith("#")) return color;

  const hex = color.replace("#", "");
  const normalized = hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex;

  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

type Reason = (typeof reasons)[number];

const reasons = [
  {
    number: "01",
    title: "82-Point Inspection",
    description:
      "Every vehicle passes a structured inspection covering mechanical condition, safety, history, cosmetics, and road readiness.",
    icon: Gauge,
    eyebrow: "Condition first",
    accent: GOLD,
  },
  {
    number: "02",
    title: "Verified Documentation",
    description:
      "Ownership, registration, service records, and vehicle history are carefully checked before a car enters the collection.",
    icon: FileCheck2,
    eyebrow: "Proof, not promises",
    accent: ACCENT,
  },
  {
    number: "03",
    title: "One Settled Price",
    description:
      "No artificial markdowns or confusing negotiations. You see a considered price built around the actual vehicle and market.",
    icon: Tag,
    eyebrow: "Clear value",
    accent: PINK,
  },
  {
    number: "04",
    title: "90-Day Mechanical Cover",
    description:
      "Selected vehicles include additional mechanical protection, giving you greater confidence after the handover.",
    icon: Wrench,
    eyebrow: "Aftercare",
    accent: BURGUNDY,
  },
  {
    number: "05",
    title: "Live Market Benchmarking",
    description:
      "Pricing is continuously compared against relevant market data so every vehicle remains competitively positioned.",
    icon: TrendingUp,
    eyebrow: "Market intelligence",
    accent: GOLD,
  },
  {
    number: "06",
    title: "Doorstep Delivery",
    description:
      "From showroom to driveway, your vehicle can be delivered with the same attention to detail as the purchase itself.",
    icon: Truck,
    eyebrow: "White-glove handover",
    accent: ACCENT,
  },
] as const;

/* ============================================================
   THEME TOKENS
============================================================ */

function buildTheme(isLight: boolean) {
  const tone = (
    light: number,
    darkColor: string,
    dark: number,
  ) =>
    isLight
      ? `rgba(23,21,18,${light})`
      : alpha(darkColor, dark);

  return {
    isLight,

    background: isLight ? "#F5F3EE" : CHARCOAL,

    text: isLight ? "#171512" : PAPER,

    textMuted: tone(0.76, PAPER, 0.82),
    textSubtle: tone(0.68, PAPER, 0.72),

    border: tone(0.18, LINE, 0.70),
    borderSoft: tone(0.15, LINE, 0.60),
    borderFaint: tone(0.13, LINE, 0.52),
    borderIcon: tone(0.18, LINE, 0.68),
    borderCard: tone(0.16, LINE, 0.62),

    panelBg: isLight
      ? "linear-gradient(145deg, rgba(255,255,255,0.82), rgba(255,255,255,0.58))"
      : `linear-gradient(145deg, ${alpha(PAPER, 0.07)}, ${alpha(PAPER, 0.025)})`,

    panelShadow: isLight
      ? "0 30px 90px rgba(23,21,18,0.10), inset 0 1px 0 rgba(255,255,255,0.8)"
      : `0 30px 90px ${alpha("#000000", 0.32)}, inset 0 1px 0 ${alpha(PAPER, 0.07)}`,

    kicker: tone(0.68, PAPER, 0.72),
    subhead: tone(0.72, PAPER, 0.78),
    statLabel: tone(0.68, PAPER, 0.72),
    nowReading: tone(0.68, PAPER, 0.72),

    activeBoxBg: isLight
      ? "rgba(255,255,255,0.58)"
      : alpha(PAPER, 0.035),

    dotInactive: tone(0.46, PAPER, 0.46),
    dotCounter: tone(0.62, PAPER, 0.62),

    cardIdleBg: isLight
      ? "rgba(255,255,255,0.58)"
      : alpha(PAPER, 0.018),

    cardIdleShadow: isLight
      ? "0 12px 40px rgba(23,21,18,0.035)"
      : undefined,

    cardActiveShadow: isLight
      ? "0 25px 70px rgba(23,21,18,0.09), inset 0 1px 0 rgba(255,255,255,0.78)"
      : `0 25px 70px ${alpha("#000000", 0.22)}, inset 0 1px 0 ${alpha(PAPER, 0.07)}`,

    iconIdleBg: isLight
      ? "rgba(23,21,18,0.055)"
      : alpha(PAPER, 0.035),

    iconIdleColor: tone(0.70, PAPER, 0.72),

    numberIdle: tone(0.58, PAPER, 0.58),
    numberMobile: tone(0.55, PAPER, 0.55),

    eyebrowIdle: tone(0.64, PAPER, 0.68),

    arrowIdle: tone(0.58, PAPER, 0.60),

    footerText: tone(0.70, PAPER, 0.74),
  };
}

type Theme = ReturnType<typeof buildTheme>;

/* ============================================================
   SCROLL SPY
============================================================ */

function useScrollSpy(count: number) {
  const [active, setActive] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const nodesRef = useRef<(HTMLElement | null)[]>([]);
  const refCache = useRef(new Map<number, (node: HTMLElement | null) => void>());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;

        const center = container.getBoundingClientRect().top + container.getBoundingClientRect().height / 2;

        const closest = visible.reduce((best, entry) => {
          const bestCenter = best.boundingClientRect.top + best.boundingClientRect.height / 2;
          const currentCenter = entry.boundingClientRect.top + entry.boundingClientRect.height / 2;
          return Math.abs(currentCenter - center) < Math.abs(bestCenter - center) ? entry : best;
        });

        const index = nodesRef.current.findIndex((node) => node === closest.target);
        if (index !== -1) setActive(index);
      },
      { root: container, rootMargin: "-35% 0px -35% 0px", threshold: 0 },
    );

    nodesRef.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, [count]);

  const setRef = useCallback((index: number) => {
    let cb = refCache.current.get(index);
    if (!cb) {
      cb = (node) => {
        nodesRef.current[index] = node;
      };
      refCache.current.set(index, cb);
    }
    return cb;
  }, []);

  const scrollTo = useCallback((index: number) => {
    const container = containerRef.current;
    const node = nodesRef.current[index];
    if (!container || !node) return;

    const containerRect = container.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    const offset = nodeRect.top - containerRect.top - containerRect.height / 2 + nodeRect.height / 2;

    container.scrollTo({ top: container.scrollTop + offset, behavior: "smooth" });
    setActive(index);
  }, []);

  return { active, containerRef, setRef, scrollTo };
}

export default function WhyChooseUs({
  stats: inventoryStats,
}: {
  stats: { totalAvailable: number; brandCount: number };
}) {
  const mounted = useMounted();
  const { resolvedTheme } = useTheme();
  // Before mount: always dark, matching defaultTheme="dark" and avoiding a
  // hydration flash. After mount: the real, stable, user-selected theme.
  const isLight = mounted && resolvedTheme === "light";
  const theme = useMemo(() => buildTheme(isLight), [isLight]);

  const stats = useMemo(
    () => [
      { value: String(inventoryStats.totalAvailable), label: "Vehicles currently listed" },
      { value: String(inventoryStats.brandCount), label: "Manufacturers represented" },
      { value: "82-Point", label: "Inspection standard" },
    ],
    [inventoryStats.totalAvailable, inventoryStats.brandCount],
  );

  const { active, containerRef, setRef, scrollTo } = useScrollSpy(reasons.length);
  const activeReason = reasons[active];

  return (
    <section className="relative overflow-hidden py-20" style={{ backgroundColor: theme.background, color: theme.text }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(600px circle at 0% 50%, ${ACCENT}${isLight ? "09" : "0B"}, transparent 65%),
            radial-gradient(500px circle at 100% 20%, ${GOLD}${isLight ? "0A" : "07"}, transparent 65%)
          `,
        }}
      />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: ease.out }}
          className="mb-12 max-w-3xl lg:mb-14"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8" style={{ background: GOLD }} />
            <span className="text-[10px] font-medium uppercase tracking-[0.28em]" style={{ color: theme.textSubtle }}>
              The assurance standard
            </span>
          </div>

          <h2
            className="max-w-2xl text-[clamp(2.5rem,5vw,4.7rem)] leading-[0.95] tracking-[-0.045em]"
            style={{ fontFamily: DISPLAY_SERIF, fontWeight: 400, color: theme.text }}
          >
            Buying a car should
            <span className="block italic" style={{ color: GOLD }}>
              feel certain.
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 sm:text-[15px]" style={{ color: theme.textMuted }}>
            Every vehicle is evaluated, documented, priced and prepared with one goal — making the decision feel
            remarkably straightforward.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 xl:gap-24">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease: ease.out }}
            >
              <div
                className="relative overflow-hidden rounded-[28px] border p-6 sm:p-7"
                style={{
                  borderColor: theme.border,
                  background: theme.panelBg,
                  boxShadow: theme.panelShadow,
                  backdropFilter: "blur(18px)",
                }}
              >
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full blur-[80px]"
                  style={{ background: alpha(GOLD, isLight ? 0.11 : 0.08) }}
                />

                <div className="relative">
                  <div className="mb-10 flex items-start justify-between gap-5">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.25em]" style={{ color: theme.kicker }}>
                        Why choose us
                      </p>
                      <div className="mt-3 h-px w-10" style={{ background: GOLD }} />
                    </div>

                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full border"
                      style={{ borderColor: alpha(GOLD, 0.25), background: alpha(GOLD, 0.055) }}
                    >
                      <ShieldCheck size={17} strokeWidth={1.5} style={{ color: GOLD }} />
                    </div>
                  </div>

                  <div className="mb-10">
                    <p
                      className="text-[clamp(2rem,3vw,3rem)] leading-none tracking-[-0.04em]"
                      style={{ fontFamily: DISPLAY_SERIF, color: theme.text }}
                    >
                      Confidence,
                    </p>
                    <p
                      className="mt-1 text-[clamp(2rem,3vw,3rem)] italic leading-none tracking-[-0.04em]"
                      style={{ fontFamily: DISPLAY_SERIF, color: theme.subhead }}
                    >
                      built in.
                    </p>
                  </div>

                  <div className="divide-y" style={{ borderColor: theme.borderSoft }}>
                    {stats.map((stat, index) => (
                      <div key={stat.label} className="flex items-center justify-between gap-5 py-4 first:pt-0 last:pb-0">
                        <div>
                          <div
                            className="text-lg tracking-[-0.02em] sm:text-xl"
                            style={{ fontFamily: DISPLAY_SERIF, color: theme.text }}
                          >
                            {stat.value}
                          </div>
                          <div className="mt-1 text-[9px] uppercase tracking-[0.18em]" style={{ color: theme.statLabel }}>
                            {stat.label}
                          </div>
                        </div>
                        <span className="text-[9px]" style={{ color: alpha(GOLD, 0.55) }}>
                          0{index + 1}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-2xl border p-4" style={{ borderColor: theme.borderFaint, background: theme.activeBoxBg }}>
                    <div className="flex items-center gap-2">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: GOLD, boxShadow: `0 0 12px ${alpha(GOLD, 0.65)}` }}
                      />
                      <span className="text-[9px] uppercase tracking-[0.2em]" style={{ color: theme.nowReading }}>
                        Now reading
                      </span>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeReason.title}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.25, ease: ease.out }}
                        className="mt-2 truncate text-sm"
                        style={{ color: theme.text }}
                      >
                        {activeReason.title}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="mt-5 hidden items-center gap-3 px-1 lg:flex">
                <div className="flex items-center gap-2">
                  {reasons.map((reason, index) => (
                    <ProgressDot
                      key={reason.number}
                      label={reason.title}
                      index={index}
                      isActive={active === index}
                      theme={theme}
                      onSelect={scrollTo}
                    />
                  ))}
                </div>

                <span className="ml-auto text-[9px] uppercase tracking-[0.2em]" style={{ color: theme.dotCounter }}>
                  {String(active + 1).padStart(2, "0")} / {String(reasons.length).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          </div>

          <div className="min-w-0">
            <div
              ref={containerRef}
              className="min-h-0 lg:h-[620px] lg:overflow-y-auto lg:overscroll-contain lg:pr-5"
              style={{ scrollbarWidth: "thin", scrollbarColor: `${alpha(GOLD, 0.35)} transparent` }}
            >
              <div className="space-y-3 pb-2 lg:space-y-4">
                {reasons.map((reason, index) => (
                  <ReasonCard
                    key={reason.number}
                    reason={reason}
                    index={index}
                    isActive={active === index}
                    theme={theme}
                    refCallback={setRef(index)}
                    onSelect={scrollTo}
                  />
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: ease.out }}
              className="mt-8 border-t pt-6"
              style={{ borderColor: theme.borderCard }}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xl text-xs leading-6" style={{ color: theme.footerText }}>
                  The result is a simpler way to buy — fewer unknowns, better information, and confidence that lasts
                  beyond the handover.
                </p>

                <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em]" style={{ color: alpha(GOLD, 0.7) }}>
                  <ShieldCheck size={14} strokeWidth={1.5} />
                  <span>Verified standard</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   REASON CARD
============================================================ */

const ReasonCard = memo(function ReasonCard({
  reason,
  index,
  isActive,
  theme,
  refCallback,
  onSelect,
}: {
  reason: Reason;
  index: number;
  isActive: boolean;
  theme: Theme;
  refCallback: (node: HTMLElement | null) => void;
  onSelect: (index: number) => void;
}) {
  const Icon = reason.icon;
  const isLight = theme.isLight;
  const pick = (light: number, dark: number) => (isLight ? light : dark);

  const descColor = isLight
    ? `rgba(23,21,18,${isActive ? 0.62 : 0.48})`
    : alpha(PAPER, isActive ? 0.62 : 0.48);

  return (
    <motion.article
      ref={refCallback}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: ease.out }}
      className="group relative"
    >
      <button type="button" onClick={() => onSelect(index)} className="relative w-full text-left">
        <motion.div
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.3, ease: ease.out }}
          className="absolute inset-0 rounded-[24px]"
          style={{
            background: `linear-gradient(135deg, ${alpha(reason.accent, pick(0.075, 0.09))}, ${alpha(PAPER, pick(0.34, 0.025))})`,
            border: `1px solid ${alpha(reason.accent, pick(0.18, 0.2))}`,
            boxShadow: theme.cardActiveShadow,
          }}
        />

        <div
          className={cn(
            "relative rounded-[24px] border p-5 transition-all duration-300 sm:p-6 lg:p-7",
            !isActive && "hover:bg-white/[0.025]",
          )}
          style={{
            borderColor: isActive ? alpha(reason.accent, 0.2) : theme.borderCard,
            background: isActive ? "transparent" : theme.cardIdleBg,
            boxShadow: !isActive ? theme.cardIdleShadow : undefined,
          }}
        >
          <div className="flex gap-5 sm:gap-7">
            <div className="hidden w-10 shrink-0 pt-1 sm:block">
              <span className="text-[10px] tracking-[0.18em]" style={{ color: isActive ? reason.accent : theme.numberIdle }}>
                {reason.number}
              </span>
            </div>

            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300 sm:h-12 sm:w-12"
              style={{
                borderColor: isActive ? alpha(reason.accent, 0.3) : theme.borderIcon,
                background: isActive ? alpha(reason.accent, 0.08) : theme.iconIdleBg,
              }}
            >
              <Icon size={18} strokeWidth={1.5} style={{ color: isActive ? reason.accent : theme.iconIdleColor }} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span
                  className="text-[9px] uppercase tracking-[0.2em]"
                  style={{ color: isActive ? reason.accent : theme.eyebrowIdle }}
                >
                  {reason.eyebrow}
                </span>
                <span className="text-[9px] sm:hidden" style={{ color: theme.numberMobile }}>
                  {reason.number}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <h3
                  className="text-xl leading-tight tracking-[-0.025em] sm:text-2xl lg:text-[27px]"
                  style={{ fontFamily: DISPLAY_SERIF, fontWeight: 400, color: theme.text }}
                >
                  {reason.title}
                </h3>

                <motion.div
                  animate={{ x: isActive ? 0 : -3, y: isActive ? 0 : 3, opacity: isActive ? 1 : 0.45 }}
                  transition={{ duration: 0.3, ease: ease.out }}
                  className="hidden shrink-0 sm:block"
                >
                  <ArrowUpRight size={17} strokeWidth={1.4} style={{ color: isActive ? reason.accent : theme.arrowIdle }} />
                </motion.div>
              </div>

              <p className="mt-3 max-w-xl text-[13px] leading-6 sm:text-sm sm:leading-7" style={{ color: descColor }}>
                {reason.description}
              </p>
            </div>
          </div>

          <div
            className="absolute bottom-0 left-6 right-6 h-px origin-left overflow-hidden sm:left-7 sm:right-7"
            style={{ background: theme.borderCard }}
          >
            <motion.div
              initial={false}
              animate={{ scaleX: isActive ? 1 : 0 }}
              transition={{ duration: 0.5, ease: ease.out }}
              className="h-full origin-left"
              style={{ background: reason.accent }}
            />
          </div>
        </div>
      </button>
    </motion.article>
  );
});

ReasonCard.displayName = "ReasonCard";

/* ============================================================
   PROGRESS DOT
============================================================ */

const ProgressDot = memo(function ProgressDot({
  label,
  index,
  isActive,
  theme,
  onSelect,
}: {
  label: string;
  index: number;
  isActive: boolean;
  theme: Theme;
  onSelect: (index: number) => void;
}) {
  return (
    <button
      type="button"
      aria-label={`Go to ${label}`}
      aria-current={isActive ? "true" : undefined}
      onClick={() => onSelect(index)}
      className="group relative flex h-7 w-7 items-center justify-center"
    >
      <span
        className={cn("h-1.5 rounded-full transition-all duration-300", isActive ? "w-6" : "w-1.5")}
        style={{ background: isActive ? GOLD : theme.dotInactive }}
      />
    </button>
  );
});

ProgressDot.displayName = "ProgressDot";