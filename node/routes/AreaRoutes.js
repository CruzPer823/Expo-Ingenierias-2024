import express from 'express';
import { getAllAreas } from '../controllers/AreasControllers.js  ';

const router = express.Router();

router.get('/allareas', getAllAreas);

export default router;
