import { Console, error, log } from "console";
import mongoose from "mongoose";
 
 
export const dbConnection=mongoose.connect("mongodb://localhost:27017/Ecommerce").then(()=>{
    console.log(("database connected successfully"));
}).catch((err)=>{
    console.log({error: "error",Message: err.message});
})