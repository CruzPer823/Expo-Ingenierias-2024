import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const Project = sequelize.define('projects', {
  id: {
    type: DataTypes.INTEGER,
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
});

export default Project;
