// Importar la conexión a la base de datos
import db from "../database/db.js";

// Importar sequelize y DataTypes
import { DataTypes } from "sequelize";

const JudgeCommentModel = db.define('comments', {
  id_person: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey : true,
  },
  id_project: {
    type: DataTypes.STRING,
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
    defaultValue: db.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: db.NOW,
  },
});

export default JudgeCommentModel;