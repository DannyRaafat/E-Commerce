import { Router } from "express";
import { addproduct, allproduct, deleteproduct, getproduct, updateproduct } from "./product.controller.js";


const productRouter = Router();

productRouter.route("/").post(addproduct).get(allproduct)
productRouter.route("/:id").get(getproduct).put(updateproduct).delete(deleteproduct)



export default productRouter