/*
  Warnings:

  - Added the required column `productId` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productType` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Purchase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "recordingId" TEXT,
    "streamId" TEXT,
    "stripeCustomerId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "productId" TEXT NOT NULL,
    "productType" TEXT NOT NULL
);
INSERT INTO "new_Purchase" ("createdAt", "id", "recordingId", "streamId", "stripeCustomerId", "updatedAt", "userId") SELECT "createdAt", "id", "recordingId", "streamId", "stripeCustomerId", "updatedAt", "userId" FROM "Purchase";
DROP TABLE "Purchase";
ALTER TABLE "new_Purchase" RENAME TO "Purchase";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
