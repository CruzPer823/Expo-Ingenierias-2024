import express from 'express';
import ProjectModel from '../models/JudgeXProjectModel.js';
import { fetchProjectById } from '../controllers/JudgeXProjectController.js';

const router = express.Router();

// Ruta para obtener todos los proyectos
router.get('/fetchProjects', async (req, res) => {
  try {
    const projects = await ProjectModel.findAll();
    res.json(projects);
  } catch (error) {
    console.error('Error al obtener los proyectos:', error);
    res.status(500).json({ error: 'Error al obtener los proyectos.' });
  }
});

router.get('/fetchProject/:id', async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await fetchProjectById(projectId);
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;