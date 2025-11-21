-- AlterTable
ALTER TABLE "Chore" ALTER COLUMN "dueDate" SET DEFAULT (now() + interval '1 day');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileImage" TEXT NOT NULL DEFAULT 'https://avatar.iran.liara.run/public/1';
