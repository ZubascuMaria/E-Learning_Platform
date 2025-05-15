import express from "express";
import { enrollInCourse, getEnrolledCourses } from "../controllers/enrollmentController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/enroll-course/:id", verifyToken, enrollInCourse); // id = courseId
router.get("/student/:id",verifyToken, getEnrolledCourses); // id = studentId

export default router;
