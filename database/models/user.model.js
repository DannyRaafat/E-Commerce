import mongoose, { Schema, model } from "mongoose";

const schema = new Schema({
    name:{ type: String},
    email:{type:String},
    password:{type:String},
    isBlocked:{type:Boolean,default:false},
    role:{type:String,enum:["admin","user"],default:"user"},
},{
    timestamps:true,    versionKey:false 
})
export const User =model("User",schema)