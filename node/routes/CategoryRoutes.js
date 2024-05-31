import express from 'express';
import { getAllCategories, getCategoryProjectData } from '../controllers/CategoryController.js';

const router = express.Router();

// Ruta para obtener todas las categorías
router.get('/categories', getAllCategories);

router.get('/getCategoriesDoughnut/ChartData', getCategoryProjectData);

export default router;
