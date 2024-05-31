import express from 'express'
import { getAllCategories, getCategoryProjectData } from "../controllers/CategoryController.js"
import { getAllAnnouns, getAnnoun } from '../controllers/AnnounController.js'
import { fetchAllCriterias } from '../controllers/CriteriaController.js';
import { fetchAllCriteriaJudges, createCriteriaJudge, fetchCriteriaGrade } from '../controllers/CriteriaJudgeController.js';
import { fetchProjectById } from '../controllers/JudgeXProjectController.js';
import ProjectModel from '../models/JudgeXProjectModel.js';
import { createJudgeProject, fetchAllJudgeProjects, fetchJudgeProjectsByPersonId } from '../controllers/JudgeProjectController.js';
import { getAllAreas } from '../controllers/JudgeXAreaController.js';
import { createComment, fetchAllComments, fetchCommentByPersonAndProject, fetchCommentsByProject } from '../controllers/JudgeXCommentController.js';
import { fetchAllStudents , findStudentById } from '../controllers/JudgeXStudentController.js';
import { fetchAllPersons, fetchPersonById } from '../controllers/JudgeXPersonController.js';
import { fetchAllTeams, fetchTeamById, fetchTeamsByLeaderId } from '../controllers/JudgeXTeamController.js';
import { getTeamMembersByTeamId } from '../controllers/TeamMemberController.js';

const router = express.Router()

// Rutas de Categorias
router.get('/getCategories', getAllCategories);
router.get('/getCategoriesDoughnut/ChartData', getCategoryProjectData);

// Rutas de Anuncios
router.get('/getAnnouns', getAllAnnouns);
router.get('/getAnnoun/:id', getAnnoun);

// Rutas de Criterios
router.get('/fetchCriterias', fetchAllCriterias);

// Rutas de Criterios y Juez
router.get('/fetchCriteriaJudge', fetchAllCriteriaJudges);
router.post('/createCriteriaJudge', createCriteriaJudge);
router.get('/fetchGrade/:id_criteria/:id_person/:id_project', fetchCriteriaGrade);

// Rutas de Proyectos
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

// Rutas de Juez y Proyectos
router.post('/createJudgeProject', createJudgeProject);
router.get('/fetchJudgesProjects', fetchAllJudgeProjects);
router.get('/fetchJudgeProject/:idpersona', fetchJudgeProjectsByPersonId);

// Rutas de Areas
router.get('/getAreas', getAllAreas);

// Rutas de Comentarios
router.post('/createComment', createComment);
router.get('/fetchComments', fetchAllComments);
router.get('/fetchComments/project/:id_project', fetchCommentsByProject);
router.get('/fetchComment/:id_person/:id_project', fetchCommentByPersonAndProject);

// Rutas de Estudiantes
router.get('/fetchStudents', fetchAllStudents);
router.get('/fetchStudent/:id', findStudentById);

// Rutas de Personas
router.get('/fetchPersons', fetchAllPersons);
router.get('/fetchPerson/:id', fetchPersonById);

// Rutas de Equipos
router.get('/fetchTeams', fetchAllTeams);
router.get('/fetchTeam/:id', fetchTeamById);
router.get('/fetchTeam/leader/:id_leader', fetchTeamsByLeaderId);

// Rutas de Miembros de Equipo
router.get('/getMembers/team/:id', getTeamMembersByTeamId);

export default router;