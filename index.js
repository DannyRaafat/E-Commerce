process.on(`uncaughtException`, () => {
    console.log(`erorr in code`)
})
 
import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import { errorhandle } from './src/utils/errorhandle.js'
import { globalerror } from './src/middleware/globalerror.js'
import { bootstrap } from './src/modules/bootstrap.js'
 
 

const app = express()
app.use(express.json())
 
bootstrap(app)

app.use('*', (req, res, next) => {
    next(new errorhandle(`route not found ${req.originalUrl},Try Visiting https://documenter.getpostman.com/view/35029632/2sA3e1Bq8s`, 404))
})

app.use(globalerror)

process.on(`unhandledRejection`, (err) => {
    console.log(err);
})
 
app.listen(3000, () => console.log("server is running")) 