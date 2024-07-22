import { Router } from "express";
import { adduser, allusers, deleteuser, getuser, updateuser } from "./User.controller.js";
import { checkemail } from "../../middleware/checkemail.js";
 


const userRouter = Router();

userRouter.route("/").post(checkemail,adduser).get(allusers)
userRouter.route("/:id").get(getuser).put(checkemail,updateuser).delete(deleteuser)


  


export default userRouter