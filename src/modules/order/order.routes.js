import { Router } from "express";
import { allowedTo, protectedRoutes } from "../Auth/auth.controller.js";
import { creatCashOrder, getAllOrders, getUserOrders } from "./order.controller.js";


const orderRouter = Router();

orderRouter.route("/:id").post(protectedRoutes,allowedTo("user"), creatCashOrder) 

orderRouter.route("/").get(protectedRoutes,allowedTo("admin"), getAllOrders)

orderRouter.get('/users',protectedRoutes,allowedTo("user","admin"),getUserOrders)


export default orderRouter