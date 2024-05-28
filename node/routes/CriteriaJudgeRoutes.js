import express from 'express';
import { fetchAllCriteriaJudges, createCriteriaJudge, fetchCriteriaGrade } from '../controllers/CriteriaJudgeController.js';

const router = express.Router();

router.get('/criteria_judges', fetchAllCriteriaJudges);
router.post('/criteria_judges', createCriteriaJudge);
router.get('/criteria_judges/:id_criteria/:id_person/:id_project', fetchCriteriaGrade);

export default router;
