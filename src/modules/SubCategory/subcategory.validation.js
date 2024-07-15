import Joi from "joi";
import joi from "joi";

const addSubcategoryval=joi.object({
    name:joi.string().min(3).max(50).required(),
})


const updateSubcategoryval=joi.object({
        name:joi.string().min(3).max(50),
        id:Joi.string().hex().length(24).required(),
})


export {
    addSubcategoryval,
    updateSubcategoryval


}