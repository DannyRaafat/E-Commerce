import mongoose, { Schema, Types, model } from "mongoose";


const schema = new Schema({
   comment:{type:String,required:true},
   user:{ type: Types.ObjectId, ref: "User", required: true },
   product:{ type: Types.ObjectId, ref: "Product", required: true },
   rate:{type:Number,required:true,min:0,max:5},

},{
    timestamps:true,    versionKey:false
})
export const Review =model("Review",schema)  