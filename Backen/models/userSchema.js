import mongoose from "mongoose";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required']
  },
  email: {
    type: String,
    required: true, 
    minlength: [10, "Email must be at least 10 characters"],
    validate:[validator.isEmail, "Please Privide a Valid Email"]

  },
  phone: {
    type: String,
    required: true, 
    minLength: [10, "phone must contains exact 10 Digits"],
    maxLength: [10, "phone must contains exact 10 Digits"]
  },
  nic: {
    type: String,
    required: true,
    minlength: [8, "NIC must contains exact 8 Digits"],
    maxLength: [10, "NIC must contains exact 10 Digits"]
  },
  dob:{
    type:Date,
    required:[true, "DOB is required"],
    
  },
  gender:{
    type:String,
    required:true,
    enum:["Male", "Female"],
  },
  password:{
    type:String,
    minLength:[10, "Password Number Must Contain at least 10 characters"],
    required:true,
    select:false
  },
  role:{
    type:String,
    required:true,
    enum:["Admin", "Patient", "Doctor"],
  },
  doctorDepartment:{
    type:String,

  },
  docAvatar: {
    public_id:String,
    url:String
  }
});

userSchema.pre("save", async function (next){
if(!this.isModified("password")){
    next()
}
this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
userSchema.methods.generateJsonWebToken = function () {
  if (!process.env.JWT_SECRET_KEY) {
      throw new Error("JWT_SECRET_KEY is not defined in the environment variables.");
  }
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};


export const User = mongoose.model("User", userSchema);
