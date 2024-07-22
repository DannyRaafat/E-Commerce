import { User } from "../../../database/models/user.model.js";
import { catcherror } from "../../middleware/catcherror.js";
import jwt from "jsonwebtoken"
import { errorhandle } from "../../utils/errorhandle.js";
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()



const signup = catcherror(async (req, res) => {
   let user= new User(req.body)
   await user.save()
   let token=jwt.sign({userId:user._id,role:user.role},"test")  
   res.json({message:"success",token})
})

const signin = catcherror(async (req, res,next) => {
    let user= await  User.findOne({email:req.body.email})
    if(user&&bcrypt.compareSync(req.body.password,user.password)){
        let token=jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET)
        return res.json({message:"success",token})
    }
    next(new errorhandle("invalid email or password",401))
    res.json(user);
 })

 const changepassword = catcherror(async (req, res) => {
    let user = await User.findOne({ email: req.body.email })
    if(user&&bcrypt.compareSync(req.body.oldPassword,user.password)){
    let user = await User.findOneAndUpdate({ email: req.body.email }, { password: req.body.newPassword ,passwordChangedAt:Date.now() })

        let token=jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET)
        return res.json({message:"success",token})
    }
    user.password = bcrypt.hashSync(req.body.password, 10)
    await user.save()
    res.send(user)
 })

 const protectedRoutes = catcherror(async (req, res,next) => {
    let {token} = req.headers
    let userPayload=null
    if(!token){
        return next (new errorhandle("please provide token",401))
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
        if(err){
            return next (new errorhandle(err,401))
        }
        userPayload=decode
    })      
    let user= await User.findById(userPayload.userId)
    if(!user){
        return next (new errorhandle("user not found",401))
    }
    if(user.passwordChangedAt){
        
    let time =parseInt(user.passwordChangedAt.getTime()/1000)
        if(time>userPayload.iat){
        return next (new errorhandle("invalid token....login again",401))
    } 
    }
  req.user=user
  next() 
 })

 const allowedTo=(...roles)=>{
    return catcherror(async(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new errorhandle("you are not allowed",403))
        }
        next()
 })}
export { signup, signin ,changepassword ,protectedRoutes,allowedTo}