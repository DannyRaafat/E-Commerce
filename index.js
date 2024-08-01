process.on(`uncaughtException`, () => {
    console.log(`erorr in code`)
})

import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import { errorhandle } from './src/utils/errorhandle.js'
import { globalerror } from './src/middleware/globalerror.js'
import { bootstrap } from './src/modules/bootstrap.js'
import cors from "cors"
import Stripe from "stripe";
const stripe = new Stripe("sk_test_51PilPfB0ndlSY82ahx2YCdXnX79v96m7Mlas2hjtnwJEmYtVhjdc2XunzhYI6tyMjB6FWr7KeBlIKjBaBVYUlYNR00hrFwC5Z5")


import 'dotenv/config'
import { catcherror } from './src/middleware/catcherror.js'
import { User } from './database/models/user.model.js'
import { Order } from './database/models/order.model.js'
import { Cart } from './database/models/Cart.model.js'
import { Product } from './database/models/product.model.js'
const app = express()
const port = process.env.PORT || 3000
app.post('/api/webhook', express.raw({ type: 'application/json' }),catcherror (async (req, res) => {
    const sig = req.headers['stripe-signature'].toString();
    let checkout
    let event = stripe.webhooks.constructEvent(req.body, sig, "whsec_0WMqCSfcbZbXNSQOtPqofpKxJGS1sn0E");
    console.log(event.type);
    if(event.type == 'checkout.session.completed'){
        checkout= event.data.object;
        let user= await User.findOne({email:checkout.customer_details.email})
        let cart = await Cart.findById(checkout.client_reference_id)
        if (!cart) return next( new errorhandle("cart not found", 404))
        let order = new Order({
            user: user._id,
            orderitems: cart.cartitems,
            shippingAddress: req.body.shippingAddress,
            totalOrderPrice:checkout.amount_total/100,
            paymentType:"card",
            isPaid:true 
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
        await Product.bulkWrite(options)
        await Cart.findByIdAndDelete(cart._id);
    }
    res.status(200).json({ message:"success" ,checkout})
}))
app.use(cors())

app.use(express.json())

app.use('/uploads', express.static('uploads'))

bootstrap(app)
app.use('*', (req, res, next) => {
    next(new errorhandle(`route not found ${req.originalUrl}`, 404))
})

app.use(globalerror)

process.on(`unhandledRejection`, (err) => {
    console.log(err);
})

app.listen(port, () => console.log("server is running")) 