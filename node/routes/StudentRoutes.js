import express from 'express'
import { createStudent, deleteStudent, getAllStudents, getStudent, updateStudent } from '../controllers/StudentController.js'

const router = express.Router()

router.get('/', getAllStudents);
router.get('/:id', getStudent);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);



export default router;