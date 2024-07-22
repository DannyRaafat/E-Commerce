import { Router } from "express";
import { addreview, getreview, allreview, updatereview, deletereview } from "./Review.controller.js";
import { allowedTo, protectedRoutes } from "../Auth/auth.controller.js";


const reviewRouter = Router();

reviewRouter.route("/").post(protectedRoutes,allowedTo('user'),addreview).get(allreview)
reviewRouter.route("/:id").get(getreview).put(protectedRoutes,allowedTo('user'),updatereview).delete(protectedRoutes,allowedTo('user','admin'),deletereview)



export default reviewRouter