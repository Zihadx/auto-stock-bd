"use client";

import { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import type { ComponentProps } from "react";

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
