import enrollmentService from "../services/enrollmentService.js";

export const enrollInCourse = async (req, res) => {
  const { id: courseId } = req.params;
  const { studentID, studentName } = req.body;

  if (!studentID || !studentName) {
    return res.status(400).json({ error: "Student ID and student name are required." });
  }

  try {
    const enrollment = await enrollmentService.enrollStudent(Number(courseId), studentID, studentName);
    res.status(201).json({ message: "Enrollment successful", enrollment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getEnrolledCourses = async (req, res) => {
  const studentId = parseInt(req.params.id);

  if (isNaN(studentId)) {
    return res.status(400).json({ error: 'Invalid student ID' });
  }

  try {
    const courses = await enrollmentService.getEnrolledCoursesForStudent(studentId);
    res.json(courses);
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
