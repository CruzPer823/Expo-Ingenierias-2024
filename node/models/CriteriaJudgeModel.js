// Importar la conexión a la base de datos
import db from "../database/db.js";

// Importar sequelize y DataTypes
import { DataTypes } from "sequelize";

// Definir el modelo para la tabla auxiliar
const CriteriaJudgeModel = db.define('criteria_judges', {
    id_person: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'persons',
            key: 'id'
        }
    },
    id_criteria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'criterias',
            key: 'id'
        }
    },
    grade: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_project: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'projects',
            key: 'id'
        }
    },
    Comentario: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'criteria_judges'
});

// Exportar el modelo
export default CriteriaJudgeModel;
