/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Recording` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `startDate` to the `Stream` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "StripeUserSubscrition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "stripe_customer_id" TEXT,
    "stripe_subscription_id" TEXT,
    "stripe_price_id" TEXT,
    "stripe_current_period_end" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stream" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "startDate" DATETIME NOT NULL,
    "duration" INTEGER NOT NULL,
    "zoomLink" TEXT NOT NULL,
    "meetingId" TEXT NOT NULL,
    "meetingPassword" TEXT NOT NULL,
    "isAvailableForSubscribers" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL
);
INSERT INTO "new_Stream" ("createdAt", "description", "duration", "id", "imageUrl", "isAvailableForSubscribers", "isPublished", "meetingId", "meetingPassword", "price", "title", "updatedAt", "userId", "zoomLink") SELECT "createdAt", "description", "duration", "id", "imageUrl", "isAvailableForSubscribers", "isPublished", "meetingId", "meetingPassword", "price", "title", "updatedAt", "userId", "zoomLink" FROM "Stream";
DROP TABLE "Stream";
ALTER TABLE "new_Stream" RENAME TO "Stream";
CREATE UNIQUE INDEX "Stream_userId_key" ON "Stream"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "StripeUserSubscrition_userId_key" ON "StripeUserSubscrition"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "StripeUserSubscrition_stripe_customer_id_key" ON "StripeUserSubscrition"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "StripeUserSubscrition_stripe_subscription_id_key" ON "StripeUserSubscrition"("stripe_subscription_id");

-- CreateIndex
CREATE UNIQUE INDEX "StripeUserSubscrition_stripe_price_id_key" ON "StripeUserSubscrition"("stripe_price_id");

-- CreateIndex
CREATE UNIQUE INDEX "Recording_userId_key" ON "Recording"("userId");
