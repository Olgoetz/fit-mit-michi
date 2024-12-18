import { Prisma } from "@prisma/client";
import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { log } from "./logger";
import { auth } from "@clerk/nextjs/server";

export const updateUserSubscription = async (
  payload: Prisma.StripeUserSubscriptionUpdateInput
) => {
  console.log("[DEBUG: updateSubscription]", payload);
  try {
    await prisma.stripeUserSubscription.update({
      where: {
        stripeCustomerId: payload.stripeCustomerId as string,
      },
      data: payload,
    });

    return { message: "Subscription updated successfully" };
  } catch (error) {
    console.error(error);
    return { message: "Error updating subscription", error };
  } finally {
    revalidatePath("/"); // Revalidate the home page
  }
};

/**
 * Delete subscription entry in the database
 *
 * @param subId - Subscription ID
 */
export const deleteUserSubscription = async (subId: string) => {
  console.log("[DEBUG: updateSubscription]", subId);
  try {
    await prisma.stripeUserSubscription.delete({
      where: {
        stripeSubscriptionId: subId as string,
      },
    });

    return { message: "Subscription successfully deleted" };
  } catch (error) {
    console.error(error);
    return { message: "Error deleting subscription", error };
  } finally {
    revalidatePath("/"); // Revalidate the home page
  }
};

/**
 * Create subscription entry in the database
 *
 * @param sub - Stripe subscription object
 */
export async function createUserSubscription(
  sub: Prisma.StripeUserSubscriptionCreateInput
) {
  //   log({
  //     level: "debug",
  //     filePath: "/lib/subscription.ts",
  //     message: "createUserSubscription",
  //     data: sub,
  //   });

  try {
    await prisma.stripeUserSubscription.create({
      data: sub,
    });
    return {
      message: "Subscription created successfully",
      status: "SUCCESS",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Failed to create subscription",
      status: "ERROR",
    };
  }
}
