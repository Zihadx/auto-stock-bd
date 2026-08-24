import { Skeleton } from "@/components/ui/skeleton";

export default function EditVehicleLoading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="mt-2 h-4 w-72" />
      <div className="mt-6 space-y-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-40 w-full" />
        ))}
      </div>
    </div>
  );
}
