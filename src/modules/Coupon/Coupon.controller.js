import slugify from "slugify";
import { catcherror } from "../../middleware/catcherror.js";
import { errorhandle } from "../../utils/errorhandle.js";
import { Coupon } from "../../../database/models/coupon.model.js";
import fs from "fs";
import { deleteone, getall, getone } from "../../handlers/handler.js";


const getCoupon = getone(Coupon)

const allCoupons = getall(Coupon)

const addCoupon =  catcherror  ( async (req, res, next) => {
   let isExist=await Coupon.findOne({code:req.body.code})
   if(isExist) return next(new errorhandle("coupon already exist", 409))
    let coupon=new Coupon(req.body)
    await coupon.save()
    res.json(coupon);
})

const updateCoupon = catcherror( async (req, res, next) => {
    if(req.body.name){
        req.body.slug=slugify(req.body.name)
    }
    if (req.file) {
        const oldImage = await Coupon.findById(req.params.id);
        if (oldImage.logo) {
            const imageUrl = oldImage.logo.replace("https://localhost:3000/", "");
            const path = `${imageUrl}`;
            fs.unlink(path, (err) => {
                if (err) {
                    next(new errorhandle(err.message, 400));
                } 
            });
        }
        req.body.logo = req.file.filename;
    }
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    coupon || next(new errorhandle("coupon not found", 404));
    !coupon || res.send(coupon);  

     
})
    
const deleteCoupon = deleteone(Coupon)
export { getCoupon  , addCoupon , allCoupons, updateCoupon, deleteCoupon }