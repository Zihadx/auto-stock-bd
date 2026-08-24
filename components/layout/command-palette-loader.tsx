"use client";

import dynamic from "next/dynamic";

// Wrapped in its own client component because next/dynamic's `ssr: false`
// option is only permitted inside a client boundary — the admin layout
// that renders this stays a server component.
const CommandPalette = dynamic(
  () => import("@/components/layout/command-palette").then((m) => m.CommandPalette),
  { ssr: false },
);

export function CommandPaletteLoader() {
  return <CommandPalette />;
}
