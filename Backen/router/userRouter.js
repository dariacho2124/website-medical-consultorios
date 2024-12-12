import express from 'express';
import { patientRegister, login } from '../controller/userController.js';

const router = express.Router();

// Asegúrate de que las rutas estén correctamente configuradas
router.post('/patient/register', patientRegister); // Ruta para registrar paciente
router.post('/login', login);  // Ruta para hacer login

export default router;
