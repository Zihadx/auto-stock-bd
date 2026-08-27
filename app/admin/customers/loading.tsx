import { Skeleton, TableSkeleton } from "@/components/ui/skeleton";

export default function AdminCustomersLoading() {
  return (
    <div className="container-page py-8">
      <Skeleton className="h-7 w-32" />
      <Skeleton className="mt-6 h-10 w-full" />
      <Skeleton className="mt-4 h-9 w-64" />
      <div className="mt-4">
        <TableSkeleton rows={8} columns={6} />
      </div>
    </div>
  );
}
