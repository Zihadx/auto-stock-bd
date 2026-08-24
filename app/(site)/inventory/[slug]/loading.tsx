import { Skeleton } from "@/components/ui/skeleton";

export default function VehicleDetailLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <Skeleton className="h-3 w-40" />
      <div className="mt-4 grid gap-10 lg:grid-cols-[1fr_340px]">
        <div>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="mt-2 h-4 w-40" />
          <Skeleton className="mt-6 aspect-[16/10] w-full" />
          <div className="mt-10 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
        <Skeleton className="hidden h-72 w-full lg:block" />
      </div>
    </div>
  );
}
