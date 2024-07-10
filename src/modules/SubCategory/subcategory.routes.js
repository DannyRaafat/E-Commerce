import { Router } from "express";
import { addSubCategory, getSubCategory, allSubCategory, updateSubCategory, deleteSubCategory } from "./subcategory.controller.js";


const subcategoryRouter = Router();

subcategoryRouter.route("/").post(addSubCategory).get(allSubCategory)
subcategoryRouter.route("/:id").get(getSubCategory).put(updateSubCategory).delete(deleteSubCategory)



export default subcategoryRouter