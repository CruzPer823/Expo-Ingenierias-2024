// teamMemberRoutes.js
import express from 'express';
import { getTeamMembersByTeamId } from '../controllers/TeamMemberController.js';

const router = express.Router();

router.get('/teamMembers/team/:id', getTeamMembersByTeamId);

export default router;
