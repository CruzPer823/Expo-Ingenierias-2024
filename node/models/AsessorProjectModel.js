// Importar la conexión a la base de datos
import db from "../database/db.js";

// Importar sequelize y DataTypes
import { DataTypes } from "sequelize";

// Definir el modelo para la tabla auxiliar
const AsessorProjectModel = db.define('asessor_projects', {
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
    }
}, {
    tableName: 'asessor_projects'
});

// Exportar el modelo
export default AsessorProjectModel;
