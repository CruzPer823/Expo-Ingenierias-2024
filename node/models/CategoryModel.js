//importamos la conexión a la DB
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const CategoryModel = db.define('categories', {
    id: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING }, 
});

export default CategoryModel;