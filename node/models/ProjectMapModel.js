// Importar la conexión a la base de datos
import db from "../database/db.js";

// Importar sequelize y DataTypes
import { DataTypes } from "sequelize";

// Definir el modelo para la tabla auxiliar
const ProjectMapModel = db.define('projects_maps', {
    id_project: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'projects',
            key: 'id'
        }
    },
    coordinates: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_map:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'maps',
            key: 'id'
        }
    },
}, {
    timestamps:true
},{
    tableName: 'projects_maps'
});

// Exportar el modelo
export default ProjectMapModel;
