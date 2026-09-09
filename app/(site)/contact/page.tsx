import type { Metadata } from "next";
import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { ContactForm } from "@/components/features/contact-form";
import { siteConfig } from "@/config/site";
import {
  ACCENT,
  BURGUNDY,
  CHARCOAL,
  GOLD,
  LINE,
  PAPER,
  PINK,
} from "@/components/ui/tokens";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact AutoStock BD for vehicle listings, financing, bulk purchases, and showroom enquiries in Gulshan, Dhaka.",
};

const contactDetails = [
  {
    icon: MapPin,
    label: "Showroom",
    title: "Visit AutoStock BD",
    value: siteConfig.address,
  },
  {
    icon: Phone,
    label: "Direct line",
    title: "Speak with our team",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone}`,
  },
  {
    icon: Mail,
    label: "Email",
    title: "Send an enquiry",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
];

export default function ContactPage() {
  return (
    <main
      // `bg-paper` / `text-ink` already flip correctly in dark mode via the
      // CSS variables in globals.css — do NOT pair them with dark:bg-paper /
      // dark:text-paper, that double-flips and produces near-black-on-black.
      // We only add an explicit dark: override where we want to *deviate*
      // from the automatic flip (charcoal instead of the token's dark bg).
      className="relative overflow-hidden bg-paper text-ink dark:bg-charcoal"
      style={
        {
          "--contact-accent": ACCENT,
          "--contact-burgundy": BURGUNDY,
          "--contact-charcoal": CHARCOAL,
          "--contact-paper": PAPER,
          "--contact-pink": PINK,
          "--contact-gold": GOLD,
          "--contact-line": LINE,
        } as React.CSSProperties
      }
    >
      {/* Editorial grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in srgb, var(--contact-charcoal) 4%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--contact-charcoal) 4%, transparent) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "linear-gradient(to bottom, black, transparent 72%)",
        }}
      />

      {/* Burgundy atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-0 h-[600px] w-[600px] rounded-full blur-[140px]"
        style={{
          backgroundColor: `color-mix(in srgb, ${BURGUNDY} 12%, transparent)`,
        }}
      />

      {/* Pink atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/4 top-20 h-[280px] w-[280px] rounded-full blur-[100px]"
        style={{
          backgroundColor: `color-mix(in srgb, ${ACCENT} 5%, transparent)`,
        }}
      />

      <div className="container relative mx-auto px-4 py-20 md:py-28 lg:py-32">
        {/* HERO */}
        <section className="max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:items-end">
            <div>
              <div className="mb-7 flex items-center gap-3">
                <span
                  className="h-px w-12"
                  style={{ backgroundColor: ACCENT }}
                />

                <p
                  className="text-[10px] font-semibold uppercase tracking-[0.28em]"
                  style={{ color: ACCENT }}
                >
                  AUTOSTOCK BD / CONTACT
                </p>
              </div>

              <h1 className="max-w-5xl text-[clamp(3.2rem,7vw,7rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-ink">
                Let&apos;s talk
                <span
                  className="block font-serif font-normal italic"
                  style={{ color: BURGUNDY }}
                >
                  automobiles.
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-base leading-8 text-ink/60 md:text-lg">
                Looking for your next vehicle, exploring financing, sourcing
                multiple units, or simply need more information? Tell us what
                you&apos;re looking for and our team will take it from there.
              </p>
            </div>

            {/* Response indicator */}
            <div className="border-l border-ink/10 pl-6 lg:mb-2">
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: ACCENT }}
                />

                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/50">
                  Response standard
                </span>
              </div>

              <p className="mt-4 text-2xl font-medium leading-tight tracking-[-0.03em]">
                Usually within
                <br />
                one business day.
              </p>

              <p className="mt-4 text-xs leading-5 text-ink/45">
                For urgent enquiries, call our showroom directly.
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT SYSTEM */}
        <section className="mt-20 border-y border-ink/10 lg:mt-28">
          <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
            {/* INFORMATION RAIL */}
            <aside className="border-b border-ink/10 py-10 lg:border-b-0 lg:border-r lg:py-14 lg:pr-14">
              <div className="flex items-center justify-between">
                <p
                  className="text-[10px] font-semibold uppercase tracking-[0.24em]"
                  style={{ color: ACCENT }}
                >
                  CONTACT DETAILS
                </p>

                <span className="text-[10px] font-medium tracking-[0.2em] text-ink/35">
                  01 — 04
                </span>
              </div>

              <div className="mt-10">
                {contactDetails.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="group border-t border-ink/10 py-7 first:border-t-0 first:pt-0"
                    >
                      <div className="flex gap-4">
                        <span
                          className="mt-1 w-5 shrink-0 text-[9px] font-semibold tracking-[0.15em]"
                          style={{
                            color: `color-mix(in srgb, ${BURGUNDY} 50%, transparent)`,
                          }}
                        >
                          0{index + 1}
                        </span>

                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center border transition-colors duration-300 group-hover:border-[#F51B72]/50"
                          style={{
                            borderColor: LINE,
                            color: ACCENT,
                          }}
                        >
                          <Icon
                            className="h-4 w-4"
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/45">
                            {item.label}
                          </p>

                          <p className="mt-1 text-base font-medium tracking-[-0.01em]">
                            {item.title}
                          </p>

                          {item.href ? (
                            <a
                              href={item.href}
                              className="mt-1 block break-words text-sm leading-6 text-ink/55 transition-colors hover:text-[#F51B72]"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="mt-1 text-sm leading-6 text-ink/55">
                              {item.value}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Opening hours */}
              <div className="border-t border-ink/10 pt-8">
                <div className="flex gap-4">
                  <span
                    className="mt-1 w-5 shrink-0 text-[9px] font-semibold tracking-[0.15em]"
                    style={{
                      color: `color-mix(in srgb, ${BURGUNDY} 50%, transparent)`,
                    }}
                  >
                    04
                  </span>

                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center border"
                    style={{
                      borderColor: LINE,
                      color: ACCENT,
                    }}
                  >
                    <Clock
                      className="h-4 w-4"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/45">
                      Showroom hours
                    </p>

                    <p className="mt-1 text-base font-medium">
                      Saturday — Thursday
                    </p>

                    <p className="text-sm leading-6 text-ink/55">
                      10:00 AM — 8:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust detail */}
              <div
                className="mt-10 border-t pt-7"
                style={{
                  borderColor: `color-mix(in srgb, ${BURGUNDY} 20%, transparent)`,
                }}
              >
                <div className="flex gap-3">
                  <ShieldCheck
                    className="mt-0.5 h-5 w-5 shrink-0"
                    style={{ color: GOLD }}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />

                  <div>
                    <p className="text-sm font-medium">
                      A straightforward buying experience.
                    </p>

                    <p className="mt-1 text-xs leading-5 text-ink/50">
                      Clear communication, reliable vehicle information, and
                      dedicated assistance from enquiry to delivery.
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            {/* FORM */}
            <div className="relative py-10 lg:py-14 lg:pl-14">
              <div className="mb-10 flex items-end justify-between gap-6">
                <div>
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.24em]"
                    style={{ color: ACCENT }}
                  >
                    START A CONVERSATION
                  </p>

                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
                    Tell us what you need.
                  </h2>

                  <p className="mt-3 max-w-lg text-sm leading-6 text-ink/55">
                    Give us a few details and we&apos;ll connect you with the
                    right information, vehicle, or member of our team.
                  </p>
                </div>

                <ArrowUpRight
                  className="hidden h-7 w-7 shrink-0 md:block"
                  style={{ color: ACCENT }}
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
              </div>

              {/* Editorial accent */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-14 hidden h-20 w-px lg:block"
                style={{ backgroundColor: ACCENT }}
              />

              <ContactForm />
            </div>
          </div>
        </section>

        {/* SHOWROOM CTA
            This block sets an explicit dark, fixed palette regardless of the
            site's light/dark mode — that's why it uses the raw CHARCOAL /
            PAPER / PINK constants via inline style instead of the ink/paper
            Tailwind tokens. Left as-is intentionally. */}
        <section
          className="relative mt-20 overflow-hidden px-7 py-11 md:mt-24 md:px-12 md:py-16"
          style={{
            backgroundColor: CHARCOAL,
            color: PAPER,
          }}
        >
          {/* Burgundy atmosphere */}
          <div
            aria-hidden="true"
            className="absolute -right-32 -top-40 h-[480px] w-[480px] rounded-full blur-[100px]"
            style={{
              backgroundColor: `color-mix(in srgb, ${BURGUNDY} 45%, transparent)`,
            }}
          />

          {/* Pink atmosphere */}
          <div
            aria-hidden="true"
            className="absolute bottom-[-180px] left-1/3 h-[320px] w-[320px] rounded-full blur-[100px]"
            style={{
              backgroundColor: `color-mix(in srgb, ${ACCENT} 10%, transparent)`,
            }}
          />

          {/* Architectural line */}
          <div
            aria-hidden="true"
            className="absolute right-0 top-0 h-full w-[38%] opacity-40"
            style={{
              backgroundImage: `linear-gradient(135deg, transparent 0 48%, ${ACCENT} 48.2%, transparent 48.5%)`,
            }}
          />

          <div className="relative flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <span
                  className="h-px w-8"
                  style={{ backgroundColor: ACCENT }}
                />

                <p
                  className="text-[10px] font-semibold uppercase tracking-[0.25em]"
                  style={{ color: ACCENT }}
                >
                  GULSHAN / DHAKA
                </p>
              </div>

              <h2 className="mt-5 max-w-xl text-3xl font-medium leading-[1.05] tracking-[-0.04em] md:text-5xl">
                Some decisions are better made
                <span
                  className="font-serif italic"
                  style={{ color: PINK }}
                >
                  {" "}
                  in person.
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-6 text-paper/55">
                Visit our showroom and explore available vehicles with the
                AutoStock BD team. No pressure — just straightforward advice
                and the information you need.
              </p>
            </div>

            <a
              href={`tel:${siteConfig.phone}`}
              className="group inline-flex w-fit items-center gap-4 border px-5 py-3.5 text-sm font-medium text-paper transition-all duration-300 hover:border-[#F51B72] bg-[#F51B72] hover:text-[#0A0106]"
              style={{
                borderColor: "rgba(245, 241, 234, 0.2)",
              }}
            >
              Call our team

              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </a>
          </div>
        </section>

        {/* Footer detail */}
        <div className="mt-8 flex flex-col justify-between gap-2 text-[9px] font-medium uppercase tracking-[0.2em] text-ink/35 sm:flex-row">
          <span>AutoStock BD</span>
          <span>Vehicle commerce / Dhaka, Bangladesh</span>
        </div>
      </div>
    </main>
  );
}