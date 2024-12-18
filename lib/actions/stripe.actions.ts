"use server";
import stripe from "@/lib/stripe";
import { getRecordingById } from "./recording.actions";
import { getStreamById } from "./stream.actions";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import prisma from "../prisma";
import { SUBSCRIPTION_CONFIG } from "@/constants";
import { getCustomerById } from "../db";

const commonCheckoutProps = {
  // @ts-ignore-next-line
  locale: "de",

  allow_promotion_codes: true,
  automatic_tax: {
    enabled: true,
  },
  billing_address_collection: "required",
  payment_method_types: ["card", "paypal"],

  success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
  cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/kurse`,
};

export const createCheckOutSession = async (id: string, type: string) => {
  // Check if user is authenticated

  let customer;
  const { userId } = await auth();
  console.log("userId", userId);
  if (userId) {
    // Check if user is a customer
    try {
      customer = await getCustomerById(userId);
      console.log("Customer", customer);
    } catch (error) {
      console.error("Internal", error);
      return { message: "Internal error", error };
    }
  }

  let sessionUrl: string;

  try {
    let item;
    if (type === "recording") {
      item = await getRecordingById(id);
      console.log("Recording", item);
    }
    if (type === "stream") {
      item = await getStreamById(id);
    }

    let session;
    // Create session for subscription
    if (type === "subscription") {
      const sub = SUBSCRIPTION_CONFIG[id as keyof typeof SUBSCRIPTION_CONFIG];
      console.log("Subscription", sub);
      // @ts-ignore-next-line
      session = await stripe.checkout.sessions.create({
        ...commonCheckoutProps,
        customer_email: customer?.email,
        mode: "subscription",
        line_items: [
          {
            price: sub.priceId,
            // For metered billing, do not pass quantity
            quantity: 1,
          },
        ],
        metadata: {
          userId,
          productId: SUBSCRIPTION_CONFIG.standard.productId,
          type,
        },
      });
    } else {
      // Create session for single purchase
      session = await stripe.checkout.sessions.create({
        ...commonCheckoutProps,
        // @ts-ignore-next-line
        customer_email: customer?.email,

        metadata: {
          userId,
          productId: item?.id,
          type,
        },
        invoice_creation: {
          enabled: true,
        },
        mode: "payment",
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell

            price_data: {
              currency: "EUR",
              product_data: {
                name: item?.title,
                description: item?.description,
                metadata: {
                  productId: item?.id,
                  type,
                },
                images: [item?.imageUrl],
              },
              unit_amount: (item?.price as number) * 100,
            },
            quantity: 1,
          },
        ],
      });
    }
    console.log("[INFO: stripe.actions.ts]", session);
    sessionUrl = session.url as string;
    console.log("[INFO: stripe.actions.ts]", sessionUrl);
  } catch (error) {
    console.error("[ERROR: stripe.actions.ts]", error);
    return { message: "Internal error", error };
  }
  redirect(sessionUrl);
};

export const createPortalSession = async (stripeCustomerId: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Nicht authentifiziert");
  }

  // Create the billing portal session
  const session = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`, // Redirect after managing subscription
  });
  console.log("[INFO: stripe.actions.ts]", session);

  return {
    url: session.url,
    success: true,
  };
};

// export const createPortalSession = async () => {
//   const { userId } = await auth();

//   if (!userId) {
//     throw new Error("Nicht authentifiziert");
//   }

//   // Retrieve the Stripe Customer ID stored in your database
//   const sub = await prisma.stripeUserSubscription.findUnique({
//     where: { userId },
//   });

//   if (sub && sub.stripeCustomerId) {
//     // Create the billing portal session
//     const session = await stripe.billingPortal.sessions.create({
//       customer: sub.stripeCustomerId,
//       return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`, // Redirect after managing subscription
//     });
//     console.log("[INFO: stripe.actions.ts]", session);

//     return {
//       url: session.url,
//       success: true,
//     };
//   } else {
//     return { success: false };
//   }
// };

// /**
//  * Retrieve subscription by user ID
//  * @param userId - The user's ID
//  * @returns {Promise<SripeUserSubscription>} subscription
//  */
// export async function getSubscriptionByCustomerId(
//   userId: string
// ): Promise<StripeUserSubscription> {
//   const subscription = await prisma.stripeUserSubscription.findFirst({
//     where: { userId },
//   });

//   if (!subscription) {
//     throw new Error("Subscription not found");
//   }

//   return subscription;
// }
