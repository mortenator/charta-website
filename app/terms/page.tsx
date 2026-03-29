import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Charta",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ background: "#000000" }}>
      <div className="mx-auto max-w-3xl px-6 py-24">
        <Link
          href="/"
          className="text-sm mb-12 inline-block transition-colors"
          style={{ color: "#9281F7" }}
        >
          ← Back to home
        </Link>

        <h1
          className="text-gradient-heading text-4xl font-normal mb-8"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          Terms of Service
        </h1>
        <p className="text-white/30 text-sm mb-12">
          Last updated: March 29, 2026
        </p>

        <div className="prose prose-invert max-w-none space-y-8 text-white/60 text-sm leading-relaxed">
          <section>
            <h2 className="text-white/80 text-lg font-normal mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using Charta, you agree to be bound by these
              terms. If you do not agree, do not use the service.
            </p>
          </section>

          <section>
            <h2 className="text-white/80 text-lg font-normal mb-3">
              2. Service Description
            </h2>
            <p>
              Charta provides AI-powered chart generation for Google Slides.
              Features include waterfall, Mekko, and 10+ chart types with
              Google Sheets integration.
            </p>
          </section>

          <section>
            <h2 className="text-white/80 text-lg font-normal mb-3">
              3. User Accounts
            </h2>
            <p>
              You are responsible for maintaining the security of your account.
              You must provide accurate information when creating an account and
              keep it up to date.
            </p>
          </section>

          <section>
            <h2 className="text-white/80 text-lg font-normal mb-3">
              4. Usage Limits
            </h2>
            <p>
              Free accounts receive 5 AI credits per day. Plus accounts receive
              20 credits per day. Business accounts have unlimited credits.
              Credits reset daily at midnight UTC.
            </p>
          </section>

          <section>
            <h2 className="text-white/80 text-lg font-normal mb-3">
              5. Intellectual Property
            </h2>
            <p>
              Charts you create with Charta belong to you. The Charta service,
              brand, and underlying technology remain the property of Charta.
            </p>
          </section>

          <section>
            <h2 className="text-white/80 text-lg font-normal mb-3">
              6. Limitation of Liability
            </h2>
            <p>
              Charta is provided &quot;as is&quot; without warranties. We are
              not liable for any damages arising from your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-white/80 text-lg font-normal mb-3">
              7. Contact
            </h2>
            <p>
              For questions about these terms, contact us at legal@getcharta.ai.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
