import { Router } from "express";
import { addbrand, allbrands, deletebrand, getbrand, updatebrand } from "./brand.controller.js";
import { uploadSingleFile } from "../../fileupload/fileupload.js";
import { validate } from "../../middleware/validate.js";
import { addBrandval, updateBrandval } from "./brand.validation.js";


const brandRouter = Router();

brandRouter.route("/").post(uploadSingleFile('logo',"brands"),validate(addBrandval,2),addbrand).get(allbrands)
brandRouter.route("/:id").get(getbrand).put(uploadSingleFile('logo',"brands"),validate(updateBrandval,2),updatebrand).delete(deletebrand)


  


export default brandRouter