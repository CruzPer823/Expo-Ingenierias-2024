import express from 'express'
import { createAnnounce, updateAnnounce,deleteAnnounce,getAllAnnounces,getAnnounce } from '../controllers/AnnounceAdminController.js'
import { updateCategory,createCategory,getAllCategories,getCategoryById,inhabilitateCategory } from '../controllers/CategoryController.js';
import { updateArea,createArea,getAllAreas,deleteArea,getAresById,inhabilitateArea } from '../controllers/AreasControllers.js';

import { getAreaJudge, getAllJudges } from '../controllers/PersonController.js';
import { getProjectJudges, removeProjectJudge, assignProjectJudge } from '../controllers/ProjectController.js';

const router = express.Router()
// Rutas de anuncios
router.get('/Announces/',getAllAnnounces);
router.get('/Announces/:id',getAnnounce);
router.post('/Announce/create',createAnnounce);
router.put('/Announce/update/:id',updateAnnounce);
router.delete('/Announce/delete/:id',deleteAnnounce);
// Rutas de categorias
router.get('/categories/',getAllCategories);
router.get('/Categories/:id',getCategoryById);
router.put('/Categories/update/:id',updateCategory);
router.post('/Categories/create',createCategory);
router.patch('/Categories/inhabilitate/:id',inhabilitateCategory);

//Rutas de areas
router.get('/Areas',getAllAreas);
router.get('/Areas/:id', getAresById);
router.post('/Areas/create',createArea);
router.put('/Areas/update/:id',updateArea);
router.patch('/Areas/inhabilitate/:id',inhabilitateArea);

//Judges Routes
router.get('/getJudges/:areaId', getAreaJudge); // query string (?projectId=<project.id>)
router.get('/getAllJudges', getAllJudges); // query string (?projectId=<project.id>)

// Projects Routes
router.get('/getProjectJudges', getProjectJudges); // query string (?projectId=<project.id>)
router.delete('/remove/projects/:projectId/judges/:judgeId', removeProjectJudge) // query string (?projectId=<project.id>&judgeId=<person.id>)
router.post('/assignProjectJudge', assignProjectJudge);


export default router;