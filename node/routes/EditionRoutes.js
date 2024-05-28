import express from 'express'
import { getAllEditions, downloadHistoric } from '../controllers/EditionController.js';

const router = express.Router()

router.get('/',getAllEditions);
router.get('/export/:id', downloadHistoric);

export default router;