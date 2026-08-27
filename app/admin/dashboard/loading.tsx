import { Skeleton, KpiSkeleton, ChartSkeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="container-page py-8">
      <Skeleton className="h-7 w-56" />
      <Skeleton className="mt-2 h-4 w-80" />

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <KpiSkeleton key={i} />
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
    </div>
  );
}
