const features = [
  {
    title: "AI chart generation",
    description:
      "Describe the chart you want in plain English. Charta builds it instantly — waterfall, Mekko, funnel, and more.",
    icon: "✦",
    span: "lg:col-span-2",
    aurora: "rgba(146,129,247,0.35)",
  },
  {
    title: "Google Slides native",
    description:
      "No exports. No screenshots. Charts live natively inside your presentation — editable by anyone on your team.",
    icon: "◈",
    span: "lg:col-span-1",
    aurora: "rgba(244,114,182,0.35)",
  },
  {
    title: "Live data from Sheets",
    description:
      "Connect a Google Sheet and your charts update automatically. Change a cell, see it reflected instantly.",
    icon: "◎",
    span: "lg:col-span-1",
    aurora: "rgba(56,189,248,0.35)",
  },
  {
    title: "Edit and re-insert",
    description:
      "Edit colors, labels, axes, and data — then re-insert with one click. Every chart is fully customizable.",
    icon: "⟡",
    span: "lg:col-span-2",
    aurora: "rgba(74,222,128,0.35)",
  },
] as const;

export default function Features() {
  return (
    <section id="features" className="py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <h2
          className="text-gradient-heading text-3xl sm:text-4xl font-normal text-center mb-16"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          Built for the way you work
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className={`${f.span} shimmer-border rounded-2xl p-8 relative overflow-hidden group min-h-[220px] flex flex-col justify-end`}
            >
              {/* Aurora glow */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 rounded-full transition-all duration-[400ms] group-hover:opacity-100 group-hover:blur-[40px] opacity-75 blur-[30px] pointer-events-none"
                style={{ background: f.aurora }}
              />
              {/* Bottom fade */}
              <div
                className="absolute inset-x-0 bottom-0 pointer-events-none"
                style={{
                  height: "45%",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
                }}
              />

              <div className="relative z-10">
                <span className="text-2xl mb-4 block">{f.icon}</span>
                <h3 className="text-lg font-normal text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
