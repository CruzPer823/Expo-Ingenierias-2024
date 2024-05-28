// Importar Sequelize y DataTypes
import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

// Definir el modelo Team
const Team = sequelize.define('teams', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
  id_leader: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  id_project: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

export default Team;
