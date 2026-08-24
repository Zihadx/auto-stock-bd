import { Skeleton, TableSkeleton } from "@/components/ui/skeleton";

export default function AdminInventoryLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-9 w-32" />
      </div>
      <Skeleton className="mt-6 h-10 w-full" />
      <Skeleton className="mt-4 h-9 w-64" />
      <div className="mt-4">
        <TableSkeleton rows={8} columns={7} />
      </div>
    </div>
  );
}
