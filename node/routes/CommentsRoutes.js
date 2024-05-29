import express from 'express'
import {createComment} from '../controllers/CommentController.js'

const router = express.Router()

router.post('/responsable/:id_person/:id_project',createComment);

export default router;