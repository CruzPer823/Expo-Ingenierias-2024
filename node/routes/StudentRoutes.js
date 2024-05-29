import express from 'express';
import { fetchAllStudents , findStudentById } from '../controllers/StudentController.js';
import { createStudent, deleteStudent, getAllStudents, getStudent, updateStudent } from '../controllers/StudentController.js'

const router = express.Router();

router.get('/students', fetchAllStudents);
router.get('/students/:id', findStudentById);


router.get('/', getAllStudents);
router.get('/:id', getStudent);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);



export default router;
