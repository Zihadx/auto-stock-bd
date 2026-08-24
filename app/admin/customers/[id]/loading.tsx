import { Skeleton } from "@/components/ui/skeleton";

export default function CustomerDetailLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">
      <Skeleton className="h-3 w-32" />
      <Skeleton className="mt-4 h-8 w-48" />
      <Skeleton className="mt-2 h-4 w-56" />
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full md:col-span-2" />
      </div>
      <Skeleton className="mt-6 h-40 w-full" />
    </div>
  );
}
