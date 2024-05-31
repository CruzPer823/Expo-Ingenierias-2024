// Importar el modelo Team
import TeamModel from '../models/JudgeXTeamModel.js';

// Función para obtener todos los equipos
async function fetchAllTeams(req, res) {
  try {
    const teams = await TeamModel.findAll();
    res.json(teams);
  } catch (error) {
    console.error('Error fetching all teams:', error);
    res.status(500).json({ error: 'Error fetching all teams.' });
  }
}

// Función para obtener un equipo por su ID
async function fetchTeamById(req, res) {
  const { id } = req.params;
  try {
    const team = await TeamModel.findByPk(id);
    if (!team) {
      res.status(404).json({ error: 'Team not found.' });
    } else {
      res.json(team);
    }
  } catch (error) {
    console.error('Error fetching team by id:', error);
    res.status(500).json({ error: 'Error fetching team by id.' });
  }
}

// Función para buscar equipos por id_leader
async function fetchTeamsByLeaderId(req, res) {
  const { id_leader } = req.params;
  try {
    const teams = await TeamModel.findAll({
      where: {
        id_leader
      }
    });
    res.json(teams);
  } catch (error) {
    console.error('Error fetching teams by leader id:', error);
    res.status(500).json({ error: 'Error fetching teams by leader id.' });
  }
}

export { fetchAllTeams, fetchTeamById, fetchTeamsByLeaderId };