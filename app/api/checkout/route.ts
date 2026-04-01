import Stripe from "stripe";

// Simple in-memory rate limiter: max 10 requests per IP per minute.
// Note: relies on x-forwarded-for which can be spoofed without server-level trust;
// for production, replace with a durable store (Redis/Upstash) or Vercel edge middleware.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  // Evict expired entries to prevent unbounded map growth
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

// Only Plus is available for self-serve checkout; Business uses contact flow
const PRICE_IDS: Record<string, string | undefined> = {
  plus: process.env.STRIPE_PRICE_PLUS,
  // business: reserved for future self-serve (currently routes to mailto:)
};

export async function POST(request: Request) {
  // Rate limiting
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return Response.json(
      { error: "Stripe is not configured" },
      { status: 500 },
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

  const priceId = PRICE_IDS[tier];
  if (!priceId) {
    return Response.json(
      { error: `Price ID not configured for tier: ${tier}` },
      { status: 500 },
    );
  }

  const stripe = new Stripe(secretKey, {
    apiVersion: "2025-03-31.basil",
  });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://getcharta.ai";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
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
