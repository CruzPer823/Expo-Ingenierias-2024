import express from 'express';
import { fetchAllCriterias } from '../controllers/CriteriaController.js';

const router = express.Router();

router.get('/criterias', fetchAllCriterias);

export default router;
