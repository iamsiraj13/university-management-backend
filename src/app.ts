import express, { Application,NextFunction,Request  ,Response  } from "express"
import cors from "cors"
const app: Application  = express();
import { UserRouter } from "./app/modules/users/user.route"  
 
import globalErrorHandler from "./app/middlewares/globalErrorHandler";


app.use(cors())
// parser

app.use(express.json())
app.use(express.urlencoded({extended:true}))

 
 
app.get("/",   (req:Request,res:Response, next:NextFunction) =>{
    throw new Error("ok")

})

// middlewares

 app.use(globalErrorHandler)


// routes 
app.use("/api/v1/users/",UserRouter)







export default app;