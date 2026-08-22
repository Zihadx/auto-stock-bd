import { VehicleCard } from "@/components/features/vehicle-card";
import { getSimilarVehicles } from "@/services/vehicle.service";
import type { Vehicle } from "@/types/vehicle";

export async function SimilarVehicles({ vehicle }: { vehicle: Vehicle }) {
  const similar = await getSimilarVehicles(vehicle, 4);

  if (similar.length === 0) return null;

  return (
    <section className="border-t border-line pt-10">
      <h2 className="font-display text-xl font-medium">You might also like</h2>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {similar.map((v) => (
          <VehicleCard key={v.id} vehicle={v} />
        ))}
      </div>
    </section>
  );
}
