import Link from "next/link";
import { cn } from "@/lib/utils";
import type { VehicleStatus } from "@/types/vehicle";

const tabs: { label: string; value: VehicleStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Available", value: "available" },
  { label: "Reserved", value: "reserved" },
  { label: "Sold", value: "sold" },
];

export function StatusTabs({
  active,
  searchParams,
}: {
  active: string;
  searchParams: URLSearchParams;
}) {
  return (
    <div className="flex gap-1 border-b border-line">
      {tabs.map((tab) => {
        const params = new URLSearchParams(searchParams.toString());
        if (tab.value === "all") params.delete("status");
        else params.set("status", tab.value);
        params.delete("page");

        const isActive = active === tab.value || (active === "" && tab.value === "all");

        return (
          <Link
            key={tab.value}
            href={`?${params.toString()}`}
            className={cn(
              "border-b-2 px-3 py-2.5 text-sm font-medium transition-colors duration-150",
              isActive
                ? "border-ink text-ink"
                : "border-transparent text-ink-soft hover:text-ink",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
