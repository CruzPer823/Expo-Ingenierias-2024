import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const Criteria = sequelize.define('criterias', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
  weight: {
    type: DataTypes.INTEGER, 
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
});

export default Criteria;
