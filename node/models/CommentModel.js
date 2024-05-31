// Importar la conexión a la base de datos
import db from "../database/db.js";

// Importar sequelize y DataTypes
import { DataTypes } from "sequelize";

const CommentsModel = db.define('comments', {
    id_person: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'persons',
            key: 'id'
        }
    },
    id_project: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'projects',
            key: 'id'
        }
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'comments'
});

export default CommentsModel;
