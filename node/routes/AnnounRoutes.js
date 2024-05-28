import express from 'express'
import { getAllAnnouns, getAnnoun } from '../controllers/AnnounController.js'

const router = express.Router()

router.get('/announs', getAllAnnouns);

router.get('/announs/:id', getAnnoun);

export default router;