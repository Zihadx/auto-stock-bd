const stats = [
  { value: "1,200+", label: "Vehicles sold since 2021" },
  { value: "4.8 / 5", label: "Average customer rating" },
  { value: "90 days", label: "Mechanical coverage on every sale" },
  { value: "24 hrs", label: "Average valuation turnaround" },
];

export function TrustSection() {
  return (
    <section className="border-y border-line">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4 md:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center md:text-left">
            <p className="font-tabular text-2xl font-semibold text-ink md:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-ink-soft">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
