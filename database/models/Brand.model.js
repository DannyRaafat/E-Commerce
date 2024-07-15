import mongoose, { Schema, Types, model } from "mongoose";
;

const schema = new Schema({
    name:{ type: String, unique:[true,"Brand name already exist"],trim:true ,minLength:[3,"Brand name must be at least 3 characters long"]},
    slug:{type:String, lowercase:true,},
    logo:{type:String},
    createdBy:{ type: Types.ObjectId, ref: "User",  },


},{
    timestamps:true,    versionKey:false
})

schema.post("init" ,function(doc){
    doc.logo="https://localhost:3000/uploads/brands/"+doc.logo
})


export const Brand =model("Brand",schema)