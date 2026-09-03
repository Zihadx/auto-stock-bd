"use client";

import { ACCENT, CHARCOAL, PAPER } from "../ui/tokens";

const TESTIMONIALS = [
  {
    quote:
      "I'd been burned by odometer fraud once before. The inspection report here caught things I wouldn't have known to check for myself.",
    name: "Farhan Kabir",
    detail: "Bought a 2021 Range Rover, Gulshan",
  },
  {
    quote:
      "No back-and-forth over price. The number matched the car when it arrived, which is rarer than it should be in this market.",
    name: "Mahin Rahman",
    detail: "Bought a 2020 BMW 5 Series, Chattogram",
  },
  {
    quote:
      "Sold my car in eleven days at the price they quoted on day one. Handled the transfer paperwork so I didn't have to chase anyone.",
    name: "Nusrat Jahan",
    detail: "Sold a 2019 Honda CR-V, Dhaka",
  },
];

export function Testimonials() {
  return (
    <section className="py-24" style={{ backgroundColor: CHARCOAL, color: PAPER }}>
      <div className="mx-auto max-w-[1920px] px-6 sm:px-9 lg:px-14 xl:px-20">
        <div className="mb-16 flex items-center gap-4">
          <span className="h-px w-9" style={{ backgroundColor: ACCENT }} />
          <span className="text-[11px] uppercase tracking-[0.32em]" style={{ color: `${PAPER}A6` }}>
            From Owners
          </span>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="flex flex-col">
              <blockquote
                className="text-[16px] font-light leading-[1.75]"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 text-[12px]" style={{ color: `${PAPER}70` }}>
                <span style={{ color: PAPER }}>{t.name}</span> — {t.detail}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}