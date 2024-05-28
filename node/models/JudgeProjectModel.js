// models/judgeProject.js
import { DataTypes } from 'sequelize';
import  sequelize  from '../database/db.js';

const JudgeProject = sequelize.define('judge_projects', {
  id_person: {
    type: DataTypes.STRING(50),
    allowNull: false,
    primaryKey: true
  },
  id_project: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

export default JudgeProject;
