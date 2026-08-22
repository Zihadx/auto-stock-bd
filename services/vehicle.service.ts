import { vehicles as vehicleRecords } from "@/data/vehicles";
import type { Vehicle, VehicleFilters, VehiclePage } from "@/types/vehicle";

/**
 * Mock vehicle service. Every function returns a Promise so call sites
 * already handle async/loading states correctly — swapping the body of
 * these functions for `fetch("/api/vehicles")` later requires no changes
 * to any component.
 */

const ARTIFICIAL_DELAY_MS = 300;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ARTIFICIAL_DELAY_MS));
}

function matchesFilters(vehicle: Vehicle, filters: VehicleFilters): boolean {
  if (filters.search) {
    const q = filters.search.toLowerCase();
    const haystack = `${vehicle.brand} ${vehicle.model} ${vehicle.trim ?? ""}`.toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  if (filters.brands?.length && !filters.brands.includes(vehicle.brand)) return false;
  if (filters.priceMin !== undefined && vehicle.price < filters.priceMin) return false;
  if (filters.priceMax !== undefined && vehicle.price > filters.priceMax) return false;
  if (filters.yearMin !== undefined && vehicle.year < filters.yearMin) return false;
  if (filters.yearMax !== undefined && vehicle.year > filters.yearMax) return false;
  if (filters.fuelTypes?.length && !filters.fuelTypes.includes(vehicle.fuelType)) return false;
  if (filters.transmissions?.length && !filters.transmissions.includes(vehicle.transmission)) return false;
  if (filters.mileageMax !== undefined && vehicle.mileageKm > filters.mileageMax) return false;
  if (filters.status?.length && !filters.status.includes(vehicle.status)) return false;
  return true;
}

function sortVehicles(list: Vehicle[], sortBy: VehicleFilters["sortBy"]): Vehicle[] {
  const sorted = [...list];
  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "mileage-asc":
      return sorted.sort((a, b) => a.mileageKm - b.mileageKm);
    case "year-desc":
      return sorted.sort((a, b) => b.year - a.year);
    case "newest":
    default:
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }
}

export async function getVehicles(filters: VehicleFilters = {}): Promise<VehiclePage> {
  const filtered = sortVehicles(
    vehicleRecords.filter((v) => matchesFilters(v, filters)),
    filters.sortBy,
  );

  const page = filters.page ?? 1;
  const pageSize = filters.pageSize ?? 12;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  return delay({
    items,
    total: filtered.length,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(filtered.length / pageSize)),
  });
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  return delay(vehicleRecords.find((v) => v.slug === slug) ?? null);
}

export async function getVehicleById(id: string): Promise<Vehicle | null> {
  return delay(vehicleRecords.find((v) => v.id === id) ?? null);
}

export async function getFeaturedVehicles(limit = 6): Promise<Vehicle[]> {
  return delay(vehicleRecords.filter((v) => v.featured).slice(0, limit));
}

export async function getRecentlyAddedVehicles(limit = 8): Promise<Vehicle[]> {
  const sorted = sortVehicles(vehicleRecords, "newest");
  return delay(sorted.slice(0, limit));
}

export async function getSimilarVehicles(vehicle: Vehicle, limit = 4): Promise<Vehicle[]> {
  const similar = vehicleRecords
    .filter((v) => v.id !== vehicle.id && v.brand === vehicle.brand)
    .slice(0, limit);

  if (similar.length < limit) {
    const fallback = vehicleRecords
      .filter((v) => v.id !== vehicle.id && v.bodyType === vehicle.bodyType && !similar.includes(v))
      .slice(0, limit - similar.length);
    return delay([...similar, ...fallback]);
  }

  return delay(similar);
}
