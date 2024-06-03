import express from 'express'
import { getAllAnnouns, getAnnoun, createReadAnnoun, countReadAnnouncements } from '../controllers/AnnounController.js'

const router = express.Router()

router.get('/announs', getAllAnnouns);

router.get('/announs/:id', getAnnoun);

router.get('/', getAllAnnouns);

router.get('/:id', getAnnoun);

router.post('/readAnnounce', createReadAnnoun)

router.get('/countReadAnnouncements/:id_student', countReadAnnouncements)

export default router;