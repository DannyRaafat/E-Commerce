import slugify from "slugify";
import { Category } from "../../../database/models/Category.model.js";
import { catcherror } from "../../middleware/catcherror.js";
import { errorhandle } from "../../utils/errorhandle.js";

const getCategory = catcherror (async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    category || next(new errorhandle("Category not found", 404));

    !category || res.send(category);  

})

const allCategory = catcherror(async (req, res, next) => {
    const category = await Category.find();
    res.send(category);
})

const addCategory =  catcherror  ( async (req, res, next) => {
    req.body.slug=slugify(req.body.name)
    let category=new Category(req.body)
    await category.save()
    res.json(category);
})

const updateCategory = catcherror( async (req, res, next) => {
    req.body.slug=slugify(req.body.name)
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    category || next(new errorhandle("Category not found", 404));

    !category || res.send(category);  

     
})
    
const deleteCategory = catcherror(async (req, res, next) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    category || next(new errorhandle("Category not found", 404));
    !category || res.send(category);  

})
export { getCategory , addCategory , allCategory, updateCategory, deleteCategory }