import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function CustomerNotFound() {
  return (
    <div className="container-page py-24 text-center">
      <h1 className="text-h2 text-ink">Customer not found</h1>
      <p className="mx-auto mt-2 max-w-sm text-sm text-ink-soft">
        This customer record doesn&apos;t exist. Return to the customer list.
      </p>
      <Link
        href="/admin/customers"
        className={buttonVariants({ variant: "brass", className: "mt-6" })}
      >
        Back to customers
      </Link>
    </div>
  );
}
