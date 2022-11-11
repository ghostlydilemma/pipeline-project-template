-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstname" TEXT NOT NULL,
    "middlename" TEXT,
    "lastname" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "dateOfBirth" DATETIME NOT NULL,
    "salary" REAL NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "departmentId" TEXT NOT NULL,
    CONSTRAINT "Employee_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("address", "dateOfBirth", "departmentId", "firstname", "id", "isActive", "lastname", "middlename", "salary") SELECT "address", "dateOfBirth", "departmentId", "firstname", "id", "isActive", "lastname", "middlename", "salary" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
