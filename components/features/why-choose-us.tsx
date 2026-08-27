import { ShieldCheck, FileCheck2, BadgeDollarSign, Wrench } from "lucide-react";
import { RevealList, RevealItem } from "@/components/features/scroll-reveal";

const reasons = [
  {
    icon: ShieldCheck,
    index: "01",
    title: "82-point inspection",
    description:
      "Every vehicle is inspected for engine health, structural integrity, and electronics before it's listed — not after you ask.",
  },
  {
    icon: FileCheck2,
    index: "02",
    title: "Verified paperwork",
    description:
      "Registration, tax token, and fitness certificate are checked and confirmed genuine before listing.",
  },
  {
    icon: BadgeDollarSign,
    index: "03",
    title: "One fixed price",
    description:
      "The listed price is the real price. Where it's negotiable, we say so up front — no back-and-forth games.",
  },
  {
    icon: Wrench,
    index: "04",
    title: "90-day mechanical cover",
    description:
      "Major mechanical issues found within 90 days of purchase are covered at our partner workshops.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="container-page py-16 md:py-24">
      <div className="md:grid md:grid-cols-12 md:gap-6">
        <div className="md:col-span-4">
          <p className="text-label text-brass">Act 03 · Why us</p>
          <h2 className="text-h1 mt-3 max-w-xs text-ink">
            Buying a used car shouldn&apos;t feel like a gamble.
          </h2>
        </div>

        <RevealList className="mt-10 md:col-span-8 md:mt-0">
          {reasons.map(({ icon: Icon, index, title, description }) => (
            <RevealItem
              key={title}
              className="flex gap-5 border-b border-line py-6 first:pt-0 last:border-b-0"
            >
              <span className="text-h2 shrink-0 text-ink-faint">{index}</span>
              <div>
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-brass" aria-hidden />
                  <h3 className="text-h3 text-ink">{title}</h3>
                </div>
                <p className="text-body mt-2 max-w-lg text-ink-soft">{description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealList>
      </div>
    </section>
  );
}
