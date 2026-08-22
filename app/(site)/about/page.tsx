import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: "About AutoStock BD — Dhaka's inspected-first vehicle dealership.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <h1 className="font-display text-3xl font-medium md:text-4xl">About {siteConfig.name}</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-soft">
        <p>
          {siteConfig.name} started with a simple frustration: buying a used
          car in Dhaka meant guessing whether the mileage was real, whether
          the price had room to move, and whether the paperwork would hold up.
          We built a dealership around removing that guesswork.
        </p>
        <p>
          Every vehicle we list passes an 82-point inspection before it goes
          on the site — engine, electronics, structural integrity, and
          paperwork. We publish one fixed price per car, and where it&apos;s
          genuinely negotiable, we say so upfront instead of leaving you to
          find out at the showroom.
        </p>
        <p>
          We&apos;re based in {siteConfig.address}, and we work with a small
          network of partner workshops across Dhaka for our 90-day mechanical
          cover.
        </p>
      </div>
    </div>
  );
}
