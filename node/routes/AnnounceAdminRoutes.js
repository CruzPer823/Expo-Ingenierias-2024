import express from 'express'
import { createAnnounce, updateAnnounce,deleteAnnounce } from '../controllers/AnnounceAdminController.js'

const router = express.Router()

router.post('/create',createAnnounce);

router.put('/update/:id',updateAnnounce);

router.delete('/delete/:id',deleteAnnounce);

export default router;