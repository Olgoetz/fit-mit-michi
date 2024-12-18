"use server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

import { Prisma } from "@prisma/client";

import { revalidatePath } from "next/cache";
const DAY_IN_MS = 24 * 60 * 60 * 1000;

export const checkUserSubscriptionStatus = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const userSubscription = await prisma.stripeUserSubscription.findUnique({
    where: {
      userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCustomerId: true,
      stripeSubscriptionStatus: true,
      stripeCurrentPeriodEnd: true,
    },
  });

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
    Date.now();

  return !!isValid;
};

export const isUserSubscribed = async () => {
  const { userId } = await auth();

  if (!userId) {
    return { success: false };
  }

  const userSubscription = await prisma.stripeUserSubscription.findUnique({
    where: {
      userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCustomerId: true,
      stripeSubscriptionStatus: true,
      stripeCurrentPeriodEnd: true,
    },
  });

  if (!userSubscription) {
    return { success: false };
  }

  const isValid =
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
    Date.now();

  return {
    success: userSubscription.stripeSubscriptionStatus === "active",
    stripeCustomerId: userSubscription.stripeCustomerId,
    validSubscription: !!isValid,
  };
};
