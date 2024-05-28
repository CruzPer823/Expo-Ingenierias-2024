// Importar Express y controladores
import express from 'express';
import { fetchAllTeams, fetchTeamById, fetchTeamsByLeaderId } from '../controllers/TeamController.js';

const router = express.Router();

// Definir las rutas para los equipos
router.get('/teams', fetchAllTeams);
router.get('/teams/:id', fetchTeamById);
router.get('/teams/leader/:id_leader', fetchTeamsByLeaderId);

export default router;
