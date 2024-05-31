import db from "../database/db.js";

import { DataTypes } from "sequelize";

const JudgeAreaModel = db.define('areas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
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
  isActive: {
    type: DataTypes.NUMBER,
    allowNull: true
  }
});

export default JudgeAreaModel;