//importamos la conexión a la DB
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const MaterialModel = db.define('materials', {
    id: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: { type: DataTypes.STRING }
});

export default MaterialModel;