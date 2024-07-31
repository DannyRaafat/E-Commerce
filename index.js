process.on(`uncaughtException`, () => {
    console.log(`erorr in code`)
})
 
import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import { errorhandle } from './src/utils/errorhandle.js'
import { globalerror } from './src/middleware/globalerror.js'
import { bootstrap } from './src/modules/bootstrap.js'
 import cors from "cors"
 

import 'dotenv/config'
 const app = express()
 const port=process.env.PORT || 3000
app.use(cors())

 app.use(express.json())
app.use('/uploads', express.static('uploads'))
bootstrap(app)
app.use('*', (req, res, next) => {
    next(new errorhandle(`route not found ${req.originalUrl}`, 404))
})

app.use(globalerror)

process.on(`unhandledRejection`, (err) => {
    console.log(err);
})
 
app.listen(port, () => console.log("server is running")) 