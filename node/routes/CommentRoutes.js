// routes/commentRoutes.js
import express from 'express';
import { createComment, fetchAllComments, fetchCommentByPersonAndProject, fetchCommentsByProject } from '../controllers/CommentController.js';

const router = express.Router();

// Ruta para crear un nuevo comentario
router.post('/comments', createComment);

// Ruta para obtener todos los comentarios
router.get('/comments', fetchAllComments);

router.get('/comments/project/:id_project', fetchCommentsByProject);

// Ruta para obtener comentarios por id_persona y id_project
router.get('/comments/:id_person/:id_project', fetchCommentByPersonAndProject);

// Ruta para obtener comentarios por id_project

export default router;
