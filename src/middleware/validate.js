import { errorhandle } from "../utils/errorhandle.js"
export const validate = (check,x=0) => {
    return (req, res, next) => {
        var { error } ={}
        if(x==1){
            var { error } = check.validate({image:req.file,...req.body, ...req.params, ...req.query }, { abortEarly: false })
        }
        else if (x==2) {
            var { error } = check.validate({logo:req.file,...req.body, ...req.params, ...req.query }, { abortEarly: false })
        }
        else if(x==3){
            const files = {
                imageCover: req.files && req.files.imageCover ? req.files.imageCover : [],
                images: req.files && req.files.images ? req.files.images : []
              };
            var { error } = check.validate({...files,...req.body, ...req.params, ...req.query }, { abortEarly: false })
        }
        else  {
            var { error } = check.validate({...req.body, ...req.params, ...req.query }, { abortEarly: false })
        }
        if (!error) {
            next()
        } else {
            const errMsgs = error.details.map(err => err.message);
            next(new errorhandle(errMsgs, 401))
        }
    }
}
 