const chartTypes = [
  "Waterfall",
  "Bar",
  "Stacked bar",
  "Grouped bar",
  "Line",
  "Area",
  "Pie",
  "Scatter",
  "Mekko",
  "Funnel",
  "Gantt",
  "Heatmap",
] as const;

export default function ChartTypes() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-6xl text-center">
        <h2
          className="text-gradient-heading text-3xl sm:text-4xl font-normal mb-4"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          12 chart types and counting
        </h2>
        <p className="text-white/40 text-base mb-12 max-w-md mx-auto">
          From waterfalls to Mekkos — every chart consulting and finance teams
          need, natively in Google Slides.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          {chartTypes.map((name) => (
            <span
              key={name}
              className="shimmer-border rounded-full px-5 py-2.5 text-sm text-white/60 hover:text-[#9281F7] transition-colors cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
