// models/criteria_judges.js
import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const CriteriaJudge = sequelize.define('criteria_judges', {
  id_person: {
    type: DataTypes.STRING(50),
    allowNull: false,
    primaryKey: true,  // Asumiendo que combinaremos esta clave primaria con otras columnas para hacer una clave compuesta
  },
  id_criteria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,  // Parte de la clave compuesta
  },
  grade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_project: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,  // Parte de la clave compuesta
  },
  Comentario: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
});

export default CriteriaJudge;
