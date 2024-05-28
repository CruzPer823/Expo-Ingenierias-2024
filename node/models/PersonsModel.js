//importamos la conexión a la DB
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const PersonModel = db.define('persons', {
    id: { 
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING }, // CLOB puede ser representado como STRING con un límite alto en Sequelize
    email: { type: DataTypes.STRING },
    isJudge: {type: DataTypes.INTEGER}
});

 export default PersonModel