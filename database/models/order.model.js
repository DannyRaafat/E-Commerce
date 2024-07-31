import mongoose, { Schema, Types, model } from "mongoose";
;

const schema = new Schema({
user:{ type: Types.ObjectId, ref: "User", required: true },
orderitems:[{ product: { type: Types.ObjectId, ref: "Product", required: true }, quantity: Number , price: Number }],
totalOrderPrice:Number,
ShippingAddress:{
    city:String,
    phone:String,
    street:String
},
paymentType:{
    type:String,
    enum:["cash","card"],
    default:"cash"
},
isPaid:{type:Boolean,default:false},
isDelivered:{type:Boolean,default:false},
paidAt:Date,
deliveredAt:Date

},{
    timestamps:true,    versionKey:false
})

 


export const Order =model("Order",schema)