import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight, Phone, Mail, Calendar, MessageSquare } from "lucide-react";
import { getCustomerById } from "@/services/customer.service";
import { CustomerStatusBadge } from "@/components/features/admin/customers/customer-status-badge";
import { InquiryStatusBadge, VehicleStatusBadge } from "@/components/ui/status-badge";
import { formatBDT, formatFullDate, formatRelativeDate } from "@/lib/format";

export async function generateMetadata({
  params,
}: PageProps<"/admin/customers/[id]">): Promise<Metadata> {
  const { id } = await params;
  const customer = await getCustomerById(id);
  return { title: customer ? customer.name : "Customer not found" };
}

export default async function CustomerDetailPage({
  params,
}: PageProps<"/admin/customers/[id]">) {
  const { id } = await params;
  const customer = await getCustomerById(id);

  if (!customer) notFound();

  const timelineEvents = customer.inquiries
    .flatMap((inquiry) =>
      inquiry.timeline.map((event) => ({ ...event, inquiryId: inquiry.id })),
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-ink-faint">
        <Link href="/admin/customers" className="hover:text-ink">
          Customers
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden />
        <span className="text-ink-soft">{customer.name}</span>
      </nav>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-h1 text-ink">{customer.name}</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Customer since {formatFullDate(customer.createdAt)}
          </p>
        </div>
        <CustomerStatusBadge status={customer.status} />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="rounded-md border border-line bg-paper-raised p-5">
          <h2 className="text-xs font-medium uppercase tracking-wide text-ink-faint">Contact</h2>
          <div className="mt-3 flex items-center gap-2 text-sm text-ink">
            <Phone className="h-4 w-4 text-ink-faint" aria-hidden />
            <a href={`tel:${customer.phone}`} className="hover:text-brass">
              {customer.phone}
            </a>
          </div>
          {customer.email && (
            <div className="mt-2 flex items-center gap-2 text-sm text-ink">
              <Mail className="h-4 w-4 text-ink-faint" aria-hidden />
              <a href={`mailto:${customer.email}`} className="hover:text-brass">
                {customer.email}
              </a>
            </div>
          )}
          <div className="mt-2 flex items-center gap-2 text-sm text-ink-soft">
            <Calendar className="h-4 w-4 text-ink-faint" aria-hidden />
            Last active {formatRelativeDate(customer.lastInteractionAt)}
          </div>
        </div>

        <div className="rounded-md border border-line bg-paper-raised p-5 md:col-span-2">
          <h2 className="text-xs font-medium uppercase tracking-wide text-ink-faint">
            Summary
          </h2>
          <div className="mt-3 grid grid-cols-3 gap-4">
            <div>
              <p className="font-tabular text-xl font-semibold text-ink">
                {customer.inquiries.length}
              </p>
              <p className="text-xs text-ink-faint">Inquiries</p>
            </div>
            <div>
              <p className="font-tabular text-xl font-semibold text-ink">
                {customer.interestedVehicles.length}
              </p>
              <p className="text-xs text-ink-faint">Interested vehicles</p>
            </div>
            <div>
              <p className="font-tabular text-xl font-semibold text-ink">
                {customer.purchasedVehicles.length}
              </p>
              <p className="text-xs text-ink-faint">Purchased</p>
            </div>
          </div>
        </div>
      </div>

      {(customer.interestedVehicles.length > 0 || customer.purchasedVehicles.length > 0) && (
        <div className="mt-6">
          <h2 className="text-h3 text-ink">Vehicles</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {[...customer.purchasedVehicles, ...customer.interestedVehicles]
              .filter((v, i, arr) => arr.findIndex((x) => x.id === v.id) === i)
              .map((vehicle) => {
                const purchased = customer.purchasedVehicleIds.includes(vehicle.id);
                return (
                  <Link
                    key={vehicle.id}
                    href={`/admin/inventory`}
                    className="flex items-center justify-between gap-3 rounded-md border border-line bg-paper-raised p-4 hover:border-ink"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink">
                        {vehicle.brand} {vehicle.model}
                      </p>
                      <p className="mt-0.5 text-xs text-ink-faint">{formatBDT(vehicle.price)}</p>
                    </div>
                    {purchased ? (
                      <span className="shrink-0 rounded-sm bg-brass-tint px-2 py-0.5 text-xs font-medium text-brass-dark">
                        Purchased
                      </span>
                    ) : (
                      <span className="shrink-0">
                        <VehicleStatusBadge status={vehicle.status} />
                      </span>
                    )}
                  </Link>
                );
              })}
          </div>
        </div>
      )}

      {customer.inquiries.length > 0 && (
        <div className="mt-6">
          <h2 className="text-h3 text-ink">Inquiry history</h2>
          <div className="mt-3 overflow-hidden rounded-md border border-line bg-paper-raised">
            <ul className="divide-y divide-line">
              {customer.inquiries.map((inquiry) => (
                <li key={inquiry.id} className="flex items-start gap-3 px-4 py-3.5">
                  <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" aria-hidden />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-ink">{inquiry.message}</p>
                    <p className="mt-0.5 text-xs text-ink-faint">
                      {formatRelativeDate(inquiry.createdAt)}
                    </p>
                  </div>
                  <InquiryStatusBadge status={inquiry.status} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {timelineEvents.length > 0 && (
        <div className="mt-6">
          <h2 className="text-h3 text-ink">Communication timeline</h2>
          <ol className="mt-3 space-y-4">
            {timelineEvents.map((event) => (
              <li key={`${event.inquiryId}-${event.id}`} className="border-l-2 border-line pl-3">
                <p className="text-sm font-medium text-ink">{event.action}</p>
                <p className="text-xs text-ink-faint">
                  {event.actor} · {formatRelativeDate(event.date)}
                </p>
                {event.note && <p className="mt-1 text-sm text-ink-soft">{event.note}</p>}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
