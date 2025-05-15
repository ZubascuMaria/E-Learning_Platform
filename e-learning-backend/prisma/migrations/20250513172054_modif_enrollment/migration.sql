/*
  Warnings:

  - You are about to drop the column `isAgreed` on the `Enrollment` table. All the data in the column will be lost.
  - Added the required column `studentName` to the `Enrollment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Enrollment" DROP COLUMN "isAgreed",
ADD COLUMN     "studentName" TEXT NOT NULL;
