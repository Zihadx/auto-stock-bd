import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function VehicleNotFound() {
  return (
    <div className="container-page py-24 text-center">
      <h1 className="text-h2 text-ink">Vehicle not found</h1>
      <p className="mx-auto mt-2 max-w-sm text-sm text-ink-soft">
        This listing may have been sold or removed. Browse the rest of our
        current inventory instead.
      </p>
      <Link href="/inventory" className={buttonVariants({ variant: "brass", className: "mt-6" })}>
        Browse inventory
      </Link>
    </div>
  );
}
