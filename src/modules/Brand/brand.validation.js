import Joi from "joi";
import joi from "joi";

const addBrandval=joi.object({
    name:joi.string().min(3).max(50).required(),
    logo:joi.object(
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
    ).required()
})

 

    const updateBrandval=joi.object({
        name:joi.string().min(3).max(50),
        id:Joi.string().hex().length(24).required(),
        logo:joi.object(
            {
                fieldname:joi.string(),
                filename:joi.string(),
                originalname:joi.string(),
                encoding:joi.string(),
                mimetype:joi.string().valid("image/jpg","image/jpeg","image/png","image/gif"),
                size:joi.number().max(5242880),
                destination:joi.string(),
                path:joi.string()
                
            }        
        )

    })

 


export {
    addBrandval,
    updateBrandval,
 


}