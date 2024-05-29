import express from 'express'
import { deleteProject, getAllProjects, getProject, handleRegister, handleEdition, handleResumen, getProjectsByResponsable,getAllProjectsByAreas, updateProject, handleMaterials, getProjectCertificate} from '../controllers/ProjectController.js'

const router = express.Router()



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