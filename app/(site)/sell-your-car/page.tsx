
import type { Metadata } from "next";

import { ShieldCheck, Clock, Handshake } from "lucide-react";

import { SellCarForm } from "@/components/features/sell-car-form";
import {
  RevealList,
  RevealItem,
} from "@/components/features/scroll-reveal";

export const metadata: Metadata = {
  title: "Sell Your Car",
  description:
    "Get a no-obligation valuation for your car within 24 hours.",
};

const steps = [
  {
    icon: Clock,
    index: "01",
    title: "24-hour turnaround",
    description:
      "Submit details, get a valuation the same or next business day.",
  },
  {
    icon: ShieldCheck,
    index: "02",
    title: "No obligation",
    description:
      "Walk away any time — the valuation costs nothing and commits you to nothing.",
  },
  {
    icon: Handshake,
    index: "03",
    title: "Trade in or sell outright",
    description:
      "Apply the value toward your next car, or take the cash directly.",
  },
];

export default function SellYourCarPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Very subtle ambient glass glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-40 -top-40
          size-[32rem]
          rounded-full
          bg-[#F51B72]/[0.018]
          blur-[120px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -left-40 top-[35%]
          size-[26rem]
          rounded-full
          bg-[#6B102E]/[0.018]
          blur-[110px]
        "
      />

      <div className="container px-6 mx-auto relative py-20 md:py-40">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-label text-brass">
            Sell your car
          </p>

          <h1 className="text-h1 mt-3 text-ink">
            Tell us about your car.
          </h1>

          <p className="text-body-lg mt-4 text-ink-soft">
            We&apos;ll get back to you with an honest,
            no-obligation valuation.
          </p>
        </div>

        {/* Steps */}
        <RevealList
          className="
            relative mt-12
            grid grid-cols-1 gap-3
            sm:grid-cols-3 sm:gap-4
          "
        >
          {/* Desktop connecting line */}
          <div
            aria-hidden="true"
            className="
              absolute left-8 right-8 top-7
              hidden h-px
              bg-gradient-to-r
              from-transparent
              via-[#F51B72]/[0.10]
              to-transparent
              sm:block
            "
          />

          {steps.map(
            ({ icon: Icon, index, title, description }) => (
              <RevealItem
                key={title}
                className="relative"
              >
                <div
                  className="
                    group relative overflow-hidden
                    rounded-2xl
                    border border-[#F51B72]/[0.065]
                    bg-[#F51B72]/[0.012]
                    p-4
                    backdrop-blur-2xl
                    shadow-[0_14px_40px_rgba(10,1,6,0.035)]
                    transition-all duration-500
                    hover:border-[#F51B72]/[0.12]
                    hover:bg-[#F51B72]/[0.02]
                    hover:shadow-[0_18px_50px_rgba(10,1,6,0.055)]
                  "
                >
                  {/* Glass top reflection */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none absolute
                      inset-x-0 top-0 h-px
                      bg-gradient-to-r
                      from-transparent
                      via-white/[0.10]
                      to-transparent
                    "
                  />

                  {/* Tiny hover glow */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none absolute
                      -right-10 -top-10
                      size-20 rounded-full
                      bg-[#F51B72]/[0.025]
                      opacity-0 blur-3xl
                      transition-opacity duration-500
                      group-hover:opacity-100
                    "
                  />

                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <span
                        className="
                          flex h-8 w-8 shrink-0
                          items-center justify-center
                          rounded-full
                          border border-[#F51B72]/[0.09]
                          bg-[#F51B72]/[0.018]
                          text-xs text-ink-faint
                          shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
                          backdrop-blur-xl
                        "
                      >
                        {index}
                      </span>

                      <div
                        className="
                          flex h-8 w-8 items-center justify-center
                          rounded-lg
                          border border-[#F51B72]/[0.07]
                          bg-[#F51B72]/[0.014]
                          backdrop-blur-xl
                        "
                      >
                        <Icon
                          className="h-4 w-4 text-brass"
                          strokeWidth={1.7}
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    <h2 className="text-h3 mt-4 text-ink">
                      {title}
                    </h2>

                    <p className="text-small mt-1.5 max-w-[16rem] text-ink-soft">
                      {description}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ),
          )}
        </RevealList>

        {/* Form */}
        <div
          className="
            relative mt-14 max-w-2xl
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute
              -inset-3
              rounded-[1.4rem]
              bg-[#F51B72]/[0.012]
              blur-2xl
            "
          />

          <div className="relative">
            <SellCarForm />
          </div>
        </div>
      </div>
    </div>
  );
}

