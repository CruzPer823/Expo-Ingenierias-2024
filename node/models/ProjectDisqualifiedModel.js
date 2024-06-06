// Importar la conexión a la base de datos
import db from "../database/db.js";

// Importar sequelize y DataTypes
import { DataTypes } from "sequelize";

// Definir el modelo para la tabla auxiliar
const ProjectDisqualifiedModel = db.define('project_disqualified', {
    id_admin: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'admins',
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
    reason: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    tableName: 'project_disqualified',
});

// Exportar el modelo
export default ProjectDisqualifiedModel;