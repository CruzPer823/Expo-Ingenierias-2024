//importamos la conexión a la DB
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";


const ProjectModel = db.define('projects', {
    id: { 
        type: DataTypes.STRING,
        autoIncrement: true,
        primaryKey: true
    },
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING(4000) }, // CLOB puede ser representado como STRING con un límite alto en Sequelize
    linkVideo: { type: DataTypes.STRING },
    linkPoster: { type: DataTypes.STRING },
    statusGeneral: { type: DataTypes.STRING },
    statusPoster: { type: DataTypes.STRING },
    statusVideo: { type: DataTypes.STRING },
    id_edition: {type: DataTypes.INTEGER},
    id_area: { type: DataTypes.INTEGER},
    id_category: { type: DataTypes.INTEGER},
    id_lider: { type: DataTypes.STRING},
    id_responsable: { type: DataTypes.STRING},
    finalGrade: {type: DataTypes.FLOAT},

},
{timestamps:false});

 export default ProjectModel;
