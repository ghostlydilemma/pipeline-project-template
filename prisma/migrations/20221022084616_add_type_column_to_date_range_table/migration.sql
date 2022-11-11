/*
  Warnings:

  - Added the required column `type` to the `DateRange` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DateRange" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "employeeId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    CONSTRAINT "DateRange_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DateRange" ("employeeId", "endDate", "id", "startDate", "type") SELECT "employeeId", "endDate", "id", "startDate", 'employment' FROM "DateRange";
DROP TABLE "DateRange";
ALTER TABLE "new_DateRange" RENAME TO "DateRange";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
