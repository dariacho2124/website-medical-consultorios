import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './router/userRouter.js';

console.log(`MONGO_URI: ${process.env.MONGO_URI}`);

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 
app.use('/api/v1/user', userRouter); 


// Conectar a MongoDB

const mongoUri = process.env.MONGO_URI || "mongodb+srv://dariacho2124:8wAu0uD51rjMzHWM@cluster01.6xohz.mongodb.net/MERC_STACK_CONSULTORIOS?retryWrites=true&w=majority";

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
