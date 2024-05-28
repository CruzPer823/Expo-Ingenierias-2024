import JudgeProject from '../models/JudgeProjectModel.js';

// Crear un nuevo registro de relación entre juez y proyecto
async function createJudgeProject(req, res) {
  const { id_person, id_project } = req.body;

  try {
    const newJudgeProject = await JudgeProject.create({
      id_person,
      id_project
    });
    res.status(201).json(newJudgeProject);
  } catch (error) {
    console.error('Error al crear la relación juez-proyecto:', error);
    res.status(500).json({ error: 'Error al crear la relación juez-proyecto' });
  }
}

// Obtener todos los registros de relación entre juez y proyecto
async function fetchAllJudgeProjects(req, res) {
  try {
    const judgeProjects = await JudgeProject.findAll();
    res.status(200).json(judgeProjects);
  } catch (error) {
    console.error('Error al obtener las relaciones juez-proyecto:', error);
    res.status(500).json({ error: 'Error al obtener las relaciones juez-proyecto' });
  }
}

// Obtener registros de relación entre juez y proyecto por id_persona
async function fetchJudgeProjectsByPersonId(req, res) {
    const id_persona = req.params.idpersona;
  
    try {
      const judgeProjects = await JudgeProject.findAll({
        attributes: ['id_project'], // Solo recuperar los IDs de los proyectos
        where: { id_person: id_persona }
      });
  
      // Extraer solo los IDs de los proyectos
      const projectIds = judgeProjects.map(judgeProject => judgeProject.id_project);
  
      res.status(200).json(projectIds);
    } catch (error) {
      console.error('Error al obtener las relaciones juez-proyecto por id_persona:', error);
      res.status(500).json({ error: 'Error al obtener las relaciones juez-proyecto por id_persona' });
    }
  }
  

export { createJudgeProject, fetchAllJudgeProjects, fetchJudgeProjectsByPersonId };
