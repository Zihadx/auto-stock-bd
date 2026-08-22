import { Calendar, Gauge, Fuel, Cog, Cpu, Palette, MapPin, Users } from "lucide-react";
import { formatMileage } from "@/lib/format";
import type { Vehicle } from "@/types/vehicle";

const fuelLabel: Record<Vehicle["fuelType"], string> = {
  petrol: "Petrol",
  diesel: "Diesel",
  hybrid: "Hybrid",
  electric: "Electric",
  cng: "CNG",
};

const transmissionLabel: Record<Vehicle["transmission"], string> = {
  automatic: "Automatic",
  manual: "Manual",
  cvt: "CVT",
};

export function SpecSheet({ vehicle }: { vehicle: Vehicle }) {
  const specs = [
    { icon: Calendar, label: "Year", value: `${vehicle.year}` },
    { icon: Gauge, label: "Mileage", value: formatMileage(vehicle.mileageKm) },
    { icon: Fuel, label: "Fuel type", value: fuelLabel[vehicle.fuelType] },
    { icon: Cog, label: "Transmission", value: transmissionLabel[vehicle.transmission] },
    { icon: Cpu, label: "Engine", value: `${vehicle.engineCc} cc` },
    { icon: Palette, label: "Color", value: vehicle.color },
    { icon: MapPin, label: "Location", value: vehicle.location },
    { icon: Users, label: "Owners", value: `${vehicle.ownerCount}` },
  ];

  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-4">
      {specs.map(({ icon: Icon, label, value }) => (
        <div key={label} className="bg-paper-raised p-4">
          <Icon className="h-4 w-4 text-ink-faint" aria-hidden />
          <p className="mt-2 text-xs text-ink-faint">{label}</p>
          <p className="mt-0.5 font-tabular text-sm font-medium text-ink">{value}</p>
        </div>
      ))}
    </div>
  );
}
