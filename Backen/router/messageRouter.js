// messageRouter.js
import express from "express";
import { sendMessage } from "../controller/sendMessages.js";

console.log("Controlador sendMessage cargado:", typeof sendMessage);

const messageRouter = express.Router();

// Ruta para registrar el paciente
messageRouter.post("/user/message", sendMessage);

export default messageRouter;
