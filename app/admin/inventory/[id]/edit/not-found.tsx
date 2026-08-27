import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function EditVehicleNotFound() {
  return (
    <div className="container-page py-24 text-center">
      <h1 className="text-h2 text-ink">Vehicle not found</h1>
      <p className="mx-auto mt-2 max-w-sm text-sm text-ink-soft">
        This vehicle may have been deleted. Return to the inventory list to
        pick another one.
      </p>
      <Link
        href="/admin/inventory"
        className={buttonVariants({ variant: "brass", className: "mt-6" })}
      >
        Back to inventory
      </Link>
    </div>
  );
}
