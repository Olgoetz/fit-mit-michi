/*
  Warnings:

  - Added the required column `meetingId` to the `Stream` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meetingPassword` to the `Stream` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stream" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "duration" INTEGER NOT NULL,
    "zoomLink" TEXT NOT NULL,
    "meetingId" TEXT NOT NULL,
    "meetingPassword" TEXT NOT NULL,
    "isAvailableForSubscribers" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Stream_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Stream" ("createdAt", "description", "duration", "id", "imageUrl", "isAvailableForSubscribers", "isPublished", "price", "title", "updatedAt", "userId", "zoomLink") SELECT "createdAt", "description", "duration", "id", "imageUrl", "isAvailableForSubscribers", "isPublished", "price", "title", "updatedAt", "userId", "zoomLink" FROM "Stream";
DROP TABLE "Stream";
ALTER TABLE "new_Stream" RENAME TO "Stream";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
