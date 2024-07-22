import mongoose, { Schema, Types, model } from "mongoose";
 import bcrypt from "bcrypt"
const schema = new Schema({
    name:{ type: String},
    email:{type:String},
    password:{type:String},
    isBlocked:{type:Boolean,default:false},
    role:{type:String,enum:["admin","user"],default:"user"},
    passwordChangedAt:{type:Date},
    wishlist:[{ type: Types.ObjectId, ref: "Product" }],
    addresss:[{
        city:{type:String},
        phone:{type:String},
         street:{type:String},
    }]
},{
    timestamps:true,    versionKey:false 
})

schema.pre("save",function(){

        this.password=bcrypt.hashSync(this.password,10)
 
})


schema.pre("findOneAndUpdate",function(){
    if(this._update.password){
    this._update.password=bcrypt.hashSync( this._update.password,10)
    }
})


export const User =model("User",schema)