import { catcherror } from "../../middleware/catcherror.js";
import { errorhandle } from "../../utils/errorhandle.js";
import { Cart } from "../../../database/models/Cart.model.js";
import { Product } from "../../../database/models/product.model.js";
import { Coupon } from "../../../database/models/coupon.model.js";


 function calcTotalPrice(isCartExist){
    isCartExist.totalCartPrice=isCartExist.cartitems.reduce((acc,item)=>acc+=(item.price*item.quantity),0) 
    if(isCartExist.discount){
    isCartExist.totalCartPriceAfterDiscount=isCartExist.totalCartPrice-(isCartExist.totalCartPrice*isCartExist.discount)/100
    }


 }

const addtocart =  catcherror  ( async (req, res, next) => {
    let isCartExist=await Cart.findOne({user:req.user._id})
    let product=await Product.findById(req.body.product)
    if(!product) next(new errorhandle("product not found", 404))
    req.body.price=product.price
    if(product.stock<req.body.quantity) next(new errorhandle("product out of stock", 404))

    if(!isCartExist) {
        let cart=new Cart({
            user:req.user._id,
            cartitems:[req.body]
        })
        calcTotalPrice(cart)
        await cart.save()
        res.json(cart);
    }
    else{
        let item = isCartExist.cartitems.find(item=>item.product==req.body.product)
        if(item){
            item.quantity+=req.body.quantity||1
            if(item.quantity>product.stock) next(new errorhandle("product out of stock", 404)) 
        }
        if(!item){
            isCartExist.cartitems.push(req.body)
        }
     
        calcTotalPrice(isCartExist)

        await isCartExist.save()
        res.json(isCartExist);
         
    }
 
})

const updatequantity = catcherror( async (req, res, next) => {
    let cart=await Cart.findOne({user:req.user._id}) 
    let item =cart.cartitems.find(item=>item.product==req.params.id)
    if(!item){
        next(new errorhandle("item not found", 404))
    }
    item.quantity=req.body.quantity
    calcTotalPrice(cart)
    await cart.save()
    res.json(cart);
})

const removeItemFromCart=catcherror( async (req, res, next) => {
    let cart=await Cart.findOneAndUpdate({user:req.user._id},{$pull:{cartitems:{_id:req.params.id}}},{new:true}) 
    calcTotalPrice(cart)
    await cart.save()

    cart || next(new errorhandle("cart not found", 404));
    !cart || res.send(cart);
  
})

const getloggedusercart=catcherror( async (req, res, next) => {
    let cart=await Cart.findOne({user:req.user._id}) 

  
        res.send(cart);
  
})
const clearcart=catcherror( async (req, res, next) => {
    let cart=await Cart.findOneAndDelete({user:req.user._id}) 
   res.send(cart); 
})
const applycoupon=catcherror( async (req, res, next) => {
    let coupon=await Coupon.findOne({code:req.body.code,expires:{$gte:Date.now()}}) 
    if(!coupon){
        next(new errorhandle("coupon not found", 404))
    }
    let cart = await Cart.findOne({user:req.user._id})
    cart.totalCartPriceAfterDiscount=cart.totalCartPrice-(cart.totalCartPrice*coupon.discount)/100
    cart.discount=coupon.discount
    await cart.save()
    res.send(cart); 
})


export { addtocart, updatequantity , removeItemFromCart, getloggedusercart, clearcart ,applycoupon}