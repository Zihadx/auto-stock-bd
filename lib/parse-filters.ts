import type { FuelType, TransmissionType, VehicleFilters, VehicleStatus } from "@/types/vehicle";

type SearchParams = Record<string, string | string[] | undefined>;

function toArray(value: string | string[] | undefined): string[] | undefined {
  if (!value) return undefined;
  const arr = Array.isArray(value) ? value : value.split(",");
  return arr.filter(Boolean);
}

function toNumber(value: string | string[] | undefined): number | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

const validFuelTypes: FuelType[] = ["petrol", "diesel", "hybrid", "electric", "cng"];
const validTransmissions: TransmissionType[] = ["automatic", "manual", "cvt"];
const validStatuses: VehicleStatus[] = ["available", "reserved", "sold", "draft"];
const validSorts: NonNullable<VehicleFilters["sortBy"]>[] = [
  "newest",
  "price-asc",
  "price-desc",
  "mileage-asc",
  "year-desc",
];

export function parseVehicleFilters(searchParams: SearchParams): VehicleFilters {
  const sortByRaw = Array.isArray(searchParams.sort) ? searchParams.sort[0] : searchParams.sort;
  const sortBy = validSorts.includes(sortByRaw as never)
    ? (sortByRaw as VehicleFilters["sortBy"])
    : "newest";

  return {
    search: Array.isArray(searchParams.search) ? searchParams.search[0] : searchParams.search,
    brands: toArray(searchParams.brands),
    priceMin: toNumber(searchParams.priceMin),
    priceMax: toNumber(searchParams.priceMax),
    yearMin: toNumber(searchParams.yearMin),
    yearMax: toNumber(searchParams.yearMax),
    fuelTypes: toArray(searchParams.fuel)?.filter((f): f is FuelType =>
      validFuelTypes.includes(f as FuelType),
    ),
    transmissions: toArray(searchParams.transmission)?.filter(
      (t): t is TransmissionType => validTransmissions.includes(t as TransmissionType),
    ),
    mileageMax: toNumber(searchParams.mileageMax),
    status: toArray(searchParams.status)?.filter((s): s is VehicleStatus =>
      validStatuses.includes(s as VehicleStatus),
    ),
    sortBy,
    page: toNumber(searchParams.page) ?? 1,
    pageSize: 12,
  };
}
