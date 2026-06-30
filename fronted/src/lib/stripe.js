let stripeInstance;

export function getStripe() {
  if (!stripeInstance) {
    const Stripe = require("stripe");
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripeInstance;
}
