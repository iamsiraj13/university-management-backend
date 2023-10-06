import { ErrorRequestHandler} from "express";
import config from "../../config";
import { iGenericMessage } from "../../interfaces/error";
import handleValidationError from "../../errors/handleValidationError";
import ApiError from "../../errors/ApiError";
import { errorLogger } from "../../shared/logger";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {


    config.env === 'development'?
    console.log('globalError',err):
     errorLogger.error('globalError',err)


    let statusCode = 500;
    let message = 'Something went wrong';
    let errorMessages : iGenericMessage[]=[]
    
    if(err.name === 'ValidationError'){
        const SimplifiedError = handleValidationError(err);

        statusCode = SimplifiedError.statusCode;
        message = SimplifiedError.message;
        errorMessages= SimplifiedError.errorMessages



    }else if( err instanceof ApiError){
        statusCode = err?.statusCode;
        message = err?.message
        errorMessages = err?.message?[
            {
                path:'',
                message:err?.message
            }
        ]:[]



    } else if( err instanceof Error){
        message = err?.message;
        errorMessages = err?.message?
        [
            {
                path:'',
                message:err?.message
            }
        ]:[]
    }
     



    
    res.status(statusCode).json({
        success:false,
        message,
        errorMessages,
        stack:config.env !== 'production'? err.stack : undefined
    })

    next();


}

export default globalErrorHandler;