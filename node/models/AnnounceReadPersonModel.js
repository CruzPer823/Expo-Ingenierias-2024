// Importar la conexión a la base de datos
import db from "../database/db.js";

// Importar sequelize y DataTypes
import { DataTypes } from "sequelize";

// Definir el modelo para la tabla auxiliar
const AnnounceReadPersonModel = db.define('announ_read_persons', {
    id_announce: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'announcements',
            key: 'id'
        }
    },
    id_person: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'persons',
            key: 'id'
        }
    }

}, {
    tableName: 'announ_read_person'
});

// Exportar el modelo
export default AnnounceReadPersonModel;