// prisma/seed.js
import prisma from '../src/config/db.js';

// Populăm tabelele
const main = async () => {
  // Populare User
  const user1 = await prisma.user.create({
    data: {
      email: "john.doe@example.com",
      password: "password123",
      role: "student",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "jane.doe@example.com",
      password: "password456",
      role: "teacher",
    },
  });

  // Populare Course
  const course1 = await prisma.course.create({
    data: {
      name: "Machine Learning",
      domain: "AI",
      description: "Introduction to Machine Learning concepts.",
      startDate: new Date(),
      endDate: new Date(),
      price: 150.0,
      discount: 10.0,
      availablePlaces: 30,
      vacancies: 5,
    },
  });

  const course2 = await prisma.course.create({
    data: {
      name: "Web Development",
      domain: "Programming",
      description: "Learn how to build websites with HTML, CSS, and JavaScript.",
      startDate: new Date(),
      endDate: new Date(),
      price: 120.0,
      discount: 15.0,
      availablePlaces: 25,
      vacancies: 10,
    },
  });

  // Populare Languages
  const language1 = await prisma.languages.create({
    data: {
      name: "English",
    },
  });

  const language2 = await prisma.languages.create({
    data: {
      name: "French",
    },
  });

  // Populare Many-to-Many între Curs și Limbi
  await prisma.course_Language.create({
    data: {
      languageID: language1.id,
      courseID: course1.id,
    },
  });

  await prisma.course_Language.create({
    data: {
      languageID: language2.id,
      courseID: course2.id,
    },
  });

  // Populare Enrollment (Inscriere la curs)
  await prisma.enrollment.create({
    data: {
      studentID: user1.id,
      courseID: course1.id,
      isAgreed: true,
    },
  });

  await prisma.enrollment.create({
    data: {
      studentID: user1.id,
      courseID: course2.id,
      isAgreed: true,
    },
  });

  console.log("Seed-ul a fost efectuat cu succes!");
};

// Rulăm seed-ul și prindem erorile dacă există
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
