 
import { User } from "../../../database/models/user.model.js";
import { catcherror } from "../../middleware/catcherror.js";
 
 

const addToWishlist = catcherror( async (req, res, next) => {
 
    let wishlist= await User.findByIdAndUpdate(req.user._id, { $addToSet: { wishlist: req.body.product } }, { new: true });

    wishlist || next(new errorhandle("wishlist not found", 404));
    !wishlist || res.send({wishlist:wishlist.wishlist});

     
})

const removeFromWishlist = catcherror( async (req, res, next) => {
    let wishlist= await User.findByIdAndUpdate(req.user._id, { $pull: { wishlist: req.params.id } }, { new: true });
    wishlist || next(new errorhandle("wishlist not found", 404));
    !wishlist || res.send({wishlist:wishlist.wishlist});

     
})

const getWishlist = catcherror( async (req, res, next) => {
    let wishlist= await User.findById(req.user._id).populate("wishlist");
    wishlist || next(new errorhandle("wishlist not found", 404));
    !wishlist || res.send({wishlist:wishlist.wishlist});
})
    
 
export  {  addToWishlist,removeFromWishlist , getWishlist }