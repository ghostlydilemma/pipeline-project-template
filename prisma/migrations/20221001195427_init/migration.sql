-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DateRange" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "employeeId" TEXT NOT NULL,
    CONSTRAINT "DateRange_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DateRange" ("employeeId", "endDate", "id", "startDate") SELECT "employeeId", "endDate", "id", "startDate" FROM "DateRange";
DROP TABLE "DateRange";
ALTER TABLE "new_DateRange" RENAME TO "DateRange";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
