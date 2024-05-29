import express from 'express'
import { getAllAnnouns, getAnnoun } from '../controllers/AnnounController.js'

const router = express.Router()

router.get('/', getAllAnnouns);

router.get('/:id', getAnnoun);

export default router;