"use client";

import { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import type { ComponentProps } from "react";

// React 19 warns whenever a <script> tag renders inside a component tree.
// next-themes relies on exactly that — an inline script injected before
// hydration to avoid a flash of the wrong theme — so the warning is a false
// positive: the script still runs correctly during SSR. Filtered here in dev
// only, until next-themes ships a fix upstream (tracked in their repo as a
// known React 19 / Next.js 16.2+ issue with no release in over a year).
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("Encountered a script tag")) return;
    originalError.apply(console, args);
  };
}

/**
 * Wraps next-themes. Class strategy on <html>, system preference by default,
 * no flash of incorrect theme (next-themes injects a blocking inline script).
 *
 * Also wraps the app in MotionConfig(reducedMotion="user") so every Framer
 * Motion animation in the app automatically respects the OS-level
 * prefers-reduced-motion setting — the plain-CSS reduced-motion rule in
 * globals.css only covers CSS transitions/animations, not JS-driven ones.
 *
 * The theme-switch transition (see .theme-transition in globals.css) is only
 * enabled after first mount, so the initial paint never animates.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      {...props}
    >
      <MotionConfig reducedMotion="user">
        <ThemeTransitionScope>{children}</ThemeTransitionScope>
      </MotionConfig>
    </NextThemesProvider>
  );
}

function ThemeTransitionScope({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Defer to next frame so this never applies to the first paint.
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("theme-transition", mounted);
  }, [mounted]);

  return <>{children}</>;
}