//importamos la conexión a la DB
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const EditionModel = db.define('editions', {
    id: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    period: { type: DataTypes.INTEGER },
    year: { type: DataTypes.INTEGER }, 
});

 export default EditionModel;