-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Purchase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "invoiceId" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "stripeCustomerId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "productId" TEXT NOT NULL,
    "productType" TEXT NOT NULL
);
INSERT INTO "new_Purchase" ("createdAt", "id", "invoiceId", "price", "productId", "productType", "stripeCustomerId", "updatedAt", "userId") SELECT "createdAt", "id", "invoiceId", "price", "productId", "productType", "stripeCustomerId", "updatedAt", "userId" FROM "Purchase";
DROP TABLE "Purchase";
ALTER TABLE "new_Purchase" RENAME TO "Purchase";
CREATE UNIQUE INDEX "Purchase_invoiceId_key" ON "Purchase"("invoiceId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
