import db from "../database/db.js";

import { DataTypes } from "sequelize";

const CategoryModel = db.define('categories', {
    id: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING }, 
    isActive: {type:DataTypes.NUMBER}
});

export default CategoryModel;