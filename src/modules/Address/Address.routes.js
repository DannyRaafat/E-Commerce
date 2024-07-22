import { Router } from "express";
import {    getAddress,  addAddress,   removeAddress    } from "./Address.controller.js";
import { allowedTo, protectedRoutes } from "../Auth/auth.controller.js";
 


const addressRouter = Router();
 
addressRouter.route("/").patch(protectedRoutes,allowedTo('user'),addAddress).get(protectedRoutes,allowedTo('user'),getAddress)
addressRouter.route("/:id").delete(protectedRoutes,allowedTo('user'),removeAddress)
  


export default addressRouter