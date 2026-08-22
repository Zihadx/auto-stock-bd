import { CheckCircle2, History } from "lucide-react";
import { formatFullDate } from "@/lib/format";
import type { VehicleFeatureGroup, VehicleHistoryEvent } from "@/types/vehicle";

export function FeatureList({ groups }: { groups: VehicleFeatureGroup[] }) {
  if (groups.length === 0) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {groups.map((group) => (
        <div key={group.category}>
          <h3 className="text-xs font-medium uppercase tracking-wide text-ink-faint">
            {group.category}
          </h3>
          <ul className="mt-3 space-y-2">
            {group.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-ink">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function HistoryTimeline({ events }: { events: VehicleHistoryEvent[] }) {
  if (events.length === 0) return null;

  return (
    <ol className="space-y-5">
      {events.map((event, i) => (
        <li key={event.id} className="relative pl-7">
          <span className="absolute left-0 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brass-tint">
            <History className="h-3 w-3 text-brass-dark" aria-hidden />
          </span>
          {i < events.length - 1 && (
            <span className="absolute left-[9px] top-6 h-[calc(100%+0.75rem)] w-px bg-line" />
          )}
          <p className="text-sm font-medium text-ink">{event.label}</p>
          <p className="text-xs text-ink-faint">{formatFullDate(event.date)}</p>
          <p className="mt-1 text-sm text-ink-soft">{event.detail}</p>
        </li>
      ))}
    </ol>
  );
}
