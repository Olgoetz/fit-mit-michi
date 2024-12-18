/*
  Warnings:

  - You are about to drop the column `recordingId` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `streamId` on the `Purchase` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Purchase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "stripeCustomerId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "productId" TEXT NOT NULL,
    "productType" TEXT NOT NULL
);
INSERT INTO "new_Purchase" ("createdAt", "id", "productId", "productType", "stripeCustomerId", "updatedAt", "userId") SELECT "createdAt", "id", "productId", "productType", "stripeCustomerId", "updatedAt", "userId" FROM "Purchase";
DROP TABLE "Purchase";
ALTER TABLE "new_Purchase" RENAME TO "Purchase";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
