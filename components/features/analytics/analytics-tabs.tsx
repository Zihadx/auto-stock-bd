import Link from "next/link";
import { cn } from "@/lib/utils";

const tabs = [
  { value: "sales", label: "Sales" },
  { value: "inventory", label: "Inventory" },
  { value: "leads", label: "Leads" },
];

export function AnalyticsTabs({
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
        params.set("tab", tab.value);

        return (
          <Link
            key={tab.value}
            href={`?${params.toString()}`}
            className={cn(
              "border-b-2 px-3 py-2.5 text-sm font-medium transition-colors duration-150",
              active === tab.value
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
