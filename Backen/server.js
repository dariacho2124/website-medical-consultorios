import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./router/userRouter.js";
import messageRouter from "./router/messageRouter.js";

dotenv.config({ path: "./config.env" });

console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Dirección del frontend.
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/v1/user", userRouter);

const mongoUri =
  process.env.MONGO_URI ||
  "mongodb+srv://dariacho2124:8wAu0uD51rjMzHWM@cluster01.6xohz.mongodb.net/MERC_STACK_CONSULTORIOS?retryWrites=true&w=majority";

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
  

app.use("/api", messageRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
