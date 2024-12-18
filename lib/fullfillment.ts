import { Prisma } from "@prisma/client";
import { createPurchase, getSubscriptionFromInvoiceId } from "./db";
import { getProductById } from "./utils";
import { getStreamById } from "./actions/stream.actions";
import stripe from "./stripe";
import Stripe from "stripe";
import { resend } from "./resend";
import BookingStreamTemplate from "@/emails/BookingStreamTemplate";
import BookingRecordingTemplate from "@/emails/BookingRecordingTemplate";
import { getRecordingById } from "./actions/recording.actions";
import { use } from "react";
import { sub } from "date-fns";
import { createUserSubscription } from "./subscription";

export async function fullfillment(purchase: Prisma.PurchaseCreateInput) {
  ///// 1. Create a purchase entry in the database
  const result = await createPurchase(purchase);
  if (result.status === "ERROR") {
    throw new Error("Failed to create purchase");
  }

  ///// 2. Send a confirmation email to the user

  /// Get product details
  const { productType, productId, invoiceId } = purchase;

  // Get invoice pdf
  const { hosted_invoice_url, customer_name, customer_email } =
    await getInvoiceById(invoiceId);

  let email;

  if (productType === "subscription") {
    console.log("[INFO: fullfillment.ts] Subscription purchase");

    // Update subscription status in database
    const subscription = await getSubscriptionFromInvoiceId(invoiceId);
    console.log("[INFO: fullfillment.ts] Subscription:", subscription);
    const payload = {
      userId: purchase.userId as string,
      stripeSubscriptionId: subscription.id as string,
      stripeCustomerId: purchase.stripeCustomerId as string,
      stripeSubscriptionStatus: subscription.status,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
      stripePriceId: subscription.items.data[0].price.id,
    };
    console.log("[DEBUG: fullfillment.ts] payload:", payload);
    const result = await createUserSubscription(payload);
    if (result.status === "ERROR") {
      throw new Error("Failed to create subscription");
    }
    console.log("[INFO: fullfillment.ts] Subscription created successfully");
    email = "Subscription email template";
  }

  if (productType === "recording") {
    // Configure email for recording
    const recording = await getRecordingById(productId);
    email = BookingRecordingTemplate({
      invoiceUrl: hosted_invoice_url as string,
      recording,
      customer: customer_name as string,
    });
  }

  if (productType === "stream") {
    // Configure email for stream
    const stream = await getStreamById(productId);
    email = BookingStreamTemplate({
      invoiceUrl: hosted_invoice_url as string,
      stream,
      customer: customer_name as string,
    });
  }

  console.log("[INFO: fullfillment.ts] Sending mail...");
  try {
    await resend.emails.send({
      from: `M. Süßbauer <${process.env.RESEND_FROM_EMAIL}>`,
      to: customer_email as string,
      bcc: process.env.BCC_EMAIL,
      subject: "Buchungsbestätigung",
      react: email,
    });
  } catch (error) {
    console.log("[ERROR: fullfillment.ts] Failed to send email");
    console.log(error);
  }
}

async function getInvoiceById(invoiceId: string) {
  // Get invoice from stripe
  const invoice: Stripe.Invoice = await stripe.invoices.retrieve(invoiceId);
  return invoice;
}
