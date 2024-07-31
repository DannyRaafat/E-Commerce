import mongoose, { Schema, Types, model } from "mongoose";
;

const schema = new Schema({
user:{ type: Types.ObjectId, ref: "User", required: true },
cartitems:[{ product: { type: Types.ObjectId, ref: "Product", required: true }, quantity: { type: Number, required: true } , price: Number }],
totalCartPrice:Number,
discount:Number,
totalCartPriceAfterDiscount:Number

},{
    timestamps:true,    versionKey:false
})

 


export const Cart =model("Cart",schema)