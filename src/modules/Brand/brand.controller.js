import slugify from "slugify";
import { catcherror } from "../../middleware/catcherror.js";
import { errorhandle } from "../../utils/errorhandle.js";
import { Brand } from "../../../database/models/Brand.model.js";
import fs from "fs";
import { deleteone, getall, getone } from "../../handlers/handler.js";


const getbrand = getone(Brand)

const allbrands = getall(Brand)

const addbrand =  catcherror  ( async (req, res, next) => {
    req.body.slug=slugify(req.body.name)
    req.body.logo=req.file.filename
    let brand=new Brand(req.body)
    await brand.save()
    res.json(brand);
})

const updatebrand = catcherror( async (req, res, next) => {
    if(req.body.name){
        req.body.slug=slugify(req.body.name)
    }
    if (req.file) {
        const oldImage = await Brand.findById(req.params.id);
        if (oldImage.logo) {
            const imageUrl = oldImage.logo.replace("https://localhost:3000/", "");
            const path = `${imageUrl}`;
            fs.unlink(path, (err) => {
                if (err) {
                    next(new errorhandle(err.message, 400));
                } 
            });
        }
        req.body.logo = req.file.filename;
    }
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
    brand || next(new errorhandle("brand not found", 404));
    !brand || res.send(brand);  

     
})
    
const deletebrand = deleteone(Brand)
export { getbrand , addbrand , allbrands, updatebrand, deletebrand }