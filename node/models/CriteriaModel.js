import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const CriteriaModel = sequelize.define('criterias', {
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
  }},
{timestamps:true});

export default CriteriaModel;