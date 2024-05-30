import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const CategoryModel = sequelize.define('categories', {
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
    type: DataTypes.STRING,
    allowNull: true,
  },isActive:{
    type: DataTypes.NUMBER,
    allowNull: true,
  }
},{timestamps:false});

export default CategoryModel;
