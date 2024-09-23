import TryCatch from "../middleware/TryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import { User } from "../models/User.js";

export const getAllcourses = TryCatch(async(req,res)=>{
    const courses=await Courses.find()
    
    res.json({
        courses,
        message:"All courses accessed successfully"
    });
    
})
export const getSingleCourse = TryCatch(async(req,res)=>{
    const course = await Courses.findById(req.params.id);
    res.json({
        course,
        message:"Single course accessed successfully"
    })
})

export const fetchLectures = TryCatch(async(req,res)=>{
    const lectures = await Lecture.find({course:req.params.id})
    const user = await User.findById(req.user._id);
    if(user.role == "admin"){
        return res.json({lectures});
    }
    if(!user.subscription.includes(req.params.id)){
        return res.status(400).json({message : "You have not subscibed to this course"})
    }
    res.json({lectures});
})

export const fetchLecture = TryCatch(async(req,res)=>{
    const lecture = await Lecture.findById(req.params.id);
    const user = await User.findById(req.user._id);
    if(user.role == "admin"){
        return res.json({lecture});
    }
    if(!user.subscription.includes(lecture.course)){
        return res.status(400).json({message : "You have not subscibed to this course"})
    }
    res.json({lecture});
})

//subscribed courses
export const getMyCourses = TryCatch(async(req,res)=>{
    const courses = await Courses.find({_id:req.user.subscription});
    res.json({
        courses,
    })
})

// export const checkout = TryCatch(async (req, res) => {
//     const user = await User.findById(req.user._id);
//     const course = await Courses.findById(req.params.id);
  
//     if (!user || !course) {
//       return res.status(404).json({
//         message: "User or Course not found",
//       });
//     }
  
//     if (user.subscription.includes(course._id)) {
//       return res.status(400).json({
//         message: "You already have this course",
//       });
//     }
  
//     // Add the course to the user's subscription
//     user.subscription.push(course._id);
//     await user.save();
  
//     res.status(201).json({
//       message: "Course purchased successfully",
//       course,
//     });
//   });
  

export const purchaseCourse = async (req, res) => {
    try {
        const userId = req.user._id;
        const courseId = req.params.id;

        const user = await User.findById(userId);
        const course = await Courses.findById(courseId);

        if (!user || !course) {
            return res.status(404).json({ message: "User or course not found" });
        }

        // Check if the user already has this course
        if (user.subscription.includes(courseId)) {
            return res.status(400).json({ message: "You already have this course" });
        }

        // Add course to user's subscription
        user.subscription.push(courseId);
        await user.save();

        res.status(200).json({ message: "Course purchased successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
