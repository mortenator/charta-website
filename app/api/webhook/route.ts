import Stripe from "stripe";

// Stripe webhook handler — verifies subscription lifecycle events.
// Required env vars: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
//
// Set up in Stripe Dashboard: Webhooks → Add endpoint → https://getcharta.ai/api/webhook
// Events to listen for:
//   - checkout.session.completed
//   - customer.subscription.updated
//   - customer.subscription.deleted

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: "2025-03-31.basil" })
  : null;

export async function POST(request: Request) {
  if (!stripe || !webhookSecret) {
    console.error("Stripe webhook not configured");
    return new Response("Webhook not configured", { status: 500 });
  }

  const sig = request.headers.get("stripe-signature");
  if (!sig) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  let event: Stripe.Event;
  const rawBody = await request.text();

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        // TODO: provision the user's Plus subscription in your database
        // e.g. update user record where email = session.customer_email
        console.log("Checkout completed:", session.id, session.customer_email);
        break;
      }
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("Subscription updated:", subscription.id, subscription.status);
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        // TODO: revoke the user's Plus access in your database
        console.log("Subscription cancelled:", subscription.id);
        break;
      }
      default:
        // Unhandled event type — safe to ignore
        break;
    }
  } catch (err) {
    console.error("Error handling webhook event:", err);
    return new Response("Webhook handler error", { status: 500 });
  }

  return new Response(null, { status: 200 });
}
