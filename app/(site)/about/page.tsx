import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { RevealList, RevealItem } from "@/components/features/scroll-reveal";

export const metadata: Metadata = {
  title: "About",
  description: "About AutoStock BD — Dhaka's inspected-first vehicle dealership.",
};

const principles = [
  {
    index: "01",
    title: "Inspect before we list, not after you ask",
    body: "Engine, electronics, structural integrity, and paperwork — checked against an 82-point standard before a car ever appears on the site.",
  },
  {
    index: "02",
    title: "One fixed price, said plainly",
    body: "The listed price is the real price. Where a car is genuinely negotiable, we say so upfront instead of leaving you to find out at the showroom.",
  },
  {
    index: "03",
    title: "A workshop network that backs the sale",
    body: "90 days of mechanical cover through a small network of partner workshops across Dhaka — not a disclaimer, an actual commitment.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="container-page py-16 md:py-24">
        <p className="text-label text-brass">About {siteConfig.name}</p>
        <h1 className="text-hero mt-4 max-w-3xl text-ink">
          Buying a used car in Dhaka shouldn&apos;t mean guessing.
        </h1>
        <p className="text-body-lg mt-6 max-w-xl text-ink-soft">
          {siteConfig.name} started with a simple frustration: not knowing
          whether the mileage was real, whether the price had room to move,
          or whether the paperwork would hold up. We built a dealership
          around removing that guesswork.
        </p>
      </section>

      <section className="border-t border-line bg-paper-raised">
        <div className="container-page py-16 md:py-24">
          <h2 className="text-h2 max-w-md text-ink">
            What that actually looks like, car by car.
          </h2>

          <RevealList className="mt-10 divide-y divide-line border-t border-line">
            {principles.map((p) => (
              <RevealItem key={p.index} className="grid gap-2 py-8 md:grid-cols-12 md:gap-8">
                <span className="text-h2 text-ink-faint md:col-span-2">{p.index}</span>
                <h3 className="text-h3 text-ink md:col-span-3">{p.title}</h3>
                <p className="text-body text-ink-soft md:col-span-7">{p.body}</p>
              </RevealItem>
            ))}
          </RevealList>
        </div>
      </section>

      <section className="container-page py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-end">
          <div>
            <p className="text-label text-brass">Where to find us</p>
            <p className="text-h3 mt-3 max-w-sm text-ink">{siteConfig.address}</p>
          </div>
          <div className="md:text-right">
            <Link href="/inventory" className={buttonVariants({ variant: "brass", size: "lg" })}>
              See what&apos;s in stock
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
