import { catcherror } from "../middleware/catcherror.js";
import { errorhandle } from "../utils/errorhandle.js";

export const deleteone = (x) => {
    return catcherror(async (req, res, next) => {
        const document = await x.findByIdAndDelete(req.params.id);
        document || next(new errorhandle(`document not found`, 404));
        !document || res.send(document);
    });
};
export const getall=(x) => {
    return catcherror(async (req, res, next) => {
        var page = parseInt(req.query.page) || 1;
        const limit = 10
        var skip = (page - 1) * limit;
        var totaldocument = await x.countDocuments();
        totaldocument = Math.ceil(totaldocument / limit);
        if (page > totaldocument) {
             
            page = totaldocument 
            console.log(page);
            skip = (page - 1) * limit;
        }
        const document = await x.find().skip(skip).limit(limit);
        res.send({ document: document, currentPage: page, totalPages: totaldocument });
    })
}
export const getone = (x) => {
    return catcherror (async (req, res, next) => {
        const document = await x.findById(req.params.id);
        document || next(new errorhandle("document not found", 404));
        !document || res.send(document);  
    
    })
}