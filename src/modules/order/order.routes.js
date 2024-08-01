import { Router } from "express";
import { allowedTo, protectedRoutes } from "../Auth/auth.controller.js";
import { creatCashOrder, creatCheckoutSession, getAllOrders, getUserOrders } from "./order.controller.js";


const orderRouter = Router();

orderRouter.route("/:id").post(protectedRoutes,allowedTo("user"), creatCashOrder) 

orderRouter.route("/").get(protectedRoutes,allowedTo("admin"), getAllOrders)

orderRouter.get('/users',protectedRoutes,allowedTo("user","admin"),getUserOrders)


orderRouter.post('/checkout/:id',protectedRoutes,allowedTo("user"),creatCheckoutSession)


export default orderRouter