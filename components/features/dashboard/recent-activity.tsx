import { MessageSquarePlus, CircleCheck, PackagePlus, RefreshCcw } from "lucide-react";
import { formatRelativeDate } from "@/lib/format";
import type { RecentActivityItem } from "@/types/analytics";

const iconMap: Record<RecentActivityItem["type"], typeof MessageSquarePlus> = {
  inquiry: MessageSquarePlus,
  sale: CircleCheck,
  "vehicle-added": PackagePlus,
  "status-change": RefreshCcw,
};

export function RecentActivityList({ items }: { items: RecentActivityItem[] }) {
  return (
    <div className="rounded-md border border-line bg-paper-raised">
      <div className="border-b border-line px-5 py-4">
        <h3 className="font-display text-base font-medium text-ink">Recent activity</h3>
      </div>
      <ul className="divide-y divide-line">
        {items.map((item) => {
          const Icon = iconMap[item.type];
          return (
            <li key={item.id} className="flex gap-3 px-5 py-3.5">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink/5">
                <Icon className="h-3.5 w-3.5 text-ink-soft" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-sm text-ink">{item.message}</p>
                <p className="mt-0.5 text-xs text-ink-faint">
                  {formatRelativeDate(item.timestamp)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
