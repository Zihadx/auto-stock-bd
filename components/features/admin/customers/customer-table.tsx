import Link from "next/link";
import { CustomerStatusBadge } from "@/components/features/admin/customers/customer-status-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { formatRelativeDate } from "@/lib/format";
import type { CustomerWithStats } from "@/services/customer.service";

export function CustomerTable({ customers }: { customers: CustomerWithStats[] }) {
  if (customers.length === 0) {
    return (
      <EmptyState
        title="No customers match this view"
        description="Try a different status tab or clear your search."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-line bg-paper-raised">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs font-medium uppercase tracking-wide text-ink-faint">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Inquiries</th>
              <th className="px-4 py-3">Last interaction</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-ink/[0.02]">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/customers/${customer.id}`}
                    className="font-medium text-ink hover:text-brass"
                  >
                    {customer.name}
                  </Link>
                </td>
                <td className="px-4 py-3 font-tabular text-ink-soft">{customer.phone}</td>
                <td className="px-4 py-3 text-ink-soft">{customer.email ?? "—"}</td>
                <td className="px-4 py-3 font-tabular text-ink-soft">{customer.inquiryCount}</td>
                <td className="px-4 py-3 text-ink-soft">
                  {formatRelativeDate(customer.lastInteractionAt)}
                </td>
                <td className="px-4 py-3">
                  <CustomerStatusBadge status={customer.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
