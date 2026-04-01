import Stripe from "stripe";

// Stripe client initialized at module level for reuse across warm invocations.
// NOTE: On serverless (Vercel), each cold start gets a fresh instance — this is expected.
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: "2025-03-31.basil" })
  : null;

// Only Plus is available for self-serve checkout; Business uses contact flow (mailto:)
const STRIPE_PRICE_PLUS = process.env.STRIPE_PRICE_PLUS;

export async function POST(request: Request) {
  if (!stripe) {
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
