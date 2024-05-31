import express from 'express';
import { fetchAllPersons, fetchPersonById } from '../controllers/JudgeXPersonController.js';

const router = express.Router();

router.get('/fetchPersons', fetchAllPersons);
router.get('/fetchPerson/:id', fetchPersonById);

export default router;