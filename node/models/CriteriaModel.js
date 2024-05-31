import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const CriteriaModel = db.define('criterias', {
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