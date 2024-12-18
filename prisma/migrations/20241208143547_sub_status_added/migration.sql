/*
  Warnings:

  - You are about to drop the column `stripeSubscriptionStatus` on the `StripeUserSubscription` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StripeUserSubscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "stripePriceId" TEXT,
    "stripeCurrentPeriodEnd" DATETIME,
    "stripeStatus" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_StripeUserSubscription" ("createdAt", "id", "stripeCurrentPeriodEnd", "stripeCustomerId", "stripePriceId", "stripeSubscriptionId", "updatedAt", "userId") SELECT "createdAt", "id", "stripeCurrentPeriodEnd", "stripeCustomerId", "stripePriceId", "stripeSubscriptionId", "updatedAt", "userId" FROM "StripeUserSubscription";
DROP TABLE "StripeUserSubscription";
ALTER TABLE "new_StripeUserSubscription" RENAME TO "StripeUserSubscription";
CREATE UNIQUE INDEX "StripeUserSubscription_userId_key" ON "StripeUserSubscription"("userId");
CREATE UNIQUE INDEX "StripeUserSubscription_stripeCustomerId_key" ON "StripeUserSubscription"("stripeCustomerId");
CREATE UNIQUE INDEX "StripeUserSubscription_stripeSubscriptionId_key" ON "StripeUserSubscription"("stripeSubscriptionId");
CREATE UNIQUE INDEX "StripeUserSubscription_stripePriceId_key" ON "StripeUserSubscription"("stripePriceId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
