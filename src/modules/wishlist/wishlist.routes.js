import { Router } from "express";
import { addToWishlist, getWishlist, removeFromWishlist } from "./wishlist.controller.js";
import { allowedTo, protectedRoutes } from "../Auth/auth.controller.js";
 


const wishlistRouter = Router();
 
wishlistRouter.route("/").patch(protectedRoutes,allowedTo('user'),addToWishlist).get(protectedRoutes,allowedTo('user'),getWishlist)
wishlistRouter.route("/:id").delete(protectedRoutes,allowedTo('user'),removeFromWishlist)
  


export default wishlistRouter