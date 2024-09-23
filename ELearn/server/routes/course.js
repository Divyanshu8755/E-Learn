import express from "express"
import { fetchLecture, fetchLectures, getAllcourses, getSingleCourse, purchaseCourse } from "../controllers/course.js";
import { isAuth } from "../middleware/isAuth.js";
import { getMyCourses } from "../controllers/course.js";

const router = express.Router();

router.get("/course/all",getAllcourses)
router.get("/course/:id",getSingleCourse)
router.get("/lectures/:id",isAuth,fetchLectures)
router.get("/singlelecture/:id",isAuth,fetchLecture)
router.get("/mycourse",isAuth,getMyCourses)
router.post("/course/purchase/:id",isAuth,purchaseCourse);
export default router;