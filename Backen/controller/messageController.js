import { Message } from "../models/messageSchema.js";
import { ErrorHandler } from "../middleware/errorMiddleware.js";
import { catchAsyncErrors } from "../middleware/catchAsyncError.js";

export const sendMessage = catchAsyncErrors(async (req,res,next) =>{
    const {firstName,lastName,email,phone,message} = req.body;
    if(!firstName || !lastName || !email || !phone || !message){
        return next(new ErrorHandler("Please fill Full  Form!!", 400))
        
        }
        await Message.create({firstName,lastName,email,phone,message})
        res.status(200).json({
            success:true,
            message:"Message Send Successfully"
        })
    

})