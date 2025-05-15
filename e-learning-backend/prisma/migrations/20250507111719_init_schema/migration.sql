/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Course` table. All the data in the column will be lost.
  - Added the required column `availablePlaces` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `domain` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vacancies` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "createdAt",
DROP COLUMN "duration",
DROP COLUMN "title",
DROP COLUMN "updatedAt",
ADD COLUMN     "availablePlaces" INTEGER NOT NULL,
ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "domain" TEXT NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "vacancies" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" SERIAL NOT NULL,
    "studentID" INTEGER NOT NULL,
    "courseID" INTEGER NOT NULL,
    "isAgreed" BOOLEAN NOT NULL,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Languages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course_Language" (
    "id" SERIAL NOT NULL,
    "languageID" INTEGER NOT NULL,
    "courseID" INTEGER NOT NULL,

    CONSTRAINT "Course_Language_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_studentID_courseID_key" ON "Enrollment"("studentID", "courseID");

-- CreateIndex
CREATE UNIQUE INDEX "Course_Language_languageID_courseID_key" ON "Course_Language"("languageID", "courseID");

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course_Language" ADD CONSTRAINT "Course_Language_languageID_fkey" FOREIGN KEY ("languageID") REFERENCES "Languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course_Language" ADD CONSTRAINT "Course_Language_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
