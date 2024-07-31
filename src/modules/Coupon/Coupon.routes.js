import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { addCoupon, allCoupons, deleteCoupon, getCoupon, updateCoupon } from "./Coupon.controller.js";
import { allowedTo, protectedRoutes } from "../Auth/auth.controller.js";


const couponRouter = Router();

couponRouter.route("/").post(allowedTo("admin"), addCoupon).get(allowedTo("admin"),allCoupons)
couponRouter.route("/:id").get(allowedTo("admin"),getCoupon).put( allowedTo("admin"), updateCoupon).delete(allowedTo("admin"),deleteCoupon)


  


export default couponRouter