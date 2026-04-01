"use client";

import { useState } from "react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "For individuals getting started",
    features: [
      "5 AI credits / day",
      "All 12 chart types",
      "Google Slides integration",
      "Community support",
    ],
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Plus",
    price: "$12",
    period: "/mo",
    description: "For power users and small teams",
    features: [
      "20 AI credits / day",
      "Priority chart rendering",
      "Google Sheets live sync",
      "Email support",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Business",
    price: "$29",
    period: "/mo",
    description: "For teams that run on slides",
    features: [
      "Unlimited AI credits",
      "Team workspace",
      "Custom brand templates",
      "Dedicated support",
    ],
    cta: "Contact us",
    highlighted: false,
  },
] as const;

export default function Pricing() {
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  async function handleCheckout(tier: "plus") {
    setLoadingTier(tier);
    setCheckoutError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setCheckoutError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setCheckoutError("Network error. Please try again.");
    } finally {
      setLoadingTier(null);
    }
  }

  return (
    <section id="pricing" className="py-32 px-6 relative">
      {/* Section shimmer line */}
      <div
        className="mx-auto mb-16 h-px max-w-xs"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)",
        }}
      />

      <div className="mx-auto max-w-6xl">
        <h2
          className="text-gradient-heading text-3xl sm:text-4xl font-normal text-center mb-4"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          Simple pricing
        </h2>
        <p className="text-white/40 text-center mb-16 max-w-md mx-auto">
          Start free. Upgrade when you need more.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`${tier.highlighted ? "shimmer-border-purple" : "shimmer-border"} rounded-2xl p-8 flex flex-col`}
            >
              <h3 className="text-lg font-normal text-white mb-1">
                {tier.name}
              </h3>
              <p className="text-sm text-white/40 mb-6">{tier.description}</p>

              <div className="mb-8">
                <span className="text-4xl font-normal text-white">
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="text-white/40 text-sm">{tier.period}</span>
                )}
              </div>

              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-sm text-white/50 flex items-center gap-2"
                  >
                    <span style={{ color: "#9281F7" }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {tier.name === "Free" && (
                <a
                  href="https://workspace.google.com/marketplace/app/charta"
                  className={`${tier.highlighted ? "glass-button-purple" : "glass-button"} w-full py-3 rounded-2xl text-sm font-medium transition-all hover:scale-[1.02] text-center block`}
                >
                  {tier.cta}
                </a>
              )}

              {tier.name === "Plus" && (
                <>
                  <button
                    onClick={() => handleCheckout("plus")}
                    disabled={loadingTier === "plus"}
                    className={`${tier.highlighted ? "glass-button-purple" : "glass-button"} w-full py-3 rounded-2xl text-sm font-medium transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loadingTier === "plus" ? "Loading..." : tier.cta}
                  </button>
                  {checkoutError && (
                    <p className="text-red-400 text-xs mt-2 text-center">{checkoutError}</p>
                  )}
                </>
              )}

              {tier.name === "Business" && (
                <a
                  href="mailto:hello@getcharta.ai"
                  className={`${tier.highlighted ? "glass-button-purple" : "glass-button"} w-full py-3 rounded-2xl text-sm font-medium transition-all hover:scale-[1.02] text-center block`}
                >
                  {tier.cta}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
