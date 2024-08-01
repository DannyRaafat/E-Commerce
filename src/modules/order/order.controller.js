import { Cart } from "../../../database/models/Cart.model.js";
import { Order } from "../../../database/models/order.model.js";
import { Product } from "../../../database/models/product.model.js";
import { catcherror } from "../../middleware/catcherror.js";
import { errorhandle } from "../../utils/errorhandle.js";
import Stripe from "stripe";
const stripe = new Stripe("sk_test_51PilPfB0ndlSY82ahx2YCdXnX79v96m7Mlas2hjtnwJEmYtVhjdc2XunzhYI6tyMjB6FWr7KeBlIKjBaBVYUlYNR00hrFwC5Z5")

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
    await  Product.bulkWrite(options)
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

const creatCheckoutSession = catcherror(async (req, res, next) => {
    let cart = await Cart.findById(req.params.id)
    if (!cart) next(new errorhandle("cart not found", 404))
    let totalOrderPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice
    let session=await stripe.checkout.sessions.create({
        line_items:[
            {
                price_data:{
                    currency:"egp",
                    product_data:{
                        name:"Price"                      
                    },
                    unit_amount:totalOrderPrice*100
                },
                quantity:1
            }
        ],
        mode:"payment",
        success_url:"http://localhost:3000/success",
        cancel_url:"http://localhost:3000/cancel",
        customer_email:req.user.email,
        client_reference_id:req.params.id,
        metadata:req.body.shippingAddress
    })
        res.json({session})
})

export { creatCashOrder,getUserOrders ,getAllOrders,creatCheckoutSession }