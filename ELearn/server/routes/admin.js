import express from "express"
import { addLecture, createCourse, deleteCourse, deleteLecture, getAllStats } from "../controllers/admin.js";
import { isAdmin, isAuth } from "../middleware/isAuth.js";
import { uploadFiles } from "../middleware/multer.js";


const router = express.Router();

//only admin can add the course

router.post('/course/new',isAuth,isAdmin,uploadFiles,createCourse);
router.post('/course/:id',isAuth,isAdmin,uploadFiles,addLecture);
router.delete('/deletecourse/:id',isAuth,isAdmin,deleteCourse);
router.delete("/deletelecture/:id",isAuth,isAdmin,deleteLecture);
router.get('/stats',isAuth,isAdmin,getAllStats);

export default router;