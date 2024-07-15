import slugify from "slugify";
import { Category } from "../../../database/models/Category.model.js";
import { catcherror } from "../../middleware/catcherror.js";
import { errorhandle } from "../../utils/errorhandle.js";
import fs from "fs";
import { deleteone, getall, getone } from "../../handlers/handler.js";

const getCategory = getone(Category)

const allCategory = getall(Category)

const addCategory =  catcherror  ( async (req, res, next) => {
    req.body.slug=slugify(req.body.name)
    req.body.image=req.file.filename
    let category=new Category(req.body)
    await category.save()
    res.json(category);
})

const updateCategory = catcherror( async (req, res, next) => {
    if(req.body.name){
        req.body.slug=slugify(req.body.name)
    }
    if (req.file) {
        const oldImage = await Category.findById(req.params.id);
        if (oldImage.image) {
            const imageUrl = oldImage.image.replace("https://localhost:3000/", "");
            const path = `${imageUrl}`;

            fs.unlink(path, (err) => {
                if (err) {
                    next(new errorhandle(err.message, 400));
                }  
            });
        }
        req.body.image = req.file.filename;
    }
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    category || next(new errorhandle("Category not found", 404));

    !category || res.send(category);  

     
})
    
const deleteCategory = deleteone(Category)
export { getCategory , addCategory , allCategory, updateCategory, deleteCategory }