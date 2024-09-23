import { User } from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import sendMail from "../middleware/sendMail.js";
import TryCatch from "../middleware/TryCatch.js";


export const register = TryCatch(async(req,res) => {
    const {email,name,password}=req.body;
        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({
                message: "User Already exists",
            });
        }

        const hashPassword = await bcrypt.hash(password,10); //(password,salt)
        user = new User({ name, email, password: hashPassword });
        
        const otp = Math.floor(Math.random()*1000000) //for six digit otp

        const activationToken = jwt.sign(
            {
                user,
                otp,
            },
            process.env.Activation_Secret,
            {
                expiresIn:"5m"
            }
        );

        const data = {
            name,
            otp,
        };
    
        await sendMail(
            email,
            "E Learn",
            data
        )

        res.status(200).json({
            message: "Otp send to your mail",
            activationToken,
            otp
        })
})

export const VerifyUser = TryCatch(async(req,res)=>{
    const {otp,activationToken}=req.body;
    const verify=jwt.verify(activationToken,process.env.Activation_Secret)
    if(!verify){
        return res.status(400).json({
            message:"otp expired",
        });
    }
    if(verify.otp !== otp){
        return res.status(400).json({
            message: "Wrong Otp",
        })
    }

    await User.create({
        name:verify.user.name,
        email:verify.user.email,
        password:verify.user.password,
    })

    res.json({
        message : "User Registered"
    })
});

export const loginUser = TryCatch(async(req,res)=>{
    const {email,password}=req.body;

    const user = await User.findOne({email});

    if(!user) return res.status(400).json({
        message:"No user with this email",
    })

    const matchPass=await bcrypt.compare(password,user.password);

    if(!matchPass) return res.status(400).json({
        message:"wrong password"
    });

    const token = jwt.sign({_id : user._id},process.env.Jwt_Sec,{
        expiresIn : "15d",
    });

    res.json({
        message: `Welcome Back ${user.name}`,
        token,
        user,
    })
});


// to fetch my profile

export const myProfile = TryCatch(async(req,res)=>{
    const user = await User.findById(req.user._id);
    res.json({user});
})