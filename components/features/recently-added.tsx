import { RecentlyAddedRow } from "@/components/features/recently-added-row";
import { getRecentlyAddedVehicles } from "@/services/vehicle.service";

export async function RecentlyAdded() {
  const recent = await getRecentlyAddedVehicles(6);

  return (
    <section className="border-y border-line bg-paper-raised">
      <div className="container-page py-16 md:py-24">
        <p className="text-label text-brass">Act 04 · Just listed</p>
        <h2 className="text-h1 mt-3 text-ink">Recently added</h2>
        <p className="text-body mt-2 text-ink-soft">New listings from the last 7 days.</p>
      </div>

      <RecentlyAddedRow vehicles={recent} />
    </section>
  );
}
