import Stripe from "stripe";

// Shared Stripe client — initialized once at module level.
// Only used server-side (API routes). Never import from client components.
const secretKey = process.env.STRIPE_SECRET_KEY;

export const stripe = secretKey
  ? new Stripe(secretKey, {
      apiVersion: "2025-03-31.basil",
    })
  : null;
