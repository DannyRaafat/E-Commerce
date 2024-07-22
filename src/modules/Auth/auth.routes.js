import { Router } from "express";
import { changepassword, signin, signup } from "./auth.controller.js";
import { checkemail } from "../../middleware/checkemail.js";


const authRouter = Router();

 authRouter.post("/signup",checkemail,signup)
 authRouter.post("/signin",signin)
authRouter.patch("/changepassword",changepassword)
 


  


export default authRouter