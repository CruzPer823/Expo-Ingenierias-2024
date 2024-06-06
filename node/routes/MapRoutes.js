import express from 'express';
import { getMap } from '../controllers/MapController.js';

const router = express.Router();

router.get('/getMap/:id', getMap);

export default router;
