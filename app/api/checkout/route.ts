import { stripe } from "@/lib/stripe";

// Only Plus is available for self-serve checkout; Business uses contact flow (mailto:)
const STRIPE_PRICE_PLUS = process.env.STRIPE_PRICE_PLUS;

// NOTE: This endpoint is intentionally unauthenticated to support anonymous checkout.
// Stripe limits abuse via its own fraud detection and 24h session expiry.
// TODO: Once Supabase auth is integrated, optionally require a valid session cookie
// to restrict checkout to signed-in users only.
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

  const baseUrl = process.env.APP_URL;
  if (!baseUrl) {
    console.error("APP_URL is not set");
    return Response.json(
      { error: "Server configuration error" },
      { status: 500 },
    );
  }

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
