import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const PersonModel = db.define('persons', {
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
  email: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: db.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: db.NOW,
  },
  isJudge: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ISACTIVE: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

export default PersonModel;