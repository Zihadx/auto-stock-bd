"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Power } from "lucide-react";
import type { ComponentType, CSSProperties } from "react";
import {  ACCENT, BURGUNDY, CHARCOAL, GOLD, PAPER, PINK } from "../ui/tokens";


/* -----------------------------------------------------------------------
   Everything the sign-in and sign-up screens have in common: the palette,
   the brand mark, the draw-on-load silhouette, the stat columns, and the
   field shell. Both pages import from here and supply only what differs —
   copy, stats, and their own form fields.
----------------------------------------------------------------------- */

export const EASE_LUX = [0.16, 1, 0.3, 1] as const;

/* AuthVars — self-contained, flash-free palette (same pattern as the
   header): resolves from next-themes' `dark` class before first paint. */
export function AuthVars() {
  return (
    <style>{`
      :root {
        --auth-text: ${CHARCOAL};
        --auth-text-muted: ${CHARCOAL}A6;
        --auth-text-faint: ${CHARCOAL}70;
        --auth-border-soft: rgba(10,1,6,.09);
        --auth-field-bg: rgba(10,1,6,.02);
        --auth-field-border: rgba(10,1,6,.16);
        --auth-panel-bg: #ffffff;
        --auth-visual-bg: linear-gradient(160deg, ${CHARCOAL}, #1c0f08 60%, ${BURGUNDY}CC);
        --auth-visual-line: ${PAPER}30;
        --auth-visual-text: ${PAPER};
        --auth-visual-text-faint: ${PAPER}85;
        color-scheme: light;
      }
      .dark {
        --auth-text: ${PAPER};
        --auth-text-muted: ${PAPER}A0;
        --auth-text-faint: ${PAPER}68;
        --auth-border-soft: ${PAPER}10;
        --auth-field-bg: ${PAPER}05;
        --auth-field-border: ${PAPER}20;
        --auth-panel-bg: #0c0605;
        --auth-visual-bg: linear-gradient(160deg, #000000, ${CHARCOAL} 55%, ${BURGUNDY}B0);
        --auth-visual-line: ${PAPER}22;
        --auth-visual-text: ${PAPER};
        --auth-visual-text-faint: ${PAPER}78;
        color-scheme: dark;
      }
    `}</style>
  );
}

export const A = {
  text: "var(--auth-text)",
  textMuted: "var(--auth-text-muted)",
  textFaint: "var(--auth-text-faint)",
  borderSoft: "var(--auth-border-soft)",
  fieldBg: "var(--auth-field-bg)",
  fieldBorder: "var(--auth-field-border)",
  panelBg: "var(--auth-panel-bg)",
  visualBg: "var(--auth-visual-bg)",
  visualLine: "var(--auth-visual-line)",
  visualText: "var(--auth-visual-text)",
  visualTextFaint: "var(--auth-visual-text-faint)",
} as const;

/* Brand mark — used both in the visual panel (light-on-dark) and above
   the form on mobile, where the visual panel is hidden. */
export function BrandMark({ tone = "visual" }: { tone?: "visual" | "form" }) {
  const label = tone === "visual" ? A.visualText : A.text;
  const inner = tone === "visual" ? CHARCOAL : "currentColor";
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" fill="none" className="h-5 w-5" style={tone === "form" ? { color: A.text } : undefined}>
        <path d="M16 3L29 28H22.3L19.2 21.2H12.8L9.7 28H3L16 3Z" fill={ACCENT} />
        <path d="M14.1 17.2H17.9L16 12.8L14.1 17.2Z" fill={inner} />
      </svg>
      <span className="text-[10px] font-medium uppercase tracking-[0.38em]" style={{ color: label }}>
        AutoStock<span style={{ color: ACCENT }}> BD</span>
      </span>
    </Link>
  );
}

/* Line-art mark — a single silhouette that draws itself once on load,
   paired with a headlight sweep. The one bold, orchestrated motion moment
   shared by both screens. */
export function IgnitionMark() {
  return (
    <svg viewBox="0 0 400 190" fill="none" className="w-full max-w-[420px]" aria-hidden="true">
      <motion.path
        d="M28,132 C55,98 98,78 152,74 C208,70 258,76 296,96 C316,106 332,112 348,120"
        stroke={GOLD}
        strokeWidth={1.4}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.3, ease: EASE_LUX, delay: 0.2 }}
      />
      <motion.path
        d="M118,74 C136,54 168,46 198,49 C220,51 236,60 246,74"
        stroke={GOLD}
        strokeWidth={1.4}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, ease: EASE_LUX, delay: 0.5 }}
      />
      <motion.path
        d="M28,132 L348,132"
        stroke={A.visualLine}
        strokeWidth={1}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, ease: EASE_LUX, delay: 0.15 }}
      />
      {[92, 296].map((cx) => (
        <motion.circle
          key={cx}
          cx={cx}
          cy={132}
          r={15}
          stroke={GOLD}
          strokeWidth={1.4}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE_LUX, delay: 1.1 }}
          style={{ transformOrigin: `${cx}px 132px` }}
        />
      ))}
      <motion.circle
        cx={349}
        cy={118}
        r={2.4}
        fill={GOLD}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.3 }}
      />
      <motion.line
        x1={352}
        y1={118}
        x2={400}
        y2={109}
        stroke={GOLD}
        strokeWidth={1.4}
        strokeLinecap="round"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.85 }}
        transition={{ duration: 0.7, ease: EASE_LUX, delay: 1.35 }}
        style={{ transformOrigin: "352px 118px" }}
      />
    </svg>
  );
}

function StatColumn({ value, label, first }: { value: string; label: string; first?: boolean }) {
  return (
    <div className={first ? "flex-1 pl-0 pr-6" : "flex-1 border-l pl-6"} style={{ borderColor: A.visualLine }}>
      <p className="text-2xl font-medium tabular-nums" style={{ color: A.visualText, fontFamily: "var(--font-geist)" }}>
        {value}
      </p>
      <p className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.18em]" style={{ color: A.visualTextFaint }}>
        {label}
      </p>
    </div>
  );
}

export type AuthStat = { value: string; label: string };

/**
 * The entire left-hand visual panel — brand row, tag, silhouette,
 * headline, subtext, and stat row. Sign-in and sign-up each pass their
 * own copy and stats; everything structural lives here once.
 */
export function AuthVisualPanel({
  tag,
  headline,
  subtext,
  stats,
}: {
  tag: string;
  headline: string;
  subtext: string;
  stats: [AuthStat, AuthStat, AuthStat];
}) {
  return (
    <div
      className="relative hidden w-[46%] shrink-0 overflow-hidden lg:flex lg:flex-col lg:justify-between"
      style={{ background: A.visualBg }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(circle at 15% 85%, ${PINK}14, transparent 45%)` }} />
      <div aria-hidden className="pointer-events-none absolute inset-x-16 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}60, transparent)` }} />

      <div className="relative flex items-center justify-between px-14 pt-14">
        <BrandMark tone="visual" />
        <span className="text-[8px] font-medium uppercase tracking-[0.3em]" style={{ color: A.visualTextFaint }}>
          {tag}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col justify-center px-14">
        <IgnitionMark />
        <h1 className="mt-10 max-w-md text-[28px] font-light leading-[1.25] tracking-tight" style={{ color: A.visualText }}>
          {headline}
        </h1>
        <p className="mt-4 max-w-sm text-[13px] leading-relaxed" style={{ color: A.visualTextFaint }}>
          {subtext}
        </p>
      </div>

      <div className="relative flex px-14 pb-14">
        <StatColumn value={stats[0].value} label={stats[0].label} first />
        <StatColumn value={stats[1].value} label={stats[1].label} />
        <StatColumn value={stats[2].value} label={stats[2].label} />
      </div>
    </div>
  );
}

/* Field — the bordered icon + input shell used by every field on both
   forms. */
export function Field({
  id,
  label,
  type,
  icon: Icon,
  value,
  onChange,
  autoComplete,
  placeholder,
  trailing,
}: {
  id: string;
  label: string;
  type: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number; style?: CSSProperties }>;
  value: string;
  onChange: (v: string) => void;
  autoComplete: string;
  placeholder?: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[9px] font-medium uppercase tracking-[0.2em]" style={{ color: A.textFaint }}>
        {label}
      </label>
      <div className="flex items-center gap-2.5 rounded-xl border px-3.5" style={{ borderColor: A.fieldBorder, backgroundColor: A.fieldBg }}>
        <Icon className="h-4 w-4 shrink-0" strokeWidth={1.6} style={{ color: A.textFaint }} />
        <input
          id={id}
          type={type}
          required
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-full bg-transparent text-[13px] outline-none placeholder:opacity-40"
          style={{ color: A.text }}
          placeholder={placeholder}
        />
        {trailing}
      </div>
    </div>
  );
}

/* Social auth row — identical buttons on both screens, only the divider
   label text differs, so that's a prop. */
export function SocialAuthRow({ dividerLabel }: { dividerLabel: string }) {
  return (
    <>
      <div className="my-8 flex items-center gap-4">
        <span className="h-px flex-1" style={{ backgroundColor: A.borderSoft }} />
        <span className="text-[9px] font-medium uppercase tracking-[0.18em]" style={{ color: A.textFaint }}>
          {dividerLabel}
        </span>
        <span className="h-px flex-1" style={{ backgroundColor: A.borderSoft }} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex h-11 items-center justify-center gap-2.5 rounded-xl border text-[12px] font-medium transition-colors duration-200 hover:border-current"
          style={{ borderColor: A.fieldBorder, color: A.text }}
        >
          <svg viewBox="0 0 18 18" className="h-4 w-4">
            <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" />
            <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.87-3.04.87-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z" />
            <path fill="#FBBC05" d="M3.97 10.73A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.19.29-1.73V4.94H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.06l3.01-2.33z" />
            <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.94l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" />
          </svg>
          Google
        </button>
        <button
          type="button"
          className="flex h-11 items-center justify-center gap-2.5 rounded-xl border text-[12px] font-medium transition-colors duration-200 hover:border-current"
          style={{ borderColor: A.fieldBorder, color: A.text }}
        >
          <svg viewBox="0 0 384 512" className="h-3.5 w-3.5" fill="currentColor">
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
          </svg>
          Apple
        </button>
      </div>
    </>
  );
}

/* Ignition submit button — shared pulse-on-submit CTA; label and pulse
   state are the only things that differ between the two forms. */
export function IgnitionButton({ label, pulsing, disabled }: { label: string; pulsing: boolean; disabled?: boolean }) {
  return (
    <motion.button
      type="submit"
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className="group relative mt-2 flex h-12 items-center justify-center gap-2.5 overflow-hidden rounded-full text-[12px] font-medium uppercase tracking-[0.22em] transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40"
      style={{ backgroundColor: CHARCOAL, color: PAPER }}
    >
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full"
        initial={false}
        animate={pulsing ? { boxShadow: [`0 0 0 0px ${GOLD}55`, `0 0 0 10px ${GOLD}00`] } : {}}
        transition={{ duration: 0.9, ease: EASE_LUX, repeat: pulsing ? Infinity : 0 }}
      />
      <Power className="h-3.5 w-3.5" strokeWidth={2} style={{ color: GOLD }} />
      {label}
    </motion.button>
  );
}