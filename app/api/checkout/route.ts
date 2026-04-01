import Stripe from "stripe";

const PRICE_IDS: Record<string, string | undefined> = {
  plus: process.env.STRIPE_PRICE_PLUS,
  business: process.env.STRIPE_PRICE_BUSINESS,
};

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return Response.json(
      { error: "Stripe is not configured" },
      { status: 500 },
    );
  }

  let body: { tier?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
  const tier = body?.tier;

  if (tier !== "plus" && tier !== "business") {
    return Response.json(
      { error: "Invalid tier. Must be 'plus' or 'business'." },
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

  const stripe = new Stripe(secretKey);

  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://getcharta.ai";

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
