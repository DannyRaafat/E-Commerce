import { Cart } from "../../../database/models/Cart.model.js";
import { Order } from "../../../database/models/order.model.js";
import { Product } from "../../../database/models/product.model.js";
import { catcherror } from "../../middleware/catcherror.js";
import { errorhandle } from "../../utils/errorhandle.js";

const creatCashOrder = catcherror(async (req, res, next) => {

    let cart = await Cart.findById(req.params.id)
    if (!cart) next(new errorhandle("cart not found", 404))
    let totalOrderPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice
    let order = new Order({
        user: req.user._id,
        orderitems: cart.cartitems,
        shippingAddress: req.body.shippingAddress,
        totalOrderPrice
    })
    await order.save()
    let options=cart.cartitems.map((prod)=>{
        return({
            updateOne: {
                "filter": { _id: prod.product },
                "update": { $inc: { sold:prod.quantity ,stock:-prod.quantity } },
            }
        })
    })
    Product.bulkWrite(options)
    await Cart.findByIdAndDelete(req.params.id);
     res.json(order)
})

const getUserOrders=catcherror(async(req,res,next)=>{
    let orders=await Order.find({user:req.user._id}).populate("orderitems.product")
    res.json(orders)
})

const getAllOrders=catcherror(async(req,res,next)=>{
    let orders=await Order.find({}).populate("orderitems.product")
    res.json(orders)
})

export { creatCashOrder,getUserOrders ,getAllOrders}