import express from 'express';
import { getAllAreas } from '../controllers/JudgeXAreaController.js';

const router = express.Router();

router.get('/getAreas', getAllAreas);

export default router;
