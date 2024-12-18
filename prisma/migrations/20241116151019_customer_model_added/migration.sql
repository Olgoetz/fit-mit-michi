/*
  Warnings:

  - You are about to drop the `StripeUserSubscrition` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "StripeUserSubscrition";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "StripeUserSubscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "stripe_customer_id" TEXT,
    "stripe_subscription_id" TEXT,
    "stripe_price_id" TEXT,
    "stripe_current_period_end" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "StripeUserSubscription_userId_key" ON "StripeUserSubscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "StripeUserSubscription_stripe_customer_id_key" ON "StripeUserSubscription"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "StripeUserSubscription_stripe_subscription_id_key" ON "StripeUserSubscription"("stripe_subscription_id");

-- CreateIndex
CREATE UNIQUE INDEX "StripeUserSubscription_stripe_price_id_key" ON "StripeUserSubscription"("stripe_price_id");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_userId_key" ON "Customer"("userId");
