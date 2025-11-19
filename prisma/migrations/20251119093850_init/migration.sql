-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_householdId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "householdId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_householdId_fkey" FOREIGN KEY ("householdId") REFERENCES "Household"("id") ON DELETE SET NULL ON UPDATE CASCADE;
