import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developers — Charta",
  description:
    "Charta API docs, MCP setup, and SDK reference. Build chart integrations programmatically.",
};

function CodeBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="shimmer-border rounded-xl overflow-hidden relative">
      <div className="code-shimmer-tr" />
      <div className="code-shimmer-bl" />
      <div className="px-4 py-2 text-xs text-white/30" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {title}
      </div>
      <pre className="p-4 text-sm text-white/70 overflow-x-auto font-mono leading-relaxed">
        <code>{children}</code>
      </pre>
    </div>
  );
}

export default function DevelopersPage() {
  return (
    <div className="min-h-screen" style={{ background: "#000000" }}>
      <div className="mx-auto max-w-4xl px-6 py-24">
        <Link
          href="/"
          className="text-sm mb-12 inline-block transition-colors"
          style={{ color: "#9281F7" }}
        >
          ← Back to home
        </Link>

        <h1
          className="text-gradient-heading text-4xl sm:text-5xl font-normal mb-4"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          Developers
        </h1>
        <p className="text-white/40 text-lg mb-16 max-w-2xl">
          Build chart integrations with the Charta API. Generate charts
          programmatically, connect via MCP, or use our TypeScript SDK.
        </p>

        {/* API Section */}
        <section className="mb-20">
          <h2
            className="text-white/80 text-2xl font-normal mb-6"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            REST API
          </h2>
          <p className="text-white/40 text-sm mb-6 leading-relaxed">
            Generate charts via HTTP. Send a JSON payload describing your chart
            and receive a rendered image or native Google Slides insert.
          </p>

          <CodeBlock title="POST /api/v1/charts">
{`curl -X POST https://api.getcharta.ai/v1/charts \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "waterfall",
    "title": "Revenue Bridge Q1 → Q2",
    "data": [
      { "label": "Q1 Revenue", "value": 1200 },
      { "label": "New Sales", "value": 340 },
      { "label": "Churn", "value": -120 },
      { "label": "Expansion", "value": 80 },
      { "label": "Q2 Revenue", "value": 1500, "total": true }
    ]
  }'`}
          </CodeBlock>
        </section>

        {/* MCP Section */}
        <section className="mb-20">
          <h2
            className="text-white/80 text-2xl font-normal mb-6"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            MCP Integration
          </h2>
          <p className="text-white/40 text-sm mb-6 leading-relaxed">
            Connect Charta to Claude, Cursor, or any MCP-compatible AI client.
            Let your AI assistant create and insert charts directly.
          </p>

          <CodeBlock title="claude_desktop_config.json">
{`{
  "mcpServers": {
    "charta": {
      "command": "npx",
      "args": ["-y", "@charta/mcp-server"],
      "env": {
        "CHARTA_API_KEY": "your-api-key"
      }
    }
  }
}`}
          </CodeBlock>

          <div className="mt-6 shimmer-border rounded-xl p-6">
            <h3 className="text-white/70 text-sm font-normal mb-3">
              Available MCP Tools
            </h3>
            <ul className="space-y-2 text-sm text-white/40">
              <li>
                <code className="text-[#9281F7]">create_chart</code> — Generate
                a chart from structured data
              </li>
              <li>
                <code className="text-[#9281F7]">list_chart_types</code> — List
                all supported chart types
              </li>
              <li>
                <code className="text-[#9281F7]">insert_into_slide</code> —
                Insert a generated chart into a Google Slide
              </li>
              <li>
                <code className="text-[#9281F7]">update_chart_data</code> —
                Update data in an existing chart
              </li>
            </ul>
          </div>
        </section>

        {/* SDK Section */}
        <section className="mb-20">
          <h2
            className="text-white/80 text-2xl font-normal mb-6"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            TypeScript SDK
          </h2>
          <p className="text-white/40 text-sm mb-6 leading-relaxed">
            Type-safe chart generation with full autocomplete support.
          </p>

          <CodeBlock title="Install">
            {`npm install @charta/sdk`}
          </CodeBlock>

          <div className="mt-4">
            <CodeBlock title="Usage">
{`import { Charta } from "@charta/sdk";

const charta = new Charta({ apiKey: process.env.CHARTA_API_KEY });

const chart = await charta.charts.create({
  type: "mekko",
  title: "Market Share by Segment",
  data: {
    categories: ["Enterprise", "Mid-Market", "SMB"],
    series: [
      { name: "Us", values: [45, 30, 15] },
      { name: "Competitor A", values: [30, 35, 40] },
      { name: "Others", values: [25, 35, 45] },
    ],
  },
});

// Insert into a Google Slide
await charta.slides.insert({
  presentationId: "your-presentation-id",
  slideIndex: 0,
  chartId: chart.id,
});`}
            </CodeBlock>
          </div>
        </section>

        {/* Auth Section */}
        <section className="mb-20">
          <h2
            className="text-white/80 text-2xl font-normal mb-6"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Authentication
          </h2>
          <p className="text-white/40 text-sm leading-relaxed">
            All API requests require a Bearer token. Generate your API key in
            the{" "}
            <span className="text-[#9281F7]">Charta dashboard</span> under
            Settings → API Keys. Keep your key secret — never expose it in
            client-side code.
          </p>
        </section>

        {/* Rate limits */}
        <section>
          <h2
            className="text-white/80 text-2xl font-normal mb-6"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Rate Limits
          </h2>
          <div className="shimmer-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <th className="text-left px-4 py-3 text-white/40 font-normal">
                    Plan
                  </th>
                  <th className="text-left px-4 py-3 text-white/40 font-normal">
                    Requests / min
                  </th>
                  <th className="text-left px-4 py-3 text-white/40 font-normal">
                    Daily credits
                  </th>
                </tr>
              </thead>
              <tbody className="text-white/60">
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td className="px-4 py-3">Free</td>
                  <td className="px-4 py-3">10</td>
                  <td className="px-4 py-3">5</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td className="px-4 py-3">Plus</td>
                  <td className="px-4 py-3">30</td>
                  <td className="px-4 py-3">20</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Business</td>
                  <td className="px-4 py-3">120</td>
                  <td className="px-4 py-3">Unlimited</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
