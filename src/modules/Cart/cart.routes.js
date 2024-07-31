import { Router } from "express";
import { allowedTo, protectedRoutes } from "../Auth/auth.controller.js";
import { addtocart, applycoupon, clearcart, getloggedusercart, removeItemFromCart, updatequantity } from "./cart.controller.js";


const cartRouter = Router();

cartRouter.route("/").post(protectedRoutes,allowedTo("user"), addtocart).get(protectedRoutes,allowedTo("user"), getloggedusercart).delete(protectedRoutes,allowedTo("user"), clearcart)
cartRouter.route("/:id").put(protectedRoutes,allowedTo("user"), updatequantity).delete(protectedRoutes,allowedTo("user"), removeItemFromCart)
 
cartRouter.post("/applyCoupon",protectedRoutes,allowedTo("user"),applycoupon)
  


export default cartRouter