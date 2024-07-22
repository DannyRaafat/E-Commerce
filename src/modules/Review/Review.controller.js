import slugify from "slugify";
import { catcherror } from "../../middleware/catcherror.js";
import { errorhandle } from "../../utils/errorhandle.js";
import { deleteone, getall, getone } from "../../handlers/handler.js";
import { Review } from "../../../database/models/review.model.js";

const getreview = getone(Review)

const allreview = getall(Review)

const addreview =  catcherror  ( async (req, res, next) => {
    req.body.user=req.user._id
    let isExist=await Review.findOne({user:req.user._id,product:req.body.product})
    if(isExist){
        return next(new errorhandle("you already reviewed this product", 401))
    }
    let review=new Review(req.body)
    await review.save()
    res.json(review);
})

const updatereview = catcherror( async (req, res, next) => {
 
    const review = await Review.findOneAndUpdate({user:req.user._id,_id:req.params.id}, req.body, { new: true });
    review || next(new errorhandle("review not found", 404));

    !review || res.send(review);  

     
})
    
const deletereview = deleteone(Review)
export { getreview , addreview , allreview, updatereview, deletereview }