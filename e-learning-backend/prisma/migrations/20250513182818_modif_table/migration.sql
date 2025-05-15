-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_studentID_fkey";

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
