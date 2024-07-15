import { Router } from "express";
import { addCategory, allCategory, deleteCategory, getCategory, updateCategory } from "./category.controller.js";
import { uploadSingleFile } from "../../fileupload/fileupload.js";
import { validate } from "../../middleware/validate.js";
import { addCategoryval, updateCategoryval,   } from "./category.validation.js";


const categoryRouter = Router();

categoryRouter.route("/").post(uploadSingleFile('image',"categories"),validate(addCategoryval,1),addCategory).get(allCategory)
categoryRouter.route("/:id").get(getCategory).put(uploadSingleFile('image',"categories"),validate(updateCategoryval,1),updateCategory).delete(deleteCategory)



export default categoryRouter