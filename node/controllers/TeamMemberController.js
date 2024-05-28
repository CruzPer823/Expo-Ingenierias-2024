// teamMemberController.js
import TeamMember from '../models/TeamMemberModel.js';

async function getTeamMembersByTeamId(req, res) {
  const { id } = req.params;
  try {
    const teamMembers = await TeamMember.findAll({
      where: {
        id_team: id,
      },
      attributes: ['id_team', 'id_member', 'createdAt', 'updatedAt'], // Aquí especificamos las columnas que deseamos seleccionar
    });
    res.json(teamMembers);
  } catch (error) {
    console.error('Error fetching team members by team id:', error);
    res.status(500).json({ error: 'Error fetching team members by team id.' });
  }
}

export { getTeamMembersByTeamId };
