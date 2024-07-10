import mongoose, { Schema, Types, model } from "mongoose";
 ;

const schema = new Schema({
    name:{ type: String, unique:[true,"Category name already exist"],trim:true,minLength:[3,"Category name must be at least 3 characters long"]},
    slug:{type:String,lowercase:true,},
    image:{type:String},
    createdBy:{ type: Types.ObjectId, ref: "User" },


},{
    timestamps:true,    versionKey:false
})
export const Category =model("Category",schema)