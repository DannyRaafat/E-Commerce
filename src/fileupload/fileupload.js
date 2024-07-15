import multer from "multer"
import {v4 as uuidv4} from "uuid"
import { errorhandle } from "../utils/errorhandle.js"
const fileupload=(foldername)=>{
    const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,`uploads/${foldername}`)
        },
        filename:(req,file,cb)=>{
            cb(null,uuidv4()+"-"+file.originalname)
        }
    })
    function filefilter(req,file,cb){
        if(file.mimetype.startsWith("image")){
            cb(null,true)
        }
        else{
            cb(new errorhandle("only images are allowed",400),false)
        }
    }
    const upload=multer({storage,filefilter})
    return upload
}

export const uploadSingleFile=(fieldName,foldername)=>fileupload(foldername).single(fieldName)

export const uploadMultipleFiles=(arrayOfFields,foldername)=>fileupload(foldername).fields(arrayOfFields)