export default function Demo() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <h2
          className="text-gradient-heading text-3xl sm:text-4xl font-normal text-center mb-12"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          See it in action
        </h2>

        {/* Mock slide preview */}
        <div className="shimmer-border-purple rounded-2xl overflow-hidden relative">
          <div className="code-shimmer-tr" />
          <div className="code-shimmer-bl" />

          <div className="aspect-video bg-[#0a0a0c] flex items-center justify-center p-8">
            <div className="w-full max-w-lg">
              {/* Mock chart */}
              <div className="flex items-end justify-center gap-3 h-48">
                {[65, 85, 45, 95, 70, 55, 80].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t transition-all duration-500"
                    style={{
                      height: `${h}%`,
                      background: `linear-gradient(to top, rgba(146,129,247,${0.3 + i * 0.1}), rgba(154,84,220,${0.5 + i * 0.07}))`,
                    }}
                  />
                ))}
              </div>
              {/* Axis line */}
              <div className="h-px w-full bg-white/10 mt-2" />
              <div className="flex justify-between mt-2">
                {["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"].map((q) => (
                  <span key={q} className="text-[10px] text-white/20 flex-1 text-center">
                    {q}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
