import mongoose from "mongoose";
import app from "./app";
import config from "./config";
 
async function bootstrap(){
    try {
        mongoose.connect(config.db_url as string)
        app.listen(config.port,()=>{
            console.log("Server Running Successfully")
        })
        console.log("Database Connected")
    } catch (error) {
        console.log(error)
    }
}
bootstrap();