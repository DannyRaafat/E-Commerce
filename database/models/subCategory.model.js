import mongoose, { Schema, Types, model } from "mongoose";

const schema = new Schema({
    name: { type: String, unique: [true, "SubCategory name already exist"], trim: true, minLength: [3, "SubCategory name must be at least 3 characters long"] },
    slug: { type: String,  lowercase: true, },
    category: { type: Types.ObjectId, ref: "Category", },
    createdBy:{ type: Types.ObjectId, ref: "User" },

}, {
    timestamps: true, versionKey: false
})
export const SubCategory = model("SubCategory", schema)