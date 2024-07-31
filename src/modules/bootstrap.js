import addressRouter from "./Address/Address.routes.js"
import authRouter from "./Auth/auth.routes.js"
import brandRouter from "./Brand/brand.routes.js"
import cartRouter from "./Cart/cart.routes.js"
import categoryRouter from "./Category/category.routes.js"
import couponRouter from "./Coupon/Coupon.routes.js"
import orderRouter from "./order/order.routes.js"
import productRouter from "./Product/product.routes.js"
import reviewRouter from "./Review/Review.routes.js"
import subcategoryRouter from "./SubCategory/subcategory.routes.js"
import userRouter from "./User/User.routes.js"
import wishlistRouter from "./wishlist/wishlist.routes.js"



export const bootstrap =(app) => {
    app.use("/api/categories",categoryRouter)
    app.use("/api/subcategories",subcategoryRouter)
    app.use("/api/brands",brandRouter)
    app.use("/api/products",productRouter)
    app.use("/api/users",userRouter)
    app.use("/api/auth",authRouter)
    app.use("/api/reviews",reviewRouter)
    app.use("/api/wishlist",wishlistRouter)
    app.use("/api/addresses",addressRouter)
    app.use("/api/coupons",couponRouter)
    app.use("/api/carts",cartRouter)
    app.use("/api/orders",orderRouter)

}