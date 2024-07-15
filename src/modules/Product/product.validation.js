import Joi from "joi";
import joi from "joi";

const addProductval=joi.object({
    title:joi.string().min(3).max(50).required(),
    imageCover:joi.array().items(joi.object(
        {
            fieldname:joi.string().required(),
            filename:joi.string().required(),
            originalname:joi.string().required(),
            encoding:joi.string().required(),
            mimetype:joi.string().valid("image/jpg","image/jpeg","image/png","image/gif").required(),
            size:joi.number().max(5242880).required(),
            destination:joi.string().required(),
            path:joi.string().required()
            
        }        
    ).required()).required()
    ,
    images: joi.array().items(joi.object(
        {
            fieldname:joi.string().required(),
            filename:joi.string().required(),
            originalname:joi.string().required(),
            encoding:joi.string().required(),
            mimetype:joi.string().valid("image/jpg","image/jpeg","image/png","image/gif").required(),
            size:joi.number().max(5242880).required(),
            destination:joi.string().required(),
            path:joi.string().required()
            
        }        
    ).required()).required()
})



    const updateProductval=joi.object({
        title:joi.string().min(3).max(50),
        id:Joi.string().hex().length(24).required(),
        imageCover:joi.array().items(joi.object(
            {
                fieldname:joi.string().required(),
                filename:joi.string().required(),
                originalname:joi.string().required(),
                encoding:joi.string().required(),
                mimetype:joi.string().valid("image/jpg","image/jpeg","image/png","image/gif").required(),
                size:joi.number().max(5242880).required(),
                destination:joi.string().required(),
                path:joi.string().required()
                
            }        
        ))
        ,
        images: joi.array().items(joi.object(
            {
                fieldname:joi.string().required(),
                filename:joi.string().required(),
                originalname:joi.string().required(),
                encoding:joi.string().required(),
                mimetype:joi.string().valid("image/jpg","image/jpeg","image/png","image/gif").required(),
                size:joi.number().max(5242880).required(),
                destination:joi.string().required(),
                path:joi.string().required()
                
            }        
        ))

    })


export {
    addProductval,
    updateProductval


}