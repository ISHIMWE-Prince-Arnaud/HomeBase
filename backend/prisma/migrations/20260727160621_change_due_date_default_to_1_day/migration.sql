-- AlterTable
ALTER TABLE "Chore" ALTER COLUMN "dueDate" SET DEFAULT (now() + interval '1 day');
