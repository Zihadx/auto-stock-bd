import type { DashboardStats } from "@/types/analytics";

export function InventoryHealth({ stats }: { stats: DashboardStats }) {
  const availablePct = Math.round((stats.available / stats.totalVehicles) * 100);

  return (
    <div className="rounded-md border border-line bg-paper-raised p-5">
      <h3 className="font-display text-base font-medium text-ink">Inventory health</h3>
      <p className="mt-1 text-xs text-ink-soft">
        {stats.available} of {stats.totalVehicles} vehicles available for sale
      </p>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-ink/8">
        <div
          className="h-full rounded-full bg-success"
          style={{ width: `${availablePct}%` }}
        />
      </div>

      <div className="mt-3 flex justify-between text-xs text-ink-faint">
        <span>{availablePct}% available</span>
        <span>{stats.reserved} reserved</span>
        <span>{stats.totalVehicles - stats.available - stats.reserved} sold</span>
      </div>
    </div>
  );
}
