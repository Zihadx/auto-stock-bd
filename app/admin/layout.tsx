export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="min-h-screen bg-paper">
      {/* Sidebar + topbar shell arrives in Milestone 6 */}
      {children}
    </div>
  );
}
