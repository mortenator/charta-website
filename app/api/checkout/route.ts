import Stripe from "stripe";

// Stripe client is initialized at module level for efficiency in long-lived environments.
// Next.js serverless functions are ephemeral so this also works per-cold-start.
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: "2025-03-31.basil" })
  : null;

// Simple in-memory rate limiter: max 10 requests per IP per minute.
// Note: x-forwarded-for can be spoofed without trusted proxy configuration.
// For production hardening, use Vercel edge middleware or a durable store (Redis/Upstash).
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  // Evict expired entries to prevent unbounded map growth in long-lived environments
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(key);
  }
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

// Only Plus is available for self-serve checkout; Business uses contact flow (mailto:)
const STRIPE_PRICE_PLUS = process.env.STRIPE_PRICE_PLUS;

export async function POST(request: Request) {
  if (!stripe) {
    return Response.json(
      { error: "Stripe is not configured" },
      { status: 500 },
    );
  }

  // Rate limiting
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let body: { tier?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
  const tier = body?.tier;

  if (tier !== "plus") {
    return Response.json(
      { error: "Invalid tier. Only 'plus' is available for checkout." },
      { status: 400 },
    );
  }

  if (!STRIPE_PRICE_PLUS) {
    return Response.json(
      { error: "Price ID not configured for Plus tier" },
      { status: 500 },
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://getcharta.ai";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: STRIPE_PRICE_PLUS, quantity: 1 }],
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/#pricing`,
    });

    if (!session.url) {
      return Response.json(
        { error: "Failed to create checkout session" },
        { status: 500 },
      );
    }

    return Response.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return Response.json(
      { error: "Failed to initiate checkout. Please try again." },
      { status: 500 },
    );
  }
}
