"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  LayoutDashboard,
  Car,
  PlusCircle,
  MessageSquare,
  Users,
  BarChart3,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCommandPaletteOpen } from "@/store/slices/uiSlice";

const commands = [
  { label: "Go to dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "View all vehicles", href: "/admin/inventory", icon: Car },
  { label: "Add vehicle", href: "/admin/inventory/new", icon: PlusCircle },
  { label: "View inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { label: "Open customers", href: "/admin/customers", icon: Users },
  { label: "Open analytics", href: "/admin/analytics", icon: BarChart3 },
];

export function CommandPalette() {
  const open = useAppSelector((s) => s.ui.commandPaletteOpen);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        dispatch(setCommandPaletteOpen(!open));
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [dispatch, open]);

  function go(href: string) {
    router.push(href);
    dispatch(setCommandPaletteOpen(false));
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={(next) => dispatch(setCommandPaletteOpen(next))}
      label="Command palette"
      className="fixed left-1/2 top-24 z-50 w-full max-w-lg -translate-x-1/2 overflow-hidden rounded-md border border-line bg-paper-raised shadow-[var(--shadow-modal)]"
    >
      <Command.Input
        placeholder="Search admin..."
        className="w-full border-b border-line px-4 py-3 text-sm text-ink outline-none placeholder:text-ink-faint"
      />
      <Command.List className="max-h-80 overflow-y-auto p-2">
        <Command.Empty className="px-3 py-6 text-center text-sm text-ink-faint">
          No results found.
        </Command.Empty>
        {commands.map(({ label, href, icon: Icon }) => (
          <Command.Item
            key={href}
            value={label}
            onSelect={() => go(href)}
            className="flex cursor-pointer items-center gap-2.5 rounded-sm px-3 py-2 text-sm text-ink data-[selected=true]:bg-ink/5"
          >
            <Icon className="h-4 w-4 text-ink-faint" aria-hidden />
            {label}
          </Command.Item>
        ))}
      </Command.List>
    </Command.Dialog>
  );
}
