import courseService from "../services/courseService.js";

export const createCourse = async (req, res) => {
    const { name, domain, description, startDate, endDate, price, availablePlaces, languages, professorId } = req.body;

    try {
        const course = await courseService.addCourse({
            name,
            domain,
            description,
            startDate,
            endDate,
            price,
            availablePlaces,
            languages,
            professorId
        });
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllCourses = async (req, res) => {
    try {
        const courses = await courseService.getAllCourses();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const editCourse = async (req, res) => {
    const { id } = req.params;
  
    try {
      const updatedCourse = await courseService.updateCourse(id, req.body);
      res.status(200).json(updatedCourse);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

export const deleteCourse = async (req, res) => {
    const { id } = req.params;
  
    try {
      await courseService.deleteCourse(id);
      res.status(200).json({ message: "Course deleted successfully." });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }; 

  export const getCoursesWithStudentsByProfessor = async (req, res) => {
    const { id: professorId } = req.params;
  
    try {
      const courses = await courseService.getCoursesWithStudents(Number(professorId));
      res.status(200).json(courses);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  export const getCourseStatistics = async (req, res) => {
    const { id: professorId } = req.params;
  
    try {
      const stats = await courseService.getCourseStatsByProfessor(Number(professorId));
      res.status(200).json(stats);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
