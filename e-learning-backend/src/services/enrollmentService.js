import enrollmentRepository from "../repositories/enrollmentRepository.js";
import courseRepository from "../repositories/courseRepository.js";

const enrollStudent = async (courseID, studentID, studentName) => {
    const alreadyEnrolled = await enrollmentRepository.findEnrollment(courseID, studentID);
    if (alreadyEnrolled) {
      throw new Error("Student is already enrolled in this course.");
    }
  
    const enrollment = await enrollmentRepository.createEnrollment(courseID, studentID, studentName);
  
    await courseRepository.decreaseVacancy(courseID);
  
    return enrollment;
  };

const getEnrolledCoursesForStudent = async (studentId) => {
  const enrollments = await enrollmentRepository.getCoursesByStudentId(studentId);
  return enrollments.map(e => e.course);
};

export default {
  enrollStudent,
  getEnrolledCoursesForStudent
};
