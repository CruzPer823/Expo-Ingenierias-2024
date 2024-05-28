import db from "../database/db.js";

import { DataTypes } from "sequelize";

const AnnounModel = db.define('announcements', {
    id: { 
        type: DataTypes.STRING,
        primaryKey: true
    },
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING }, 
    audience: { type: DataTypes.STRING },
    multimedia: {type: DataTypes.STRING},
    createdAt: {type: DataTypes.STRING},
    updatedAt: {type: DataTypes.STRING}
});
         
export default AnnounModel;