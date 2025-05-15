import express from "express";
import {
  createCourse,
  getAllCourses,
  editCourse,
  deleteCourse,
  getCoursesWithStudentsByProfessor,
  getCourseStatistics,
} from "../controllers/courseController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyRole } from "../middlewares/verifyRole.js";
import Roles from "../utils/roles.js";

const router = express.Router();

router.post("/create",verifyToken, verifyRole(Roles.PROFESSOR), createCourse);
router.get("/", verifyToken, getAllCourses);
router.put("/edit/:id", verifyToken, verifyRole(Roles.PROFESSOR), editCourse);
router.delete("/delete/:id",verifyToken, verifyRole(Roles.PROFESSOR), deleteCourse);
router.get(
  "/professor/:id/courses-with-students", verifyToken,
  getCoursesWithStudentsByProfessor
); // id = professorId
router.get("/professor/:id/statistics",verifyToken, verifyRole(Roles.PROFESSOR), getCourseStatistics);

export default router;
