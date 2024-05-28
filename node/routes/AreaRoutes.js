import express from 'express';
import { getAllAreas } from '../controllers/AreaController.js';

const router = express.Router();

router.get('/areas', getAllAreas);

export default router;
