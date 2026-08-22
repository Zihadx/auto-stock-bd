import { VehicleCard } from "@/components/features/vehicle-card";
import { getRecentlyAddedVehicles } from "@/services/vehicle.service";

export async function RecentlyAdded() {
  const recent = await getRecentlyAddedVehicles(4);

  return (
    <section className="border-y border-line bg-paper-raised">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <h2 className="font-display text-2xl font-medium md:text-3xl">Recently added</h2>
        <p className="mt-1 text-sm text-ink-soft">New listings from the last 7 days.</p>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {recent.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
}
