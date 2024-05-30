import db from "../database/db.js";

import { DataTypes } from "sequelize";

const AreaModel = db.define('areas', {
    id: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING }, 
    isActive: {type: DataTypes.NUMBER}
},{timestamps:false});

export default AreaModel;