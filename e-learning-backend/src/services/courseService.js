import courseRepository from "../repositories/courseRepository.js";

const addCourse = async (courseData) => {
    const {name, domain, description, startDate, endDate, price, availablePlaces, languages, professorId} = courseData;
    if (!name || !domain || !description || !startDate || !endDate || !price || !availablePlaces || !languages || !professorId) {
        throw new Error("All fields are required");
    }
    if (new Date(startDate) >= new Date(endDate)) {
        throw new Error("Start date must be before end date");
    }
    if (availablePlaces <= 0) {
        throw new Error("Available places must be greater than 0");
    }
    if (price <= 0) {
        throw new Error("Price must be greater than 0");
    }
    if (languages.length === 0) {
        throw new Error("At least one language is required");
    }

    const vacancies = availablePlaces;
    
    const course = await courseRepository.createCourse({
        name,
        domain,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        price,
        availablePlaces,
        vacancies,
        languages,
        professorId
    });

    return course;
};

const getAllCourses = async () => {
    return await courseRepository.getAllCourses();
  };

  const updateCourse = async (id, courseData) => {
    const {
      name,
      domain,
      description,
      startDate,
      endDate,
      price,
      availablePlaces,
      discount
    } = courseData;
  
    if (!name || !domain || !description || !startDate || !endDate || !price || !availablePlaces) {
      throw new Error("All fields are required.");
    }
  
    if (new Date(startDate) >= new Date(endDate)) {
      throw new Error("Start date must be before end date.");
    }
  
    if (availablePlaces <= 0 || price <= 0 || discount < 0) {
      throw new Error("Invalid numeric values.");
    }
  
    const currentEnrollments = await prisma.enrollment.count({
      where: { courseID: Number(id) }
    });
  
    const vacancies = availablePlaces - currentEnrollments;
    if (vacancies < 0) {
      throw new Error("Number of available places is less than current enrollments.");
    }
  
    return await courseRepository.updateCourse(id, {
      name,
      domain,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      price,
      availablePlaces,
      vacancies,
      discount
    });
  };
  
const deleteCourse = async (id) => {
    return await courseRepository.deleteCourse(id);
  };

  import prisma from "../config/db.js";
  import { format } from "date-fns";
  
  const getCoursesWithStudents = async (professorId) => {
    const courses = await prisma.course.findMany({
      where: {
        professorId,
      },
      include: {
        enrollments: true,
      },
    });
  
    return courses.map((course) => ({
      name: course.name,
      startDate: format(new Date(course.startDate), "yyyy-MM-dd"),
      endDate: course.endDate ? format(new Date(course.endDate), "yyyy-MM-dd") : null,
      students: course.enrollments.map((enrollment) => enrollment.studentName),
    }));
  };

  const getCourseStatsByProfessor = async (professorId) => {
    const courses = await prisma.course.findMany({
      where: { professorId },
      include: {
        enrollments: true, 
      },
    });
  
    return courses.map((course) => ({
      name: course.name,
      students: course.enrollments.length,
    }));
  };
  
export default {
    addCourse,
    getAllCourses,
    updateCourse,
    deleteCourse,
    getCoursesWithStudents,
    getCourseStatsByProfessor
};
