import express from 'express';
import { fetchAllPersons, fetchPersonById } from '../controllers/PersonController.js';
import {getAllPersons, getStudent,createPerson,updatePerson} from '../controllers/PersonController.js'


const router = express.Router();

router.get('/persons', fetchAllPersons);
router.get('/persons/:id', fetchPersonById);
//Obtener todos los proyectos
router.get('/', getAllPersons);
//Obtener un solo proyecto por su id
router.get('/resume/:id', getStudent);

router.put('/:id', updatePerson);
router.delete('/:id', createPerson);


export default router;
