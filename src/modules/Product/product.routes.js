import { Router } from "express";
import { addproduct, allproduct, deleteproduct, getproduct, updateproduct } from "./product.controller.js";
import { uploadMultipleFiles } from "../../fileupload/fileupload.js";
import { validate } from "../../middleware/validate.js";
import { addProductval, updateProductval } from "./product.validation.js";


const productRouter = Router();

productRouter.route("/").post(uploadMultipleFiles([{name:`imageCover`,maxCount:1},{name:"images",maxCount:10}],"products"),validate(addProductval,3),addproduct).get(allproduct)
productRouter.route("/:id").get(getproduct).put(uploadMultipleFiles([{name:"imageCover",maxCount:1},{name:"images",maxCount:10}],"products"),validate(updateProductval,3),updateproduct).delete(deleteproduct)



export default productRouter