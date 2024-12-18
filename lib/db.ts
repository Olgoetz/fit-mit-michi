import { Customer } from "@/types";
import prisma from "./prisma";
import { Prisma, StripeUserSubscription } from "@prisma/client";
import stripe from "./stripe";
import Stripe from "stripe";

/**
 * Create a new customer n database
 *
 * @param customer - The customer object to be created
 */
export async function createCustomer(customer: Customer) {
  console.log(customer);
  try {
    await prisma.customer.create({
      data: customer,
    });
    return {
      message: "Customer created successfully",
      status: "SUCCESS",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Failed to create customer",
      status: "ERROR",
    };
  }
}

/**
 * Get a customer from database by email
 *
 * @param customer - The customer object
 */

export async function getCustomerByEmail(email: string) {
  try {
    const customer = await prisma.customer.findUnique({
      where: {
        email,
      },
    });
    return customer;
  } catch (error) {
    console.log(error);
    return null;
  }
}

/**
 * Get a customer from database by id
 *
 * @param customer - The customer object
 */

export async function getCustomerById(userId: string) {
  console.log("[INFO: db.ts] userId is", userId);
  try {
    const customer = await prisma.customer.findUnique({
      where: {
        userId,
      },
    });
    return customer;
  } catch (error) {
    console.log(error);
    return null;
  }
}

/**
 * Create a purchase entry in the database
 *
 * @param purchase - The purchase object
 */

export async function createPurchase(purchase: Prisma.PurchaseCreateInput) {
  console.log("[INFO: db.ts] purchase:", purchase);
  try {
    await prisma.purchase.create({
      data: purchase,
    });
    return {
      message: "Purchase created successfully",
      purchase,
      status: "SUCCESS",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Failed to create purchase",
      status: "ERROR",
    };
  }
}

/**
 * Retrieve subscription from invoice id
 * @param invoiceId
 * @returns {string} subscription
 */
export async function getSubscriptionFromInvoiceId(
  invoiceId: string
): Promise<Stripe.Subscription> {
  const subId = await stripe.invoices.retrieve(invoiceId);
  const sub = await stripe.subscriptions.retrieve(subId.subscription as string);

  return sub;
}
