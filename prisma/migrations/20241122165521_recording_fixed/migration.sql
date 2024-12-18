/*
  Warnings:

  - Made the column `imageUrl` on table `Recording` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Recording" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "videoUrl" TEXT,
    "price" REAL NOT NULL,
    "duration" INTEGER NOT NULL,
    "isAvailableForSubscribers" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT
);
INSERT INTO "new_Recording" ("createdAt", "description", "duration", "id", "imageUrl", "isAvailableForSubscribers", "isPublished", "price", "title", "updatedAt", "userId", "videoUrl") SELECT "createdAt", "description", "duration", "id", "imageUrl", "isAvailableForSubscribers", "isPublished", "price", "title", "updatedAt", "userId", "videoUrl" FROM "Recording";
DROP TABLE "Recording";
ALTER TABLE "new_Recording" RENAME TO "Recording";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
