import { Router } from "express";
import { addbrand, allbrands, deletebrand, getbrand, updatebrand } from "./brand.controller.js";


const brandRouter = Router();

brandRouter.route("/").post(addbrand).get(allbrands)
brandRouter.route("/:id").get(getbrand).put(updatebrand).delete(deletebrand)


  


export default brandRouter