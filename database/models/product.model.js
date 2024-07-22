import mongoose, { Schema, Types, model } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const schema = new Schema({
    title:{ type: String, unique:[true,"Brand name already exist"],trim:true, minLength:[3,"Brand name must be at least 3 characters long"]},
    slug:{type:String,lowercase:true,},
    description:{type:String, minLength:30,maxlength:2000},
    imageCover:String,
    images:[String],
    price:{type:Number  ,min:0},
    priceAfterDiscount:{type:Number, min:0},
    sold:{type:Number},
    stock:{type:Number },
    ratecount:{type:Number},
    rateAvg:{type:Number, min:0,max:5},
    category:{ type: Types.ObjectId, ref: "Category",   },
    subCategory:{ type: Types.ObjectId, ref: "SubCategory",   },
    brand:{ type: Types.ObjectId, ref: "Brand",   },
    createdBy:{ type: Types.ObjectId, ref: "User",    },



},{
    timestamps:true,    versionKey:false,toJSON:{virtuals:true} 
})

schema.virtual("reviews", {
    ref: "Review",
    localField: "_id",
    foreignField: "product"
})
schema.pre("findOne",function(next){
    this.populate("reviews");
    next();
})
schema.post("init" ,function(doc){
    if (doc.imageCover) doc.imageCover=process.env.BASE_URL+"products/"+doc.imageCover
    if (doc.images)  doc.images=doc.images.map((image)=>process.env.BASE_URL+"products/"+image)
})

export const Product =model("Product",schema)