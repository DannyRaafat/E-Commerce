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
const app = express()
const port = process.env.PORT || 3000
app.post('/api/webhook', express.raw({ type: 'application/json' }),catcherror ((req, res) => {
    const sig = req.headers['stripe-signature'].toString();
    let checkout
    let event = stripe.webhooks.constructEvent(req.body, sig, "whsec_0WMqCSfcbZbXNSQOtPqofpKxJGS1sn0E");
    console.log(event.type);
    if(event.type == 'checkout.session.completed'){
        checkout= event.data.object;
    }
    res.send({ received: true },checkout)
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