import TryCatch from "../middleware/TryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import {rm} from "fs";
import fs from "fs"
import {promisify} from 'util'
import { User } from "../models/User.js";

export const createCourse = TryCatch(async(req,res)=>{
    const{title,description,category,createdBy,duration,price} = req.body;
    const image=req.file;
    await Courses.create({
        title,
        description,
        category,
        createdBy,
        image : image?.path,
        duration,
        price,
    });

    res.status(201).json({
        message:"course created successfully"
    })
})

export const addLecture = TryCatch(async(req,res)=>{
    const course = await Courses.findById(req.params.id);

    if(!course){
        return res.status(404).json({
            message:"No Course with this id"
        });
    }
    const {title,description} = req.body;

    const file=req.file;

    const lecture = await Lecture.create({
        title,
        description,
        video : file?.path,
        course: course._id,
    })

    res.status(201).json({
        message:"Lecture Added",
        lecture,
    })
})

export const deleteLecture = TryCatch(async(req,res)=>{
    const lecture = await Lecture.findById(req.params.id);
    
    rm(lecture.video,()=>{
        console.log("video deleted");
    })
    await lecture.deleteOne();

    res.json({message : "Lecture Deleted"})
})

const unlinkAsync = promisify(fs.unlink);

export const deleteCourse = TryCatch(async(req,res)=>{

    //1). delete all lectures
    //2). delete lecture from database
    //3). course thumbnail is deleted
    //4). course deleted from database
    //5). course removed from user's subscription array

    const course = await Courses.findById(req.params.id);

    const lectures = await Lecture.find({course:course._id});

    await Promise.all( //deleting videos
        lectures.map(async(lecture)=>{
            await unlinkAsync(lecture.video);
            console.log("video deleted")
        })
    )

    rm(course.image,()=>{ //deleting thumbnail
        console.log("image deleted");
    })

    await Lecture.find({course:req.params.id}).deleteMany();
    await Courses.deleteOne();
    await User.updateMany({},{$pull:{subscription:req.params.id}});

    res.json({
        message:"Course deleted"
    })
})

export const getAllStats = TryCatch(async(req,res)=>{
    const totalCourses = (await Courses.find()).length;
    const totalLectures = (await Lecture.find()).length;
    const totalUsers = (await User.find()).length;

    const stats = { //stats object
        totalCourses,
        totalLectures,
        totalUsers
    };

    res.json({
        stats,
    })
})
