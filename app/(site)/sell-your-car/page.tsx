import type { Metadata } from "next";
import { ShieldCheck, Clock, Handshake } from "lucide-react";
import { SellCarForm } from "@/components/features/sell-car-form";
import { RevealList, RevealItem } from "@/components/features/scroll-reveal";

export const metadata: Metadata = {
  title: "Sell Your Car",
  description: "Get a no-obligation valuation for your car within 24 hours.",
};

const steps = [
  {
    icon: Clock,
    index: "01",
    title: "24-hour turnaround",
    description: "Submit details, get a valuation the same or next business day.",
  },
  {
    icon: ShieldCheck,
    index: "02",
    title: "No obligation",
    description: "Walk away any time — the valuation costs nothing and commits you to nothing.",
  },
  {
    icon: Handshake,
    index: "03",
    title: "Trade in or sell outright",
    description: "Apply the value toward your next car, or take the cash directly.",
  },
];

export default function SellYourCarPage() {
  return (
    <div className="container-page py-14 md:py-20">
      <div className="max-w-2xl">
        <p className="text-label text-brass">Sell your car</p>
        <h1 className="text-h1 mt-3 text-ink">Tell us about your car.</h1>
        <p className="text-body-lg mt-4 text-ink-soft">
          We&apos;ll get back to you with an honest, no-obligation valuation.
        </p>
      </div>

      <RevealList className="relative mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4">
        {/* Connecting line across steps, desktop only */}
        <div
          aria-hidden
          className="absolute left-0 right-0 top-4 hidden h-px bg-line sm:block"
        />
        {steps.map(({ icon: Icon, index, title, description }) => (
          <RevealItem key={title} className="relative">
            <div className="flex items-center gap-3 bg-paper pr-4 sm:bg-transparent">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-paper text-xs text-ink-faint">
                {index}
              </span>
              <Icon className="h-4 w-4 text-brass" aria-hidden />
            </div>
            <h2 className="text-h3 mt-4 text-ink">{title}</h2>
            <p className="text-small mt-1.5 max-w-[16rem] text-ink-soft">{description}</p>
          </RevealItem>
        ))}
      </RevealList>

      <div className="mt-14 max-w-2xl">
        <SellCarForm />
      </div>
    </div>
  );
}
