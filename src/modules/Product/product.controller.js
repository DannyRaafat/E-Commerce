import slugify from "slugify";
import { catcherror } from "../../middleware/catcherror.js";
import { errorhandle } from "../../utils/errorhandle.js";
import { Product } from "../../../database/models/product.model.js";
import fs from "fs";
import { deleteone, getall, getone } from "../../handlers/handler.js";

const getproduct =getone(Product)

const allproduct = getall(Product)

const addproduct =  catcherror  ( async (req, res, next) => {
    req.body.slug=slugify(req.body.title)
    req.body.imageCover=req.files.imageCover[0].filename
    req.body.images=req.files.images.map(image=>image.filename)
    let product=new Product(req.body)
    await product.save()
    res.json(product);
})

const updateproduct = catcherror( async (req, res, next) => {

    if(req.body.title) req.body.slug=slugify(req.body.title)
    if (req.files) {
        const oldImage = await Product.findById(req.params.id);
        if (req.files.imageCover) {
            const imageUrl = oldImage.imageCover.replace("https://localhost:3000/", "");
            const path = `${imageUrl}`;
            fs.unlink(path, (err) => {
                if (err) {
                    next(new errorhandle(err.message, 400));
                } 
            });
            req.body.imageCover=req.files.imageCover[0].filename
        }
        if(req.files.images){
            oldImage.images.forEach((image) => {
                const imageUrl = image.replace("https://localhost:3000/", "");
                const path = `${imageUrl}`;
                fs.unlink(path, (err) => {
                    if (err) {
                        next(new errorhandle(err.message, 400));
                    }
                });
            });
            req.body.images=req.files.images.map(image=>image.filename)
        }
    }
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    product || next(new errorhandle("brand not found", 404));
    !product || res.send(product);  

     
})
    
const deleteproduct = deleteone(Product)
export {  getproduct , addproduct , allproduct, updateproduct, deleteproduct }