import express from 'express'
import { getAllAnnouns, getAnnoun } from '../controllers/AnnounController.js'

const router = express.Router()

router.get('/announs', getAllAnnouns);

router.get('/announs/:id', getAnnoun);

router.get('/', getAllAnnouns);

router.get('/:id', getAnnoun);

export default router;