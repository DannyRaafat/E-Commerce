 
import mongoose, { Schema, Types, model } from "mongoose";

const schema = new Schema({
code:{ type: String, unique:[true,"Coupon code already exist"],trim:true,required:true},
discount:{type:Number,required:true,min:0,max:100},
expires:{type:String,required:true},
createdBy:{ type: Types.ObjectId, ref: "User", required: true },

},{
    timestamps:true,    versionKey:false
})
export const Coupon =model("Coupon",schema)  