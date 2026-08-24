import type { Metadata } from "next";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { CommandPaletteLoader } from "@/components/layout/command-palette-loader";

// The dealership's operational dashboard has no business being indexed —
// this applies to every /admin/* route since child pages inherit metadata
// unless they explicitly override it.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="flex min-h-screen bg-paper">
      <a
        href="#admin-main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />
        <main id="admin-main-content" className="flex-1">
          {children}
        </main>
      </div>
      <CommandPaletteLoader />
    </div>
  );
}
