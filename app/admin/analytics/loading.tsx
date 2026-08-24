import { Skeleton, ChartSkeleton } from "@/components/ui/skeleton";

export default function AnalyticsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-8 w-48" />
      </div>
      <Skeleton className="mt-6 h-10 w-full" />
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <ChartSkeleton height="h-72" />
        <ChartSkeleton height="h-72" />
      </div>
    </div>
  );
}
