import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

// Stripe webhook handler — verifies and processes subscription lifecycle events.
// Required env vars: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
//
// Set up in Stripe Dashboard: Developers → Webhooks → Add endpoint
// URL: https://getcharta.ai/api/webhook
// Events to subscribe:
//   - checkout.session.completed
//   - customer.subscription.updated
//   - customer.subscription.deleted
//
// ⚠️ IMPORTANT: The checkout.session.completed handler below must be wired to your
// database (provision user's Plus plan) before this can go to production.
// Follow-up task: https://github.com/mortenator/charta-website/issues (Stripe provisioning)

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: Request) {
  if (!stripe || !webhookSecret) {
    console.error("Stripe webhook not configured (missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET)");
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
        const email = session.customer_email ?? session.customer_details?.email;
        if (!email) {
          console.warn("checkout.session.completed: no customer email found for session", session.id);
          break;
        }
        // TODO: provision the user's Plus subscription in your database
        // Example (Supabase):
        //   await supabase.from("users").update({ plan: "plus" }).eq("email", email)
        console.log("Checkout completed:", session.id);
        // Return 501 until provisioning is implemented to signal to Stripe
        // that the event was not successfully handled, allowing for replay.
        return new Response("Webhook handler not implemented", { status: 501 });
      }
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        // TODO: update subscription status in database based on subscription.status
        console.log("Subscription updated:", subscription.id, subscription.status);
        return new Response("Webhook handler not implemented", { status: 501 });
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        // TODO: revoke Plus access for this subscription's customer in your database
        console.log("Subscription cancelled:", subscription.id);
        return new Response("Webhook handler not implemented", { status: 501 });
      }
      default:
        // Unhandled event type — safe to ignore
        console.log(`Unhandled event type: ${event.type}`);
        break;
    }
  } catch (err) {
    console.error("Error handling webhook event:", err);
    return new Response("Webhook handler error", { status: 500 });
  }

  return new Response(null, { status: 200 });
}
