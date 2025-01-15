import express from 'express';
import { patientRegister, login, addNewAdmin, getAllDoctors, getUserDetails, logoutAdmin, logoutPatient, addNewDoctor, loginForDashboard } from '../controller/userController.js';
import { isAdminAuthenticated,isPatientAuthenticated } from '../middleware/auth.js';

const router = express.Router();
router.post('/patient/register', patientRegister);  
router.post('/login', login);  
router.post('/admin/addnew', addNewAdmin);
router.get('/doctors', getAllDoctors);
router.get('/admin/me',getUserDetails);
router.get('/patient/me',getUserDetails);
router.get('/admin/logout',logoutAdmin);
router.get('/patient/logout',logoutPatient);
router.post('/doctor/addnew',addNewDoctor);
router.post("/dashboard/login", loginForDashboard);






export default router;
    