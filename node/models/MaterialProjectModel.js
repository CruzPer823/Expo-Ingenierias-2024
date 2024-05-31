// Importar la conexión a la base de datos
import db from "../database/db.js";

// Importar sequelize y DataTypes
import { DataTypes } from "sequelize";

// Definir el modelo para la tabla auxiliar
const MaterialProjectModel = db.define('materials_projects', {
    id_project: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'projects',
            key: 'id'
        }
    },
    id_material: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'materials',
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'materials_projects'
});

// Exportar el modelo
export default MaterialProjectModel;
