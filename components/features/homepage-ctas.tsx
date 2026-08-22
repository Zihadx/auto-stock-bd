import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function TradeInCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="grid gap-8 rounded-lg border border-line bg-paper-raised p-8 md:grid-cols-2 md:p-12">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-brass">
            Have a car already?
          </p>
          <h2 className="mt-2 font-display text-2xl font-medium md:text-3xl">
            Trade it in, or sell it outright
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
            Get a no-obligation valuation in 24 hours. If you&apos;re buying
            your next car with us, trade-in value comes straight off the
            price.
          </p>
          <Link
            href="/sell-your-car"
            className={buttonVariants({ variant: "brass", className: "mt-6" })}
          >
            Get a valuation
          </Link>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-brass">
            Financing
          </p>
          <h2 className="mt-2 font-display text-2xl font-medium md:text-3xl">
            Flexible bank financing
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
            We work with partner banks for auto loans on eligible vehicles.
            Talk to us before you visit a branch — we&apos;ll tell you
            honestly if financing makes sense for your situation.
          </p>
          <Link
            href="/contact"
            className={buttonVariants({ variant: "secondary", className: "mt-6" })}
          >
            Ask about financing
          </Link>
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="bg-charcoal text-paper">
      <div className="mx-auto max-w-7xl px-4 py-16 text-center md:px-8">
        <h2 className="font-display text-2xl font-medium md:text-3xl">
          Ready to find your next car?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-paper/60">
          86 inspected vehicles, updated daily. Filter by budget and drive
          away in the one that fits.
        </p>
        <Link
          href="/inventory"
          className={buttonVariants({ variant: "brass", size: "lg", className: "mt-6" })}
        >
          Browse inventory
        </Link>
      </div>
    </section>
  );
}
