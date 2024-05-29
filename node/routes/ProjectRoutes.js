import express from 'express';
import Project from '../models/ProjectModel.js';
import { deleteProject, getAllProjects, getProject, handleRegister, handleEdition, handleResumen, getProjectsByResponsable,getAllProjectsByAreas, updateProject, handleMaterials, getProjectCertificate, fetchProjectById} from '../controllers/ProjectController.js'
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

//Obtener todos los proyectos
router.get('/', getAllProjects);
router.get('/catalogue', getAllProjectsByAreas );
//Obtener un solo proyecto por su id
router.get('/resume/:id', getProject);

//router.put('/:id', updateProject);
router.delete('/delete/:id', deleteProject);

router.put('/update/:id',updateProject);

router.all('/editionProject/:id', handleEdition)

router.all('/resumeProject/:id', handleResumen)

router.all('/certificate/:id_person',getProjectCertificate);

//Registro del proyecto
router.all('/register', handleRegister)

router.all('/materials/:id', handleMaterials)

router.get('/responsable/:id_responsable', getProjectsByResponsable);





export default router;