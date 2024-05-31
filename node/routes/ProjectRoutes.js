import express from 'express';
import { deleteProject, disqualifyProject, getAllProjects, getProject, handleRegister, handleEdition, handleResumen, 
    getProjectsByResponsable, getProjectStatusData, getMaterialChecklistItems,getProjectAdmin, getAllProjectsByAreas, updateProject, getProjectCertificate, handleMaterials
} from '../controllers/ProjectController.js'

const router = express.Router();

/* Estudiante y Profesor */
//Obtener todos los proyectos
router.get('/', getAllProjects);

router.get('/catalogue', getAllProjectsByAreas );

router.get('/resume/student/:id', getProject);
//Obtener un solo proyecto por su id
router.get('/resume/:id', getProjectAdmin);

router.delete('/delete/:id', deleteProject);

router.put('/update/:id',updateProject);

router.all('/editionProject/:id', handleEdition)

router.all('/resumeProject/:id', handleResumen)

router.all('/certificate/:id_person',getProjectCertificate);

router.put('/:id', updateProject);

//Registro del proyecto
router.all('/register', handleRegister)

router.all('/materials/:id', handleMaterials)

router.get('/responsable/:id_responsable', getProjectsByResponsable);

/* Juez y Admin */

// Get the count of reviewed project for the dashboard doughnnut chard
router.get('/getProjectStatusDoughnut/ChartData', getProjectStatusData);
// Get the admin material checklist
router.get('/getMaterialChecklist/Data', getMaterialChecklistItems)


// Disqualify a project
router.post('/disqualify', disqualifyProject);

export default router;
