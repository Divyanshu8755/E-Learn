import jwt from 'jsonwebtoken'
import { User } from '../models/User.js';

export const isAuth = async(req,res,next) => {
    try{
        const token=req.headers.token;
        if(!token){
            return res.status(403).json({ // unauthorized code
                message:"please login"
            })
        }
        const decodedData = jwt.verify(token,process.env.Jwt_Sec);
        req.user=await User.findById(decodedData._id);
        next(); // to escape from this function
    }catch(error){
        res.status(500).json({
            message:"Login First Please"
        })
    }
};

export const isAdmin = (req,res,next)=>{
    try{
        if(req.user.role !== "admin") return res.status(403).json({
            message:"Sorry you are not an admin"
        })
        next();
    }catch(err){
        res.status(500).json({
            message:err.message,
        })
    }
}