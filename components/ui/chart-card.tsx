import type { ReactNode } from "react";

export function ChartCard({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="rounded-md border border-line bg-paper-raised">
      <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
        <div>
          <h3 className="font-display text-base font-medium text-ink">{title}</h3>
          {description && <p className="mt-0.5 text-xs text-ink-soft">{description}</p>}
        </div>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
