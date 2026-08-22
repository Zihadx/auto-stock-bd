import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function VehicleNotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 text-center md:px-8">
      <h1 className="font-display text-2xl font-medium">Vehicle not found</h1>
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
