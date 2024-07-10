import slugify from "slugify";
import { catcherror } from "../../middleware/catcherror.js";
import { errorhandle } from "../../utils/errorhandle.js";
import { Brand } from "../../../database/models/Brand.model.js";

const getbrand = catcherror (async (req, res, next) => {
    const brand = await Brand.findById(req.params.id);
    brand || next(new errorhandle("brand not found", 404));

    !brand || res.send(brand);  

})

const allbrands = catcherror(async (req, res, next) => {
    const brand = await Brand.find();
    res.send(brand);
})

const addbrand =  catcherror  ( async (req, res, next) => {
    req.body.slug=slugify(req.body.name)
    let brand=new Brand(req.body)
    await brand.save()
    res.json(brand);
})

const updatebrand = catcherror( async (req, res, next) => {
    req.body.slug=slugify(req.body.name)
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
    brand || next(new errorhandle("brand not found", 404));
    !brand || res.send(brand);  

     
})
    
const deletebrand = catcherror(async (req, res, next) => {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    brand || next(new errorhandle("brand not found", 404));
    !brand || res.send(brand);  

})
export { getbrand , addbrand , allbrands, updatebrand, deletebrand }