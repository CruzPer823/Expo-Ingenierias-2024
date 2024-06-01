// Importar Sequelize y DataTypes
import { DataTypes } from 'sequelize';
import db from '../database/db.js';

// Definir el modelo Team
const TeamModel = db.define('teams', {
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
    defaultValue: db.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: db.literal('CURRENT_TIMESTAMP')
  },
  id_leader: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  id_project: {
    type: DataTypes.STRING(15),
    allowNull: false
  }
});

export default TeamModel;