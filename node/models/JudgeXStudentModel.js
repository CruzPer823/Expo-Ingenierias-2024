import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const StudentModel = db.define('students', {
  id: {
    type: DataTypes.STRING(50),
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  enrollment: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  isActive: { 
    type: DataTypes.INTEGER,
    allowNull: false, 
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
});

export default StudentModel;