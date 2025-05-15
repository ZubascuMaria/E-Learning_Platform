-- DropForeignKey
ALTER TABLE "Course_Language" DROP CONSTRAINT "Course_Language_courseID_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_courseID_fkey";

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course_Language" ADD CONSTRAINT "Course_Language_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
