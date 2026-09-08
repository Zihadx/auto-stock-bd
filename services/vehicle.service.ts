import { vehicles as vehicleRecords } from "@/data/vehicles";
import type {
  CreateVehicleInput,
  UpdateVehicleInput,
  Vehicle,
  VehicleFilters,
  VehiclePage,
} from "@/types/vehicle";

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
    case "mileage-desc":
      return sorted.sort((a, b) => b.mileageKm - a.mileageKm);
    case "year-asc":
      return sorted.sort((a, b) => a.year - b.year);
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

/**
 * Get hot selling vehicles (featured + high demand)
 * Returns vehicles marked as hotSelling, sorted by inquiry count
 */
export async function getHotSellingVehicles(limit = 6): Promise<Vehicle[]> {
  return delay(
    vehicleRecords
      .filter((v) => v.hotSelling)
      .sort((a, b) => b.inquiryCount - a.inquiryCount)
      .slice(0, limit)
  );
}

/**
 * Brands actually represented in current inventory, with a live count each,
 * sorted by how many vehicles are available. Used anywhere the site invites
 * someone to "browse by brand" — so it never promises a brand (e.g. a
 * marque with only a logo asset on disk) that isn't actually in stock.
 */
export async function getBrandCounts(): Promise<{ brand: string; count: number }[]> {
  const counts = new Map<string, number>();
  for (const v of vehicleRecords) {
    if (v.status !== "available") continue;
    counts.set(v.brand, (counts.get(v.brand) ?? 0) + 1);
  }
  const list = Array.from(counts.entries())
    .map(([brand, count]) => ({ brand, count }))
    .sort((a, b) => b.count - a.count || a.brand.localeCompare(b.brand));
  return delay(list);
}

/** Real, computable inventory-wide numbers — no invented stats. */
export async function getInventoryStats(): Promise<{
  totalAvailable: number;
  brandCount: number;
}> {
  const available = vehicleRecords.filter((v) => v.status === "available");
  const brandCount = new Set(available.map((v) => v.brand)).size;
  return delay({ totalAvailable: available.length, brandCount });
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

function slugify(brand: string, model: string, year: number): string {
  const base = `${brand}-${model}-${year}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  let slug = base;
  let suffix = 1;
  while (vehicleRecords.some((v) => v.slug === slug)) {
    slug = `${base}-${suffix++}`;
  }
  return slug;
}

/**
 * Mock create. Pushes into the shared in-memory array so the new vehicle
 * shows up immediately in the admin list within this server session —
 * becomes `POST /api/vehicles` later, at which point this in-memory push
 * goes away entirely.
 */
export async function createVehicle(input: CreateVehicleInput): Promise<Vehicle> {
  const now = new Date().toISOString();
  const vehicle: Vehicle = {
    ...input,
    id: `v-${Date.now()}`,
    slug: slugify(input.brand, input.model, input.year),
    images: input.images.map((img, i) => ({ ...img, id: `img-${Date.now()}-${i}` })),
    history: [],
    views: 0,
    inquiryCount: 0,
    featured: input.featured ?? false,
    hotSelling: input.hotSelling ?? false,
    createdAt: now,
    updatedAt: now,
  };

  vehicleRecords.unshift(vehicle);
  return delay(vehicle);
}

/** Mock update. Becomes `PATCH /api/vehicles/:id` later. */
export async function updateVehicle(input: UpdateVehicleInput): Promise<Vehicle | null> {
  const index = vehicleRecords.findIndex((v) => v.id === input.id);
  if (index === -1) return delay(null);

  const updated: Vehicle = {
    ...vehicleRecords[index],
    ...input,
    images: input.images
      ? input.images.map((img, i) => ({ ...img, id: `img-${Date.now()}-${i}` }))
      : vehicleRecords[index].images,
    featured: input.featured ?? vehicleRecords[index].featured,
    hotSelling: input.hotSelling ?? vehicleRecords[index].hotSelling,
    updatedAt: new Date().toISOString(),
  };

  vehicleRecords[index] = updated;
  return delay(updated);
}

/** Mock delete. Becomes `DELETE /api/vehicles/:id` later. */
export async function deleteVehicle(id: string): Promise<boolean> {
  const index = vehicleRecords.findIndex((v) => v.id === id);
  if (index === -1) return delay(false);
  vehicleRecords.splice(index, 1);
  return delay(true);
}