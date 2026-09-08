import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ChevronRight,
  CalendarDays,
  Gauge,
  Fuel,
  Cog,
  Eye,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { getVehicleBySlug, getVehicles } from "@/services/vehicle.service";
import { VehicleGallery } from "@/components/features/vehicle-detail/vehicle-gallery";
import { SpecSheet } from "@/components/features/vehicle-detail/spec-sheet";
import { FeatureList, HistoryTimeline } from "@/components/features/vehicle-detail/feature-history";
import { CtaSidebar } from "@/components/features/vehicle-detail/cta-sidebar";
import { SimilarVehicles } from "@/components/features/vehicle-detail/similar-vehicles";
import { VehicleStatusBadge } from "@/components/ui/status-badge";
import { formatFullDate } from "@/lib/format";

export async function generateStaticParams() {
  const { items } = await getVehicles({ pageSize: 100 });
  return items.map((vehicle) => ({ slug: vehicle.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/inventory/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);

  if (!vehicle) return { title: "Vehicle not found" };

  const title = `${vehicle.brand} ${vehicle.model} ${vehicle.year}`;
  return {
    title,
    description: vehicle.description,
    openGraph: {
      title: `${title} · AutoStock BD`,
      description: vehicle.description,
      images: vehicle.images[0] ? [vehicle.images[0].url] : undefined,
    },
  };
}

function formatPrice(price: number): string {
  return `৳${price.toLocaleString("en-US")}`;
}

function formatMileage(km: number): string {
  return `${km.toLocaleString("en-US")} km`;
}

/** Days since listing was created, for a quiet "how fresh is this listing" signal. */
function daysSince(iso: string): number {
  const ms = Date.now() - new Date(iso).getTime();
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
}

export default async function VehicleDetailPage({
  params,
}: PageProps<"/inventory/[slug]">) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);

  if (!vehicle) notFound();

  const listedDaysAgo = daysSince(vehicle.createdAt);
  const listingAgeLabel =
    listedDaysAgo === 0 ? "Listed today" : listedDaysAgo === 1 ? "Listed yesterday" : `Listed ${listedDaysAgo} days ago`;

  const vitals = [
    { icon: CalendarDays, label: "Year", value: String(vehicle.year) },
    { icon: Gauge, label: "Mileage", value: formatMileage(vehicle.mileageKm) },
    { icon: Fuel, label: "Fuel", value: vehicle.fuelType },
    { icon: Cog, label: "Transmission", value: vehicle.transmission },
  ];

  return (
    <div className="container px-6 mx-auto py-20 md:py-40">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-ink-faint">
        <Link href="/" className="hover:text-ink transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden />
        <Link href="/inventory" className="hover:text-ink transition-colors">
          Inventory
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden />
        <span className="text-ink-soft">
          {vehicle.brand} {vehicle.model}
        </span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_340px]">
        <div>
          {/* Title row */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="font-serif text-h1 text-ink tracking-tight">
                  {vehicle.brand} {vehicle.model}
                  {vehicle.trim ? <span className="text-ink-soft"> {vehicle.trim}</span> : ""}
                </h1>
                {vehicle.hotSelling && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-ink/15 px-2.5 py-1 text-[11px] text-ink-soft">
                    <Sparkles className="h-3 w-3" aria-hidden />
                    In high demand
                  </span>
                )}
              </div>
              <p className="text-small mt-1.5 text-ink-faint">
                {vehicle.bodyType} · {listingAgeLabel}
              </p>
            </div>
            <VehicleStatusBadge status={vehicle.status} />
          </div>

          {/* Price — the hero number, given room to breathe */}
          <p className="font-serif mt-5 text-4xl text-ink md:text-5xl">
            {formatPrice(vehicle.price)}
          </p>

          {/* Gallery */}
          <div className="mt-8">
            <VehicleGallery
              images={vehicle.images}
              vehicleName={`${vehicle.brand} ${vehicle.model}`}
            />
          </div>

          {/* Vitals strip — a spec plate, not a row of cards */}
          <div className="mt-8 grid grid-cols-2 divide-x divide-y divide-ink/10 border border-ink/10 sm:grid-cols-4 sm:divide-y-0">
            {vitals.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col gap-1.5 px-5 py-4">
                <div className="flex items-center gap-1.5 text-ink-faint">
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                  <span className="text-[11px]">{label}</span>
                </div>
                <span className="text-sm text-ink">{value}</span>
              </div>
            ))}
          </div>

          {/* Price + CTAs repeated inline for mobile, where the sidebar isn't visible */}
          <div className="mt-6 lg:hidden">
            <CtaSidebar vehicle={vehicle} />
          </div>

          <div className="mt-14 space-y-14">
            <section>
              <h2 className="text-h3 text-ink">Overview</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
                {vehicle.description}
              </p>
            </section>

            <section className="border-t border-ink/10 pt-14">
              <h2 className="text-h3 text-ink">Specifications</h2>
              <div className="mt-4">
                <SpecSheet vehicle={vehicle} />
              </div>
            </section>

            {vehicle.features.length > 0 && (
              <section className="border-t border-ink/10 pt-14">
                <h2 className="text-h3 text-ink">Features</h2>
                <div className="mt-4">
                  <FeatureList groups={vehicle.features} />
                </div>
              </section>
            )}

            {vehicle.history.length > 0 && (
              <section className="border-t border-ink/10 pt-14">
                <h2 className="text-h3 text-ink">Vehicle history</h2>
                <div className="mt-4">
                  <HistoryTimeline events={vehicle.history} />
                </div>
              </section>
            )}
          </div>

          {/* Quiet social proof — real numbers only, no invented urgency */}
          {(vehicle.views > 0 || vehicle.inquiryCount > 0) && (
            <div className="mt-14 flex flex-wrap items-center gap-5 border-t border-ink/10 pt-6 text-xs text-ink-faint">
              {vehicle.views > 0 && (
                <span className="inline-flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5" aria-hidden />
                  {vehicle.views.toLocaleString("en-US")} views
                </span>
              )}
              {vehicle.inquiryCount > 0 && (
                <span className="inline-flex items-center gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5" aria-hidden />
                  {vehicle.inquiryCount.toLocaleString("en-US")} inquiries
                </span>
              )}
            </div>
          )}
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-24">
            <CtaSidebar vehicle={vehicle} />
          </div>
        </div>
      </div>

      <div className="mt-20 border-t border-ink/10 pt-14">
        <SimilarVehicles vehicle={vehicle} />
      </div>
    </div>
  );
}