import { Review } from "../../database/models/review.model.js";
import { catcherror } from "../middleware/catcherror.js";
import { ApiFeatures } from "../utils/ApiFeatures.js";
import { errorhandle } from "../utils/errorhandle.js";

export const deleteone = (x) => {
    return catcherror(async (req, res, next) => {
        if (x.modelName === "Review") {
            const review = await Review.findOneAndDelete({user:req.user._id,_id:req.params.id}, req.body, { new: true });
            review || next(new errorhandle("review not found", 404));
            !review || res.send(review);
        }else{
        const document = await x.findByIdAndDelete(req.params.id);
        document || next(new errorhandle(`document not found`, 404));
        !document || res.send(document);
        }
    });
};
export const getall=(x) => {
    return catcherror(async (req, res, next) => {
        let apifeatures=new ApiFeatures(x.find(),req.query).pagination().filter().sort().fields().search()
        let document=await apifeatures.mongooseQuery
        res.send({ document: document,pageNumber:apifeatures.pagenumber });
    })
}
export const getone = (x) => {
    return catcherror (async (req, res, next) => {
        const document = await x.findById(req.params.id);
        document || next(new errorhandle("document not found", 404));
        !document || res.send(document);  
    
    })
} 