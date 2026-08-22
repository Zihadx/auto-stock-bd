"use client";

import { vehicleBrands } from "@/config/site";
import { useQueryParams } from "@/hooks/use-query-params";
import { Button } from "@/components/ui/button";
import type { FuelType, TransmissionType } from "@/types/vehicle";

const fuelOptions: { value: FuelType; label: string }[] = [
  { value: "petrol", label: "Petrol" },
  { value: "diesel", label: "Diesel" },
  { value: "hybrid", label: "Hybrid" },
  { value: "electric", label: "Electric" },
  { value: "cng", label: "CNG" },
];

const transmissionOptions: { value: TransmissionType; label: string }[] = [
  { value: "automatic", label: "Automatic" },
  { value: "manual", label: "Manual" },
  { value: "cvt", label: "CVT" },
];

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-line py-5 first:pt-0 last:border-b-0">
      <h3 className="text-xs font-medium uppercase tracking-wide text-ink-faint">{title}</h3>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  );
}

function CheckboxRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded-sm border-line-strong text-brass accent-[var(--color-brass)]"
      />
      {label}
    </label>
  );
}

export function FiltersPanel({ onApply }: { onApply?: () => void }) {
  const { get, getAll, set } = useQueryParams();

  const selectedBrands = getAll("brands").flatMap((v) => v.split(","));
  const selectedFuel = getAll("fuel").flatMap((v) => v.split(",")) as FuelType[];
  const selectedTransmission = getAll("transmission").flatMap((v) => v.split(",")) as TransmissionType[];

  function toggleInArray(current: string[], value: string) {
    return current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
  }

  return (
    <div>
      <FilterGroup title="Brand">
        {vehicleBrands.map((brand) => (
          <CheckboxRow
            key={brand}
            label={brand}
            checked={selectedBrands.includes(brand)}
            onChange={() => set({ brands: toggleInArray(selectedBrands, brand) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Price range (৳)">
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            placeholder="Min"
            defaultValue={get("priceMin")}
            onBlur={(e) => set({ priceMin: e.target.value || null })}
            className="h-9 w-full rounded-sm border border-line bg-paper px-2 text-sm"
          />
          <span className="text-ink-faint">–</span>
          <input
            type="number"
            inputMode="numeric"
            placeholder="Max"
            defaultValue={get("priceMax")}
            onBlur={(e) => set({ priceMax: e.target.value || null })}
            className="h-9 w-full rounded-sm border border-line bg-paper px-2 text-sm"
          />
        </div>
      </FilterGroup>

      <FilterGroup title="Year">
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            placeholder="From"
            defaultValue={get("yearMin")}
            onBlur={(e) => set({ yearMin: e.target.value || null })}
            className="h-9 w-full rounded-sm border border-line bg-paper px-2 text-sm"
          />
          <span className="text-ink-faint">–</span>
          <input
            type="number"
            inputMode="numeric"
            placeholder="To"
            defaultValue={get("yearMax")}
            onBlur={(e) => set({ yearMax: e.target.value || null })}
            className="h-9 w-full rounded-sm border border-line bg-paper px-2 text-sm"
          />
        </div>
      </FilterGroup>

      <FilterGroup title="Fuel type">
        {fuelOptions.map((opt) => (
          <CheckboxRow
            key={opt.value}
            label={opt.label}
            checked={selectedFuel.includes(opt.value)}
            onChange={() => set({ fuel: toggleInArray(selectedFuel, opt.value) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Transmission">
        {transmissionOptions.map((opt) => (
          <CheckboxRow
            key={opt.value}
            label={opt.label}
            checked={selectedTransmission.includes(opt.value)}
            onChange={() => set({ transmission: toggleInArray(selectedTransmission, opt.value) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Max mileage (km)">
        <input
          type="number"
          inputMode="numeric"
          placeholder="e.g. 80000"
          defaultValue={get("mileageMax")}
          onBlur={(e) => set({ mileageMax: e.target.value || null })}
          className="h-9 w-full rounded-sm border border-line bg-paper px-2 text-sm"
        />
      </FilterGroup>

      <div className="flex gap-2 pt-5">
        <Button
          variant="secondary"
          size="sm"
          className="flex-1"
          onClick={() =>
            set({
              brands: null,
              priceMin: null,
              priceMax: null,
              yearMin: null,
              yearMax: null,
              fuel: null,
              transmission: null,
              mileageMax: null,
            })
          }
        >
          Clear all
        </Button>
        {onApply && (
          <Button size="sm" className="flex-1" onClick={onApply}>
            Show results
          </Button>
        )}
      </div>
    </div>
  );
}
