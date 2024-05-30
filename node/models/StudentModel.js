//importamos la conexión a la DB
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const StudentModel = db.define('students', {
    id: { 
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING }, // CLOB puede ser representado como STRING con un límite alto en Sequelize
    enrollment: { type: DataTypes.STRING }, 
    isActive: { type: DataTypes.INTEGER }
},{timestamps:false});

 export default StudentModel