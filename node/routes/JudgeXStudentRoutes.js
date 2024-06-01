import express from 'express'
import { fetchAllStudents , findStudentById } from '../controllers/JudgeXStudentController.js';

const router = express.Router()

router.get('/fetchStudents', fetchAllStudents);
router.get('/fetchStudent/:id', findStudentById);


export default router;