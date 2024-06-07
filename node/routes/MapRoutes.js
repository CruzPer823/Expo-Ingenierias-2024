import express from 'express';
import { getMap,updateMap } from '../controllers/MapController.js';

const router = express.Router();

router.get('/get/map/:id', getMap);
router.put('/updateMap/:id',updateMap);

export default router;
