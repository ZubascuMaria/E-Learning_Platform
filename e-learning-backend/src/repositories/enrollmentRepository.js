import prisma from "../config/db.js";

const findEnrollment = async (courseID, studentID) => {
  return await prisma.enrollment.findUnique({
    where: {
      studentID_courseID: {
        studentID,
        courseID,
      },
    },
  });
};

const createEnrollment = async (courseID, studentID, studentName) => {
  return await prisma.enrollment.create({
    data: {
      studentID,
      courseID,
      studentName,
    },
  });
};

const getCoursesByStudentId = async (studentId) => {
  return await prisma.enrollment.findMany({
    where: { studentID: studentId },
    select: {
      course: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export default {
  findEnrollment,
  createEnrollment,
  getCoursesByStudentId,
};
