import slugify from "slugify";
import { catcherror } from "../../middleware/catcherror.js";
import { errorhandle } from "../../utils/errorhandle.js";
import { SubCategory } from "../../../database/models/subCategory.model.js";
import { deleteone, getall, getone } from "../../handlers/handler.js";

const getSubCategory = getone(SubCategory)

const allSubCategory = getall(SubCategory)

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
    
const deleteSubCategory = deleteone(SubCategory)
export { getSubCategory , addSubCategory , allSubCategory, updateSubCategory, deleteSubCategory }