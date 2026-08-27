"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { transition } from "@/lib/motion";

const emptySubscribe = () => () => {};

/** True only after client hydration — avoids rendering a theme-dependent icon on the server. */
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"}
      className={
        "relative flex h-9 w-9 items-center justify-center rounded-sm text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink " +
        (className ?? "")
      }
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && isDark ? (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={transition.fast}
            className="flex"
          >
            <Moon className="h-[18px] w-[18px]" aria-hidden />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
            transition={transition.fast}
            className="flex"
          >
            <Sun className="h-[18px] w-[18px]" aria-hidden />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
