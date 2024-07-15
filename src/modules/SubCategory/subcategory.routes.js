import { Router } from "express";
import { addSubCategory, getSubCategory, allSubCategory, updateSubCategory, deleteSubCategory } from "./subcategory.controller.js";
import { validate } from "../../middleware/validate.js";
import { addSubcategoryval, updateSubcategoryval } from "./subcategory.validation.js";


const subcategoryRouter = Router();

subcategoryRouter.route("/").post(validate(addSubcategoryval),addSubCategory).get(allSubCategory)
subcategoryRouter.route("/:id").get(getSubCategory).put(validate(updateSubcategoryval),updateSubCategory).delete(deleteSubCategory)



export default subcategoryRouter