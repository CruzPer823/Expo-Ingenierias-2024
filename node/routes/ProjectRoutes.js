import express from 'express';
import Project from '../models/ProjectModel.js';
import { fetchProjectById } from '../controllers/ProjectController.js';

const router = express.Router();

// Ruta para obtener todos los proyectos
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    console.error('Error al obtener los proyectos:', error);
    res.status(500).json({ error: 'Error al obtener los proyectos.' });
  }
});

router.get('/projects/:id', async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await fetchProjectById(projectId);
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;