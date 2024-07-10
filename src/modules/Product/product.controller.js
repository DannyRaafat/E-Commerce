import slugify from "slugify";
import { catcherror } from "../../middleware/catcherror.js";
import { errorhandle } from "../../utils/errorhandle.js";
import { Product } from "../../../database/models/product.model.js";

const getproduct = catcherror (async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    product || next(new errorhandle("brand not found", 404));

    !product || res.send(product);  

})

const allproduct = catcherror(async (req, res, next) => {
    const product = await Product.find();
    res.send(product);
})

const addproduct =  catcherror  ( async (req, res, next) => {
    req.body.slug=slugify(req.body.name)
    let product=new Product(req.body)
    await product.save()
    res.json(product);
})

const updateproduct = catcherror( async (req, res, next) => {
    req.body.slug=slugify(req.body.name)
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    product || next(new errorhandle("brand not found", 404));
    !product || res.send(product);  

     
})
    
const deleteproduct = catcherror(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    product || next(new errorhandle("brand not found", 404));
    !product || res.send(product);  

})
export {  getproduct , addproduct , allproduct, updateproduct, deleteproduct }