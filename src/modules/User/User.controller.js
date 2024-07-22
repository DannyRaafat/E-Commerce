import { catcherror } from "../../middleware/catcherror.js";
import { errorhandle } from "../../utils/errorhandle.js";
import { deleteone, getall, getone } from "../../handlers/handler.js";
import { User } from "../../../database/models/user.model.js";


const getuser = getone(User)

const allusers = getall(User)

const adduser =  catcherror  ( async (req, res, next) => {
    console.log(3);
    const user=new User(req.body)
    await user.save()
    res.json(user);
})
 
const updateuser = catcherror( async (req, res, next) => {
 
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    user || next(new errorhandle("user not found", 404));
    !user || res.send(user);  

     
})
    
const deleteuser = deleteone(User)
export { getuser , adduser , allusers, updateuser, deleteuser }