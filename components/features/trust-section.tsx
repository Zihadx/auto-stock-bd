"use client";

import {
  BadgeCheck,
  Headphones,
  HandCoins,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

interface Benefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

const benefits: Benefit[] = [
  {
    title: "Best Price Guarantee",
    description: "Get the best offers on every car.",
    icon: BadgeCheck,
  },
  {
    title: "Trusted Dealers",
    description: "Verified dealers, 100% reliable.",
    icon: ShieldCheck,
  },
  {
    title: "24/7 Support",
    description: "We are here to help you anytime.",
    icon: Headphones,
  },
  {
    title: "Easy Financing",
    description: "Flexible finance options that fit your budget.",
    icon: HandCoins,
  },
];

export default function BenefitsStrip() {
  return (
    <section className="w-full">
      <div
        className="
          mx-auto
          w-full
          overflow-hidden
          border
          border-[#F3A1E3]/40
          bg-[#F8C3E1]
        "
      >
        <div
          className="
          mx-auto
          container
            grid
            grid-cols-1
            divide-y
            divide-[#B20F4D]/15
            sm:grid-cols-2
            sm:divide-y-0
            lg:grid-cols-4
            lg:divide-x
            lg:divide-y-0
          "
        >
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="
                  group
                  flex
                  min-h-[105px]
                  items-center
                  gap-4
                  px-6
                  py-6
                  transition-colors
                  duration-300
                  hover:bg-white/10
                  sm:px-7
                  lg:px-6
                  xl:px-8
                "
              >
                {/* Icon */}
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#B20F4D]
                    text-[#F8C3E1]
                    shadow-sm
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                >
                  <Icon
                    size={24}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <h3
                    className="
                      text-[13px]
                      font-semibold
                      leading-tight
                      tracking-[-0.01em]
                      text-[#19050D]
                    "
                  >
                    {benefit.title}
                  </h3>

                  <p
                    className="
                      mt-1
                      max-w-[180px]
                      text-[11px]
                      font-normal
                      leading-[1.45]
                      text-[#3D1727]/75
                    "
                  >
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}