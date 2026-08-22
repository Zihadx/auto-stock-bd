import { ShieldCheck, FileCheck2, BadgeDollarSign, Wrench } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "82-point inspection",
    description:
      "Every vehicle is inspected for engine health, structural integrity, and electronics before it's listed — not after you ask.",
  },
  {
    icon: FileCheck2,
    title: "Verified paperwork",
    description:
      "Registration, tax token, and fitness certificate are checked and confirmed genuine before listing.",
  },
  {
    icon: BadgeDollarSign,
    title: "One fixed price",
    description:
      "The listed price is the real price. Where it's negotiable, we say so up front — no back-and-forth games.",
  },
  {
    icon: Wrench,
    title: "90-day mechanical cover",
    description:
      "Major mechanical issues found within 90 days of purchase are covered at our partner workshops.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <h2 className="font-display text-2xl font-medium md:text-3xl">
        Why buy through AutoStock BD
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map(({ icon: Icon, title, description }) => (
          <div key={title} className="bg-paper-raised p-6">
            <Icon className="h-5 w-5 text-brass" aria-hidden />
            <h3 className="mt-4 font-display text-base font-medium">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
