import { Console, error, log } from "console";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
 
export const dbConnection=mongoose.connect(process.env.DATABASE).then(()=>{
    console.log(("database connected successfully"));
}).catch((err)=>{
    console.log({error: "error",Message: err.message});
})
////mongodb+srv://danialraafat951:SF0Ea8e5tptsSy8G@cluster0danny.1mmhwl5.mongodb.net/ecommerce