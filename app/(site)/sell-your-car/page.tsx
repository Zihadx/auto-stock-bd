import type { Metadata } from "next";
import { ShieldCheck, Clock, Handshake } from "lucide-react";
import { SellCarForm } from "@/components/features/sell-car-form";

export const metadata: Metadata = {
  title: "Sell Your Car",
  description: "Get a no-obligation valuation for your car within 24 hours.",
};

const steps = [
  { icon: Clock, title: "24-hour turnaround", description: "Submit details, get a valuation the same or next business day." },
  { icon: ShieldCheck, title: "No obligation", description: "Walk away any time — the valuation costs nothing and commits you to nothing." },
  { icon: Handshake, title: "Trade in or sell outright", description: "Apply the value toward your next car, or take the cash directly." },
];

export default function SellYourCarPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 md:px-8">
      <div className="text-center">
        <h1 className="font-display text-3xl font-medium md:text-4xl">Sell your car</h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
          Tell us about your vehicle and we&apos;ll get back to you with an
          honest, no-obligation valuation.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {steps.map(({ icon: Icon, title, description }) => (
          <div key={title} className="rounded-md border border-line bg-paper-raised p-5">
            <Icon className="h-5 w-5 text-brass" aria-hidden />
            <h2 className="mt-3 text-sm font-medium text-ink">{title}</h2>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">{description}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <SellCarForm />
      </div>
    </div>
  );
}
