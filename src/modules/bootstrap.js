import brandRouter from "./Brand/brand.routes.js"
import categoryRouter from "./Category/category.routes.js"
import productRouter from "./Product/product.routes.js"
import subcategoryRouter from "./SubCategory/subcategory.routes.js"



export const bootstrap =(app) => {
    app.use("/api/categories",categoryRouter)
    app.use("/api/subcategories",subcategoryRouter)
    app.use("/api/brands",brandRouter)
    app.use("/api/products",productRouter)

}