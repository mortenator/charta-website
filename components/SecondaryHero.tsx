import WaitlistForm from "./WaitlistForm";

export default function SecondaryHero() {
  return (
    <section className="py-24 px-6 relative">
      {/* Section shimmer line with purple tint */}
      <div
        className="mx-auto mb-16 h-px max-w-xs"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(146,129,247,0.3), transparent)",
        }}
      />

      <div className="mx-auto max-w-3xl shimmer-border-purple rounded-3xl p-12 sm:p-16 text-center">
        <h2
          className="text-gradient-heading text-3xl sm:text-4xl font-normal mb-4"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          Start building better slides today.
        </h2>
        <p className="text-white/40 text-base mb-8 max-w-md mx-auto">
          Join hundreds of teams already using Charta to create beautiful,
          data-driven presentations in Google Slides.
        </p>

        <WaitlistForm source="website" className="max-w-md mx-auto" />
      </div>
    </section>
  );
}
