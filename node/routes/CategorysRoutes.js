// routes/categoryRoutes.js
import express from 'express';
import { getCategoryProjectData } from '../controllers/CategoryController.js';

const router = express.Router();

router.get('/getCategoriesDoughnut/ChartData', getCategoryProjectData);

export default router;