import Link from "next/link";
import { AlertTriangle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NeedsAttentionItem } from "@/data/dashboard";

export function NeedsAttentionPanel({ items }: { items: NeedsAttentionItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="rounded-md border border-line bg-paper-raised">
      <div className="border-b border-line px-5 py-4">
        <h3 className="font-display text-base font-medium text-ink">Needs attention</h3>
      </div>
      <ul className="divide-y divide-line">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className="flex items-start gap-3 px-5 py-3.5 hover:bg-ink/5"
            >
              <AlertTriangle
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0",
                  item.severity === "high" ? "text-danger" : "text-warning",
                )}
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-ink">{item.label}</p>
                <p className="mt-0.5 text-xs text-ink-soft">{item.detail}</p>
              </div>
              <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
