"use client";

import { Bell, Search, Menu } from "lucide-react";
import { useTheme } from "next-themes";

import { useAppDispatch } from "@/store/hooks";
import {
  setCommandPaletteOpen,
  setMobileNavOpen,
} from "@/store/slices/uiSlice";
import { ACCENT, CHARCOAL, PAPER } from "../ui/tokens";

export function AdminTopbar() {
  const dispatch = useAppDispatch();
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme !== "light";
  const isMac =
    typeof navigator !== "undefined" &&
    /Mac/.test(navigator.platform);

  const theme = {
    bg: isDark ? CHARCOAL : "#F8F7F4",
    text: isDark ? PAPER : "#11100E",
    muted: isDark ? PAPER : "#38342E",
    border: isDark ? `${PAPER}12` : "rgba(10,1,6,.10)",
    surface: isDark ? `${PAPER}06` : "rgba(255,255,255,.78)",
    surfaceHover: isDark ? `${PAPER}0A` : "rgba(10,1,6,.035)",
    accent: ACCENT,
    avatarBg: isDark ? `${ACCENT}18` : `${ACCENT}12`,
    avatarBorder: isDark ? `${ACCENT}38` : `${ACCENT}42`,
  };

  return (
    <header
      className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b px-4 backdrop-blur-xl md:px-6"
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
        borderColor: theme.border,
      }}
    >
      {/* Mobile menu */}
      <button
        type="button"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 lg:hidden"
        aria-label="Open navigation"
        onClick={() => dispatch(setMobileNavOpen(true))}
        style={{
          borderColor: theme.border,
          color: theme.muted,
          backgroundColor: theme.surface,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = theme.surfaceHover;
          e.currentTarget.style.color = theme.text;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = theme.surface;
          e.currentTarget.style.color = theme.muted;
        }}
      >
        <Menu className="h-4 w-4" strokeWidth={2} />
      </button>

      {/* Command search */}
      <button
        type="button"
        onClick={() => dispatch(setCommandPaletteOpen(true))}
        className="group flex h-9 w-full max-w-sm flex-1 items-center gap-2 rounded-lg border px-3 text-left text-sm transition-all duration-200"
        style={{
          borderColor: theme.border,
          backgroundColor: theme.surface,
          color: theme.muted,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = isDark
            ? `${PAPER}24`
            : "rgba(10,1,6,.18)";
          e.currentTarget.style.backgroundColor = theme.surfaceHover;
          e.currentTarget.style.color = theme.text;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = theme.border;
          e.currentTarget.style.backgroundColor = theme.surface;
          e.currentTarget.style.color = theme.muted;
        }}
      >
        <Search
          className="h-4 w-4 shrink-0 transition-colors"
          aria-hidden
        />

        <span className="hidden truncate sm:inline">
          Search or jump to...
        </span>

        <span
          className="ml-auto hidden items-center gap-0.5 rounded-md border px-1.5 py-0.5 text-[10px] font-medium sm:flex"
          style={{
            borderColor: theme.border,
            backgroundColor: isDark
              ? `${PAPER}05`
              : "rgba(10,1,6,.025)",
            color: theme.muted,
          }}
        >
          {isMac ? "⌘" : "Ctrl"}K
        </span>
      </button>

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200"
          style={{
            borderColor: theme.border,
            color: theme.muted,
            backgroundColor: theme.surface,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.surfaceHover;
            e.currentTarget.style.color = theme.text;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = theme.surface;
            e.currentTarget.style.color = theme.muted;
          }}
        >
          <Bell className="h-4 w-4" strokeWidth={1.9} />

          <span
            className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full ring-2"
            style={{
              backgroundColor: theme.accent,
              boxShadow: `0 0 10px ${theme.accent}80`,
              // Ring matches the current header background.
              // Keeps the notification dot crisp in both themes.
            }}
          />
        </button>

        {/* Admin profile */}
        <button
          type="button"
          className="flex h-9 items-center gap-2 rounded-lg border py-1 pl-1 pr-2.5 transition-all duration-200"
          style={{
            borderColor: theme.border,
            backgroundColor: theme.surface,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = isDark
              ? `${PAPER}24`
              : "rgba(10,1,6,.18)";
            e.currentTarget.style.backgroundColor = theme.surfaceHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = theme.border;
            e.currentTarget.style.backgroundColor = theme.surface;
          }}
        >
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-semibold tracking-wide"
            style={{
              backgroundColor: theme.avatarBg,
              borderColor: theme.avatarBorder,
              color: theme.accent,
            }}
          >
            AD
          </span>

          <span
            className="hidden text-sm font-medium sm:inline"
            style={{ color: theme.text }}
          >
            Admin
          </span>
        </button>
      </div>
    </header>
  );
}