import CriteriaJudge from '../models/CriteriaJudgeModel.js';

// Función para obtener todos los criterios de jueces ordenados de manera ascendente por id_person
async function fetchAllCriteriaJudges(req, res) {
  try {
    const criteriaJudges = await CriteriaJudge.findAll({
      order: [['id_person', 'ASC']]
    });
    res.json(criteriaJudges);
  } catch (error) {
    console.error('Error al obtener los criterios de jueces:', error);
    res.status(500).json({ error: error.message });
  }
}

// Función para crear un nuevo criterio de juez
async function createCriteriaJudge(req, res) {
  try {
    const criteriaJudge = await CriteriaJudge.create(req.body);
    res.status(201).json(criteriaJudge);
  } catch (error) {
    console.error('Error al crear el criterio de juez:', error);
    res.status(500).json({ error: error.message });
  }
}

// Función para obtener la calificación de un criterio específico por id_criteria, id_person, y id_project
async function fetchCriteriaGrade(req, res) {
  const { id_criteria, id_person, id_project } = req.params;

  console.log('id_criteria:', id_criteria);
  console.log('id_person:', id_person);
  console.log('id_project:', id_project);

  if (!id_criteria || !id_person || !id_project) {
    res.status(400).json({ error: 'Missing required parameters' });
    return;
  }

  try {
    const criteriaJudge = await CriteriaJudge.findOne({
      where: {
        id_criteria,
        id_person,
        id_project
      }
    });

    if (criteriaJudge) {
      res.json(criteriaJudge);
    } else {
      res.status(404).json({ error: 'Criterio no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener la calificación del criterio:', error);
    res.status(500).json({ error: error.message });
  }
}

export { fetchAllCriteriaJudges, createCriteriaJudge, fetchCriteriaGrade };
