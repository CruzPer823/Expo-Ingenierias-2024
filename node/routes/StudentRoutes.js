import express from 'express';
import { fetchAllStudents , findStudentById } from '../controllers/StudentController.js';

const router = express.Router();

router.get('/students', fetchAllStudents);
router.get('/students/:id', findStudentById);

export default router;
