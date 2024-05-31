// routes/commentRoutes.js
import express from 'express';
import { createComment, fetchAllComments, fetchCommentByPersonAndProject, fetchCommentsByProject } from '../controllers/JudgeXCommentController.js';

const router = express.Router();

// Ruta para crear un nuevo comentario
router.post('/createComment', createComment);

// Ruta para obtener todos los comentarios
router.get('/fetchComments', fetchAllComments);

router.get('/fetchComments/project/:id_project', fetchCommentsByProject);

// Ruta para obtener comentarios por id_persona y id_project
router.get('/fetchComment/:id_person/:id_project', fetchCommentByPersonAndProject);

// Ruta para obtener comentarios por id_project

export default router;
