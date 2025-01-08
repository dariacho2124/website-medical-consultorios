import express from 'express';
import { patientRegister, login, addNewAdmin, getAllDoctors, getUserDetails, logoutAdmin, logoutPatient, addNewDoctor } from '../controller/userController.js';
import { isAdminAuthenticated,isPatientAuthenticated } from '../middleware/auth.js';

const router = express.Router();
router.post('/patient/register', patientRegister);  
router.post('/login', login);  
router.post('/admin/addnew', addNewAdmin);//AdminAuthenticated, middleware pedniente de revisar 
router.get('/doctors', getAllDoctors);
router.get('/admin/me',getUserDetails);
router.get('/patient/me',getUserDetails);//, isPatientAuthenticated middleware pedniente de revisar 
router.get('/admin/logout',logoutAdmin);
router.get('/patient/logout',logoutPatient);
router.post('/doctor/addnew',addNewDoctor);






export default router;
    