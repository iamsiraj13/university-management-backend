import express, { Application, Request, Response } from "express"
import cors from "cors"
const app: Application  = express();
import userRoute from "./app/modules/users/users.route"  

app.use(cors())
// parser

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/",async(req:Request, res:Response)=>{ 

    res.send("Hello world.")
})

app.use("/api/v1/users/",userRoute)

// routes 




export default app;