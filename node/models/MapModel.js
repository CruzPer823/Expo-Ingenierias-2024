// Importar la conexión a la base de datos
import db from "../database/db.js";

// Importar sequelize y DataTypes
import { DataTypes } from "sequelize";

// Definir el modelo para la tabla auxiliar
const MapModel = db.define('maps', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    map_image: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

// Exportar el modelo
export default MapModel;
