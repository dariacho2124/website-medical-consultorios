// messageRouter.js
import express from 'express';
import { sendMessage } from '../controller/sendMessages.js';

console.log('Controlador sendMessage cargado:', typeof sendMessage);

const messageRouter = express.Router(); 

// Ruta para registrar el paciente
messageRouter.post('/v1/user/message', sendMessage); // Usamos 'messageRouter' para registrar la ruta

export default messageRouter;
