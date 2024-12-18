import type { Stripe } from "stripe";

import { NextResponse } from "next/server";

import stripe from "@/lib/stripe";

import { createCustomer, getCustomerByEmail, getCustomerById } from "@/lib/db";
import { Customer, ProductType } from "@/types";
import { get } from "http";
import { fullfillment } from "@/lib/fullfillment";
import { metadata } from "@/app/layout";
import { Prisma } from "@prisma/client";
import {
  updateUserSubscription,
  deleteUserSubscription,
} from "@/lib/subscription";

export async function POST(req: Request) {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      await (await req.blob()).text(),
      req.headers.get("stripe-signature") as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    // On error, log and return the error message.
    if (err! instanceof Error) console.log(err);
    console.log(`❌ Error message: ${errorMessage}`);
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  // Successfully constructed event.
  // console.log("✅ Success:", event.id);

  const permittedEvents: string[] = [
    "checkout.session.completed",
    "payment_intent.succeeded",
    "payment_intent.payment_failed",
    "customer.subscription.updated",
    "customer.subscription.deleted",
  ];

  if (permittedEvents.includes(event.type)) {
    let data;
    let payload;
    let result;

    try {
      switch (event.type) {
        case "checkout.session.completed":
          data = event.data.object as Stripe.Checkout.Session;
          console.log(`💰 CheckoutSession: `, data);

          let customer;

          // Check if customer is logged in
          if (data.metadata?.userId) {
            console.log("🔔 Customer is logged in");

            // Check if customer is already in the database
            customer = await getCustomerById(data.metadata.userId);
            if (!customer) {
              console.log("🔔 Customer is not in the database");
              customer = {
                userId: data.metadata.userId,
                name: data.customer_details?.name as string,
                stripeCustomerId: data.customer as string,
                email: data.customer_details?.email as string,
              };
              customer = await createCustomer(customer);
            } else {
              console.log("🔔 Customer already exists in db with userId");
            }
          } else {
            console.log("🔔 Customer is NOT logged in");

            // Check if user already has a stripe customer id
            customer = await getCustomerByEmail(
              data.customer_details?.email as string
            );

            if (!customer) {
              console.log("🔔 Customer is NOT in the database");
              customer = {
                userId: null,
                name: data.customer_details?.name as string,
                stripeCustomerId: data.customer as string,
                email: data.customer_details?.email as string,
              };
              customer = await createCustomer(customer);
            } else {
              console.log(
                "🔔 Customer already exists in db with stripeCustomerId"
              );
              customer = await getCustomerByEmail(
                data.customer_details?.email as string
              );
            }
          }

          console.log(`💰 CheckoutSession status: ${data.payment_status}`);
          // await updateCustomer(data.customer as string);
          if (data.payment_status === "paid") {
            console.log("🔔 Fulfilling order");
            // await fulFillOrder(data.invoice as string);
            const productId = data.metadata?.productId as string;
            const price = (data.amount_total as number) / 100;
            const productType: ProductType = data.metadata?.type as ProductType;
            const userId = data.metadata?.userId as string;
            const invoiceId = data.invoice as string;
            const stripeCustomerId = data.customer as string;

            const purchase: Prisma.PurchaseCreateInput = {
              userId,
              stripeCustomerId,
              invoiceId,
              productId,
              price,
              productType,
            };
            await fullfillment(purchase);
          }
          break;
        case "payment_intent.payment_failed":
          data = event.data.object as Stripe.PaymentIntent;
          console.log(`❌ Payment failed: ${data.last_payment_error?.message}`);
          break;
        case "payment_intent.succeeded":
          data = event.data.object as Stripe.PaymentIntent;
          console.log(data);
          console.log(`💰 PaymentIntent status: ${data.status}`);
          break;
        case "customer.subscription.updated":
          data = event.data.object as Stripe.Subscription;
          console.log(`🔔 Subscription updated event`, data);

          // Update subscription status in database
          payload = {
            stripeSubscriptionId: data.id,
            stripeSubscriptionStatus: data.status,
            stripeCustomerId: data.customer as string,
            stripeCurrentPeriodEnd: new Date(data.current_period_end * 1000),
            stripePriceId: data.items.data[0].price.id,
          };
          result = await updateUserSubscription(payload);
          console.log(`🔔 Subscription updated result`, result);
          break;

        case "customer.subscription.deleted":
          data = event.data.object as Stripe.Subscription;
          console.log(`🔔 Subscription deleted event`, data);

          // Update subscription status in database
          payload = data.id as string;

          result = await deleteUserSubscription(payload);
          console.log(`🔔 Subscription deleted result`, result);
          break;
        default:
          throw new Error(`Unhandled event: ${event.type}`);
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Webhook handler failed" },
        { status: 500 }
      );
    }
  }
  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({ message: "Received" }, { status: 200 });
}
