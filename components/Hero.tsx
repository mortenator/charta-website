"use client";

import ScrollVideoCanvas from "./ScrollVideoCanvas";
import WaitlistForm from "./WaitlistForm";

export default function Hero() {
  return (
    <section id="hero" className="relative" style={{ height: "280vh" }}>
      <div className="sticky top-0 h-screen flex items-center">
        <div className="mx-auto max-w-6xl w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column — text */}
          <div className="flex flex-col gap-8 max-w-xl">
            <div className="inline-flex self-start">
              <span className="shimmer-border rounded-full px-4 py-1.5 text-xs text-white/70 tracking-wide">
                Now in beta · Google Slides
              </span>
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl leading-[1.05] font-normal"
              style={{ fontFamily: "var(--font-instrument-serif), serif" }}
            >
              <span className="text-gradient-heading block">Charts that</span>
              <span className="text-gradient-purple block">
                think for you.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/50 leading-relaxed max-w-md">
              The ThinkCell alternative built for Google Slides. AI-powered
              waterfall, Mekko, and 10+ chart types — natively in your slide.
            </p>

            <WaitlistForm source="website" className="max-w-md" />

            <p className="text-xs text-white/20 lg:mt-4 hidden lg:block">
              ↓ Scroll to explore
            </p>
          </div>

          {/* Right column — scroll video (desktop only) */}
          <div className="hidden lg:block relative h-[70vh]">
            <ScrollVideoCanvas className="absolute inset-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
