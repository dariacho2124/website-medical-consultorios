import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
