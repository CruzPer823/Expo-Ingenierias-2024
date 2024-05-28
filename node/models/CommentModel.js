// models/comment.js
import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const Comment = sequelize.define('comments', {
  id_person: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey : true,
  },
  id_project: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey : true,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
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
});

export default Comment;
