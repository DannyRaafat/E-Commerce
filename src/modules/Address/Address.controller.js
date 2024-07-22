 
import { User } from "../../../database/models/user.model.js";
import { catcherror } from "../../middleware/catcherror.js";
 
 

const addAddress = catcherror( async (req, res, next) => {
 
    let address= await User.findByIdAndUpdate(req.user._id, { $push: { addresss: req.body } }, { new: true });

    address || next(new errorhandle("address not found", 404));
    !address || res.send({address:address.addresss});

     
})

const removeAddress = catcherror( async (req, res, next) => {
    let address= await User.findByIdAndUpdate(req.user._id, { $pull: { addresss:{_id:req.params.id}}  }, { new: true });
    address || next(new errorhandle("wishlist not found", 404));
    !address || res.send({address:address.addresss});

     
})

const getAddress = catcherror( async (req, res, next) => {
    let address= await User.findById(req.user._id) 
    address || next(new errorhandle("address not found", 404));
    !address || res.send({address:address.addresss});
})
    
 
export  {   addAddress,removeAddress , getAddress }