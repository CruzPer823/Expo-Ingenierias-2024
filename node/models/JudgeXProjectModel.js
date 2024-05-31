import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const ProjectModel = db.define('projects', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT, // Usamos TEXT para CLOB
    allowNull: true,
  },
  linkVideo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  linkPoster: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  statusGeneral: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  statusPoster: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  statusVideo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_edition: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_area: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_category: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_lider: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_responsable: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  finalGrade: {
    type: DataTypes.FLOAT,
    allowNull: true
  }
}, {timestamps:false});

export default ProjectModel;