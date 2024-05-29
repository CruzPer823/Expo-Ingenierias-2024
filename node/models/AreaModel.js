//importamos la conexión a la DB
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const AreaModel = db.define('areas', {
    id: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING }, 
});

export default AreaModel;