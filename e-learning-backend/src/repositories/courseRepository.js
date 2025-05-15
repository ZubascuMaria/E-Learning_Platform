import prisma from '../config/db.js';

const createCourse = async (courseData) => {
    const {
      name,
      domain,
      description,
      startDate,
      endDate,
      price,
      availablePlaces,
      vacancies,
      professorId,
      languages // ["EN", "RO"]
    } = courseData;
  
    return await prisma.course.create({
      data: {
        name,
        domain,
        description,
        startDate,
        endDate,
        price,
        availablePlaces,
        vacancies,
        professorId,
        languages: {
          create: languages.map((lang) => ({
            language: {
              connectOrCreate: {
                where: { name: lang },
                create: { name: lang }
              }
            }
          }))
        }
      }
    });
  };
  
  const getAllCourses = async () => {
    const courses = await prisma.course.findMany({
      include: {
        languages: {
          include: {
            language: true
          }
        }
      }
    });

    return courses.map(course => ({
        ...course,
        startDate: new Date(course.startDate).toISOString().slice(0, 10), // yyyy-mm-dd
        endDate: course.endDate
          ? new Date(course.endDate).toISOString().slice(0, 10)
          : null,
        languages: course.languages.map(l => l.language.name)
      }));
};

const updateCourse = async (id, updatedData) => {
    return await prisma.course.update({
      where: { id: Number(id) },
      data: updatedData,
    });
  };

const deleteCourse = async (id) => {
    return await prisma.course.delete({
      where: { id: Number(id) },
    });
};

const decreaseVacancy = async (courseID) => {
  return await prisma.course.update({
    where: { id: courseID },
    data: {
      vacancies: {
        decrement: 1
      }
    }
  });
};


export default {
    createCourse,
    getAllCourses,
    updateCourse,
    deleteCourse,
    decreaseVacancy
};
