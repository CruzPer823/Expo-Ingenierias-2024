import express from 'express';
import { createJudgeProject, fetchAllJudgeProjects, fetchJudgeProjectsByPersonId } from '../controllers/JudgeProjectController.js';

const router = express.Router();

// Ruta para crear un nuevo registro de relación entre juez y proyecto
router.post('/judgeProjects', createJudgeProject);

// Ruta para obtener todos los registros de relación entre juez y proyecto
router.get('/judgeProjects', fetchAllJudgeProjects);

// Ruta para obtener registros de relación entre juez y proyecto por id_persona
router.get('/judgeProjects/:idpersona', fetchJudgeProjectsByPersonId);

export default router;
