import { VehicleGridSkeleton } from "@/components/ui/skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function InventoryLoading() {
  return (
    <div className="container-page py-10">
      <Skeleton className="h-8 w-40" />
      <Skeleton className="mt-2 h-4 w-56" />
      <div className="mt-6 grid gap-8 lg:grid-cols-[240px_1fr]">
        <div className="hidden lg:block">
          <Skeleton className="h-96 w-full" />
        </div>
        <VehicleGridSkeleton count={6} />
      </div>
    </div>
  );
}
