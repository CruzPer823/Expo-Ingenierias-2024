// Importar Express y controladores
import express from 'express';
import { fetchAllTeams, fetchTeamById, fetchTeamsByLeaderId } from '../controllers/JudgeXTeamController.js';

const router = express.Router();

// Definir las rutas para los equipos
router.get('/fetchTeams', fetchAllTeams);
router.get('/fetchTeam/:id', fetchTeamById);
router.get('/fetchTeam/leader/:id_leader', fetchTeamsByLeaderId);

export default router;