// models/judgeProject.js
import { DataTypes } from 'sequelize';
import  db  from '../database/db.js';

const JudgeProjectModel = db.define('judge_projects', {
  id_person: {
    type: DataTypes.STRING(50),
    allowNull: false,
    primaryKey: true
  },
  id_project: {
    type: DataTypes.STRING(15),
    allowNull: false,
    primaryKey: true
  }
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

export default JudgeProjectModel;
