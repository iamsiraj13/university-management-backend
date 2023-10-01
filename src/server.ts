import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import  { errorLogger, logger } from "./shared/logger";
 
async function bootstrap(){
    try {
        mongoose.connect(config.db_url as string)
        app.listen(config.port,()=>{
            logger.info("Server Running Successfully")
        })
        logger.info("Database Connected")
    } catch (err) {
        errorLogger.error('error',err)
    }
}
bootstrap();