import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const CommentsModel = db.define('comments', {
    id_person: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    id_project: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    comment: {type: DataTypes.TEXT}
});

export default CommentsModel;