// teamMember.js
import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const TeamMember = sequelize.define('team_members', {
  id_team: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  id_member: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.NOW,
  },
}, {
  timestamps: true, // Esto asegura que createdAt y updatedAt se incluyan automáticamente
  createdAt: 'createdAt', // Nombre de la columna createdAt en la base de datos
  updatedAt: 'updatedAt', // Nombre de la columna updatedAt en la base de datos
});

export default TeamMember;
