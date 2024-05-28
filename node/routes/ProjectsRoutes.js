import express from 'express';
import { deleteProject, disqualifyProject, getAllProjects, getProject, handleRegister, handleEdition, handleResumen, getProjectsByResponsable, getProjectStatusData, getMaterialChecklistItems} from '../controllers/ProjectController.js'

const router = express.Router();

//Obtener todos los proyectos
router.get('/', getAllProjects);
//Obtener un solo proyecto por su id
router.get('/resume/:id', getProject);

// Get the count of reviewed project for the dashboard doughnnut chard
router.get('/getProjectStatusDoughnut/ChartData', getProjectStatusData);
// Get the admin material checklist
router.get('/getMaterialChecklist/Data', getMaterialChecklistItems)

//router.put('/:id', updateProject);
router.delete('/delete/:id', deleteProject);

router.all('/editionProject/:id', handleEdition)

router.all('/resumeProject/:id', handleResumen)

//Registro del proyecto
router.all('/register', handleRegister)
router.get('/responsable/:id_responsable', getProjectsByResponsable);

// Disqualify a project
router.post('/disqualify', disqualifyProject);

export default router;
