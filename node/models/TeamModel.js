//importamos la conexión a la DB
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const TeamModel = db.define('teams', {
    id: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: { type: DataTypes.STRING },
    id_leader: { type: DataTypes.STRING },
    id_project: { type: DataTypes.STRING }
},{
    timestamps:false
});

 export default TeamModel;