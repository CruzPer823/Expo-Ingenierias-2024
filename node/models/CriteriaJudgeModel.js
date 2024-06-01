// models/criteria_judges.js
import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const CriteriaJudgeModel = db.define('criteria_judges', {
  id_person: {
    type: DataTypes.STRING(50),
    allowNull: false,
    primaryKey: true,  // Asumiendo que combinaremos esta clave primaria con otras columnas para hacer una clave compuesta
  },
  id_criteria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,  // Parte de la clave compuesta
    references: {
        model: 'criterias',
        key: 'id'
    }
  },
  grade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_project: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,  // Parte de la clave compuesta
    references: {
        model: 'projects',
        key: 'id'
    }
  },
  Comentario: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  timestamps: true,
}, {
    tableName: 'criteria_judges'
});

export default CriteriaJudgeModel;