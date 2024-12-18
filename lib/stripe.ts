import "server-only";

import { Stripe as StripeProps, loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";

let stripePromise: Promise<StripeProps | null>;
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

const stripe = new Stripe(process.env.STRIPE_API_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2024-10-28.acacia",
});

export default stripe;
