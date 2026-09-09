import { Car, Flame, Fuel, Gauge, Leaf, ShieldCheck, TrendingUp, Zap } from "lucide-react";
import type { Vehicle } from "@/types/vehicle";

export const HOT_SELLING_COUNT = 3;
export const INVENTORY_HREF = "/inventory";
export const VEHICLE_DETAIL_BASE = "/inventory";

const CACHE_KEY = "hot-selling-vehicles";
const CACHE_TTL = 5 * 60 * 1000;

export const HEADLINE_STATS = [
  { icon: TrendingUp, value: "Top 10", label: "Best Sellers" },
  { icon: ShieldCheck, value: "100%", label: "Certified" },
  { icon: Flame, value: "High", label: "Demand" },
] as const;

export interface HotCardData {
  id: string;
  slug: string;
  brand: string;
  model: string;
  copy: string;
  image: string;
  inquiryCount: number;
  FuelIcon: typeof Zap;
  accentIndex: number;
  stats: { icon: typeof Car; value: string; label: string }[];
}

export function fuelIcon(fuelType: string) {
  const f = fuelType.toLowerCase();
  if (f.includes("electric")) return Zap;
  if (f.includes("hybrid")) return Leaf;
  return Flame;
}

export function formatMileage(km: number) {
  return km >= 1000 ? `${(km / 1000).toFixed(1)}k km` : `${km} km`;
}

/** Prefer a canonical slug on the vehicle; fall back to a generated one. */
export function slugify(vehicle: Vehicle) {
  const existing = (vehicle as { slug?: string }).slug;
  if (existing) return existing;

  const base = `${vehicle.brand}-${vehicle.model}-${vehicle.year}`
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${base}-${vehicle.id}`;
}

export function toHotCardData(vehicle: Vehicle, index: number): HotCardData {
  return {
    id: vehicle.id,
    slug: slugify(vehicle),
    brand: vehicle.brand,
    model: vehicle.model,
    copy: `One of our most requested vehicles right now — ${vehicle.inquiryCount} active inquiries and counting.`,
    image: vehicle.images?.[0]?.url ?? "",
    inquiryCount: vehicle.inquiryCount,
    FuelIcon: fuelIcon(vehicle.fuelType),
    accentIndex: index % 3,
    stats: [
      { icon: Car, value: String(vehicle.year), label: "Year" },
      { icon: Gauge, value: formatMileage(vehicle.mileageKm), label: "Mileage" },
      { icon: Fuel, value: vehicle.fuelType, label: "Fuel" },
    ],
  };
}

function readVehicleCache(): Vehicle[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as { timestamp: number; vehicles: Vehicle[] };
    const isFresh =
      Array.isArray(parsed.vehicles) &&
      typeof parsed.timestamp === "number" &&
      Date.now() - parsed.timestamp < CACHE_TTL;

    return isFresh ? parsed.vehicles : null;
  } catch {
    return null;
  }
}

/**
 * Module-level snapshot for useSyncExternalStore. Reading sessionStorage
 * directly inside a render/effect setState call is what triggers React's
 * "avoid calling setState synchronously in an effect" warning — this cache
 * doesn't push change events, so it's read once per session and reused,
 * giving useSyncExternalStore a stable reference across renders.
 */
let vehicleCacheSnapshot: Vehicle[] | null | undefined;

export function getCachedVehicleSnapshot(): Vehicle[] | null {
  if (vehicleCacheSnapshot === undefined) {
    vehicleCacheSnapshot = readVehicleCache();
  }
  return vehicleCacheSnapshot;
}

export function writeVehicleCache(vehicles: Vehicle[]) {
  vehicleCacheSnapshot = vehicles;
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), vehicles }));
  } catch {
    // Storage unavailable (private mode, quota) — non-fatal, just skip caching.
  }
}

/** Stable no-op subscribe — this store never pushes change events. */
export const noopSubscribe = () => () => {};