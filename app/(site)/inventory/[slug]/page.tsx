import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
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

export default async function VehicleDetailPage({
  params,
}: PageProps<"/inventory/[slug]">) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);

  if (!vehicle) notFound();

  return (
    <div className="container-page py-8 md:py-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-ink-faint">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden />
        <Link href="/inventory" className="hover:text-ink">
          Inventory
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden />
        <span className="text-ink-soft">
          {vehicle.brand} {vehicle.model}
        </span>
      </nav>

      <div className="mt-4 grid gap-10 lg:grid-cols-[1fr_340px]">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h1 className="text-h1 text-ink">
                {vehicle.brand} {vehicle.model}
                {vehicle.trim ? ` ${vehicle.trim}` : ""}
              </h1>
              <p className="text-small mt-1 text-ink-soft">
                {vehicle.year} · {vehicle.bodyType} · Listed {formatFullDate(vehicle.createdAt)}
              </p>
            </div>
            <VehicleStatusBadge status={vehicle.status} />
          </div>

          <div className="mt-6">
            <VehicleGallery
              images={vehicle.images}
              vehicleName={`${vehicle.brand} ${vehicle.model}`}
            />
          </div>

          {/* Price + CTAs repeated inline for mobile, where the sidebar isn't visible */}
          <div className="mt-6 lg:hidden">
            <CtaSidebar vehicle={vehicle} />
          </div>

          <div className="mt-10 space-y-10">
            <section>
              <h2 className="text-h3 text-ink">Overview</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
                {vehicle.description}
              </p>
            </section>

            <section>
              <h2 className="text-h3 text-ink">Specifications</h2>
              <div className="mt-4">
                <SpecSheet vehicle={vehicle} />
              </div>
            </section>

            {vehicle.features.length > 0 && (
              <section>
                <h2 className="text-h3 text-ink">Features</h2>
                <div className="mt-4">
                  <FeatureList groups={vehicle.features} />
                </div>
              </section>
            )}

            {vehicle.history.length > 0 && (
              <section>
                <h2 className="text-h3 text-ink">Vehicle history</h2>
                <div className="mt-4">
                  <HistoryTimeline events={vehicle.history} />
                </div>
              </section>
            )}
          </div>
        </div>

        <div className="hidden lg:block">
          <CtaSidebar vehicle={vehicle} />
        </div>
      </div>

      <div className="mt-14">
        <SimilarVehicles vehicle={vehicle} />
      </div>
    </div>
  );
}
