import mongoose from "mongoose";
import validator from "validator"

const messageSchema = new mongoose.Schema({
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
    required: [true, 'Email is required'],
    minlength: [10, "Message must be at least 10 characters"],
    validate:[validator.isEmail, "Please Privide a Valid Email"]

  },
  phone: {
    type: String,
    required: [true, 'First name is required'],
    minlength: [10, "Message must be at least 10 characters"]

  },
  message: {
    type: String,
    required: [true, 'First name is required'],
    minlength: [8, "Message must be at least 8 characters"]
  }
});

export const Message = mongoose.model("Message", messageSchema);
