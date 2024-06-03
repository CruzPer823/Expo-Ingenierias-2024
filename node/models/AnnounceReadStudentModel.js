// Importar la conexión a la base de datos
import db from "../database/db.js";

// Importar sequelize y DataTypes
import { DataTypes } from "sequelize";

// Definir el modelo para la tabla auxiliar
const AnnounceReadStudentModel = db.define('announ_read_students', {
    id_announce: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'announcements',
            key: 'id'
        }
    },
    id_student: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'students',
            key: 'id'
        }
    }

}, {
    tableName: 'announ_read_student'
});

// Exportar el modelo
export default AnnounceReadStudentModel;
