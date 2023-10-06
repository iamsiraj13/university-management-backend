import mongoose from "mongoose";
import { iGenericMessage } from "../interfaces/error";
import { IGenericErrorResponse } from "../interfaces/common";


const handleValidationError=(err: mongoose.Error.ValidationError):IGenericErrorResponse=>{


    const errors:iGenericMessage[]= Object.values(err.errors).map((el :mongoose.Error.ValidatorError | mongoose.Error.CastError )=>{
        return {
            path:el?.path,
            message:el?.message
        }
    })

    const statusCode = 400;
    return {
        statusCode ,
        message:"Validation Error",
        errorMessages:errors
    }


}


export default handleValidationError;
 