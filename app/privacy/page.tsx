import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Charta",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-white/30 text-sm mb-12">
          Last updated: March 29, 2026
        </p>

        <div className="prose prose-invert max-w-none space-y-8 text-white/60 text-sm leading-relaxed">
          <section>
            <h2 className="text-white/80 text-lg font-normal mb-3">
              1. Information We Collect
            </h2>
            <p>
              When you sign up for Charta, we collect your email address and
              basic account information. When you use our Google Slides add-on,
              we access your presentation data solely to render charts within
              your slides. We do not store your presentation content on our
              servers.
            </p>
          </section>

          <section>
            <h2 className="text-white/80 text-lg font-normal mb-3">
              2. How We Use Your Information
            </h2>
            <p>
              We use your information to provide, maintain, and improve the
              Charta service. This includes processing AI chart generation
              requests, syncing data from Google Sheets, and sending you
              service-related communications.
            </p>
          </section>

          <section>
            <h2 className="text-white/80 text-lg font-normal mb-3">
              3. Data Storage and Security
            </h2>
            <p>
              Your data is encrypted in transit and at rest. We use
              industry-standard security measures to protect your information.
              Chart generation requests are processed and not retained after
              delivery.
            </p>
          </section>

          <section>
            <h2 className="text-white/80 text-lg font-normal mb-3">
              4. Third-Party Services
            </h2>
            <p>
              Charta integrates with Google Workspace (Slides and Sheets). Your
              use of these services is governed by Google&apos;s privacy policy.
              We use Supabase for authentication and data storage, and Vercel
              for hosting.
            </p>
          </section>

          <section>
            <h2 className="text-white/80 text-lg font-normal mb-3">
              5. Your Rights
            </h2>
            <p>
              You may request access to, correction of, or deletion of your
              personal data at any time by contacting us at
              privacy@getcharta.ai.
            </p>
          </section>

          <section>
            <h2 className="text-white/80 text-lg font-normal mb-3">
              6. Contact
            </h2>
            <p>
              For questions about this privacy policy, contact us at
              privacy@getcharta.ai.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
