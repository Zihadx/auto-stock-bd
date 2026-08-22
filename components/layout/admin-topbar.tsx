"use client";

import { Bell, Search, Menu } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { setCommandPaletteOpen, setMobileNavOpen } from "@/store/slices/uiSlice";

export function AdminTopbar() {
  const dispatch = useAppDispatch();
  const isMac = typeof navigator !== "undefined" && /Mac/.test(navigator.platform);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-charcoal-line bg-charcoal px-4 text-paper md:px-6">
      <button
        type="button"
        className="p-1.5 lg:hidden"
        aria-label="Open navigation"
        onClick={() => dispatch(setMobileNavOpen(true))}
      >
        <Menu className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={() => dispatch(setCommandPaletteOpen(true))}
        className="flex h-9 flex-1 max-w-sm items-center gap-2 rounded-sm border border-charcoal-line bg-charcoal-raised px-3 text-sm text-paper/50 hover:border-paper/20"
      >
        <Search className="h-4 w-4" aria-hidden />
        <span className="hidden sm:inline">Search or jump to...</span>
        <span className="ml-auto hidden items-center gap-0.5 rounded-sm border border-charcoal-line bg-charcoal px-1.5 py-0.5 text-[10px] sm:flex">
          {isMac ? "⌘" : "Ctrl"}K
        </span>
      </button>

      <div className="ml-auto flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="relative p-1.5 text-paper/70 hover:text-paper"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-brass" />
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-sm border border-charcoal-line py-1 pl-1 pr-2.5 hover:border-paper/20"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brass text-xs font-medium text-paper">
            AD
          </span>
          <span className="hidden text-sm sm:inline">Admin</span>
        </button>
      </div>
    </header>
  );
}
