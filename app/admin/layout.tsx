import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { CommandPaletteLoader } from "@/components/layout/command-palette-loader";

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="flex min-h-screen bg-paper">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />
        <main className="flex-1">{children}</main>
      </div>
      <CommandPaletteLoader />
    </div>
  );
}
