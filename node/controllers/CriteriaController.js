import Criteria from '../models/CriteriaModel.js';

async function fetchAllCriterias(req, res) {
  try {
    const criterias = await Criteria.findAll({
      order: [['id', 'ASC']]  // Ordenar por ID ascendente
    });
    res.json(criterias);
  } catch (error) {
    console.error('Error al obtener los criterios:', error);
    res.status(500).json({ error: 'Error al obtener los criterios.' });
  }
}

export { fetchAllCriterias };
