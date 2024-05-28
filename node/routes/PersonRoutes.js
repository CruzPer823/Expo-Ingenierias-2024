import express from 'express';
import { fetchAllPersons, fetchPersonById } from '../controllers/PersonController.js';

const router = express.Router();

router.get('/persons', fetchAllPersons);
router.get('/persons/:id', fetchPersonById);

export default router;
