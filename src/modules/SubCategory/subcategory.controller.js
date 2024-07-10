import slugify from "slugify";
import { catcherror } from "../../middleware/catcherror.js";
import { errorhandle } from "../../utils/errorhandle.js";
import { SubCategory } from "../../../database/models/SubCategory.model.js";

const getSubCategory = catcherror (async (req, res, next) => {
    const subcategory = await SubCategory.findById(req.params.id);
    subcategory || next(new errorhandle("subcategory not found", 404));

    !subcategory || res.send(subcategory);  

})

const allSubCategory = catcherror(async (req, res, next) => {
    const subcategory = await SubCategory.find();
    res.send(subcategory);
})

const addSubCategory =  catcherror  ( async (req, res, next) => {
    req.body.slug=slugify(req.body.name)
    let subcategory=new SubCategory(req.body)
    await subcategory.save()
    res.json(subcategory);
})

const updateSubCategory = catcherror( async (req, res, next) => {
    req.body.slug=slugify(req.body.name)
    const subcategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    subcategory || next(new errorhandle("subcategory not found", 404));

    !subcategory || res.send(subcategory);  

     
})
    
const deleteSubCategory = catcherror(async (req, res, next) => {
    const subcategory = await SubCategory.findByIdAndDelete(req.params.id);
    subcategory || next(new errorhandle("subcategory not found", 404));
    !subcategory || res.send(subcategory);  

})
export { getSubCategory , addSubCategory , allSubCategory, updateSubCategory, deleteSubCategory }