import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { User } from "../models/userSchema.js";

export const patientRegister = catchAsyncErrors(async(req,res,next)=>{
  const { firstName, lastName, email, phone,password,gender,dob,nic,role } = req.body;
    if (
      !firstName ||
       !lastName ||
        !email || 
        !phone || 
        !password ||
         !gender || 
         !dob ||
          !nic || 
          !role 
        ) {
      return next(new ErrorHandler("Please fill full form", 400));
    }
    let user = await User.findOne({email})
    if(user){
      return next(new ErrorHandler("User Already Registered!",400))
    }
    user = await User.create({
      firstName,
      lastName,
      email, 
      phone, 
      password,
       gender, 
       dob,
        nic, 
        role 
    });
    res.status(200).json({
      success:true,
      message:"user Registered !"
    })
    })
  
  export const login = catchAsyncErrors(async(req,res,next)=>{
    const {email,password,confirmPassword,role} = req.body;
    if(!email || !password || !confirmPassword || !role){
    return next(new ErrorHandler("Please provide all details", 400))

    }
    if(password !== confirmPassword){
        return next(new ErrorHandler("Password and confirmation do not match", 400))
    }
    const user = await User.findOne({email}).select("password")
    if(!user){
        return next(new ErrorHandler("Invalid password or email",400))
    }
    const isPasswordMatched = await user.comparePassword(password)
    if(!isPasswordMatched) {
        return next(new ErrorHandler("Invalid password or email",400))
    }
    if(role !== user.role){
        return next(new ErrorHandler("User with this Role Not Fonunt", 400))
    } 
    res.status(200).json({
      success:true,
      message:"user Registered2 !"
    })
})

// export const addNewAdmin = catchAsyncErrors(async(req,res,next) =>{
//   const {
//     firstName,lastName,email,phone,password, gender,dob,nic
//   }= req.body
//   if (
//     !firstName ||
//      !lastName ||
//       !email || 
//       !phone || 
//       !password ||
//        !gender || 
//        !dob ||
//         !nic || 
//         !role 
//       ) {
//         return next(new ErrorHandler("Please Fill Full Form!!"))
//       }
// })