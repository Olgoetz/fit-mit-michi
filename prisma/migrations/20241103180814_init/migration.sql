-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Recording" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "duration" INTEGER NOT NULL,
    "isAvailableForSubscribers" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT
);
INSERT INTO "new_Recording" ("createdAt", "description", "duration", "id", "imageUrl", "isAvailableForSubscribers", "isPublished", "price", "title", "updatedAt", "userId") SELECT "createdAt", "description", "duration", "id", "imageUrl", "isAvailableForSubscribers", "isPublished", "price", "title", "updatedAt", "userId" FROM "Recording";
DROP TABLE "Recording";
ALTER TABLE "new_Recording" RENAME TO "Recording";
CREATE UNIQUE INDEX "Recording_userId_key" ON "Recording"("userId");
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
    "userId" TEXT
);
INSERT INTO "new_Stream" ("createdAt", "description", "duration", "id", "imageUrl", "isAvailableForSubscribers", "isPublished", "meetingId", "meetingPassword", "price", "startDate", "title", "updatedAt", "userId", "zoomLink") SELECT "createdAt", "description", "duration", "id", "imageUrl", "isAvailableForSubscribers", "isPublished", "meetingId", "meetingPassword", "price", "startDate", "title", "updatedAt", "userId", "zoomLink" FROM "Stream";
DROP TABLE "Stream";
ALTER TABLE "new_Stream" RENAME TO "Stream";
CREATE UNIQUE INDEX "Stream_userId_key" ON "Stream"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
