-- AlterTable
ALTER TABLE "Chore" ALTER COLUMN "dueDate" SET DEFAULT (now() + interval '1 day');

-- CreateTable
CREATE TABLE "HouseholdNeed" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" TEXT,
    "category" TEXT,
    "isPurchased" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "householdId" INTEGER NOT NULL,
    "addedById" INTEGER NOT NULL,
    "purchasedAt" TIMESTAMP(3),
    "purchasedById" INTEGER,

    CONSTRAINT "HouseholdNeed_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HouseholdNeed" ADD CONSTRAINT "HouseholdNeed_householdId_fkey" FOREIGN KEY ("householdId") REFERENCES "Household"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseholdNeed" ADD CONSTRAINT "HouseholdNeed_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseholdNeed" ADD CONSTRAINT "HouseholdNeed_purchasedById_fkey" FOREIGN KEY ("purchasedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
