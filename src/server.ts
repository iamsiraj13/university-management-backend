import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import  { errorLogger, logger } from "./shared/logger";
import {Server} from 'http'


process.on('uncaughtException',(err)=>{
    errorLogger.error(err)
    process.exit(1)
})


let server: Server;
async function bootstrap(){
    try {
        mongoose.connect(config.db_url as string)
      server = app.listen(config.port,()=>{
            logger.info("Server Running Successfully")
        })
        logger.info("Database Connected")
    } catch (err) {
        errorLogger.error('error',err)
    }

    process.on('unhandledRejection',(err)=>{
        
         if( server ){
            server.close(()=>{
                errorLogger.error(err)
                process.exit(1)
            })
         }
         process.exit(1)
    })
}
bootstrap();

process.on('SIGTERM',()=>{
    logger.info("SIGTERM is receieved");
    if( server ){
        server.close();
    }
})