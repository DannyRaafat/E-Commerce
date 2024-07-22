import mongoose, { Schema, Types, model } from "mongoose";


const schema = new Schema({
   comment:{type:String},
   user:{ type: Types.ObjectId, ref: "User"},
   product:{ type: Types.ObjectId, ref: "Product" },
   rate:{type:Number,min:0,max:5},

},{
    timestamps:true,    versionKey:false
})

schema.pre(/^find/,function(next){
    this.populate("user","name");
    next();
})

 
export const Review =model("Review",schema)  