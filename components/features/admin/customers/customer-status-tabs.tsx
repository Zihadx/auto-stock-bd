import Link from "next/link";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "All", value: "" },
  { label: "Leads", value: "lead" },
  { label: "Active", value: "active" },
  { label: "Customers", value: "customer" },
  { label: "Inactive", value: "inactive" },
];

export function CustomerStatusTabs({
  active,
  searchParams,
}: {
  active: string;
  searchParams: URLSearchParams;
}) {
  return (
    <div className="flex flex-wrap gap-1 border-b border-line">
      {tabs.map((tab) => {
        const params = new URLSearchParams(searchParams.toString());
        if (tab.value) params.set("status", tab.value);
        else params.delete("status");
        params.delete("page");

        const isActive = active === tab.value;

        return (
          <Link
            key={tab.label}
            href={`?${params.toString()}`}
            className={cn(
              "border-b-2 px-3 py-2.5 text-sm font-medium",
              isActive ? "border-ink text-ink" : "border-transparent text-ink-soft hover:text-ink",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
