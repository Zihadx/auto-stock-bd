import Link from "next/link";
import { PlusCircle, MessageSquare, BarChart3, Users } from "lucide-react";

const actions = [
  { label: "Add vehicle", href: "/admin/inventory/new", icon: PlusCircle },
  { label: "View inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { label: "Open analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Customers", href: "/admin/customers", icon: Users },
];

export function QuickActions() {
  return (
    <div className="rounded-md border border-line bg-paper-raised">
      <div className="border-b border-line px-5 py-4">
        <h3 className="font-display text-base font-medium text-ink">Quick actions</h3>
      </div>
      <div className="grid grid-cols-2 gap-px bg-line p-px">
        {actions.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-start gap-2 bg-paper-raised p-4 hover:bg-ink/5"
          >
            <Icon className="h-4 w-4 text-brass" aria-hidden />
            <span className="text-sm font-medium text-ink">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
