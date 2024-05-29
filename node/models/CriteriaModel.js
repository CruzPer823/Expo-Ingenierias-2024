import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const CriteriaModel = db.define('criterias', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    description: {type: DataTypes.STRING},
    weight: {type: DataTypes.INTEGER},
});

export default CriteriaModel;