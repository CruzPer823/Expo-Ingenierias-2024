// import the connection to the DB
import db from "../database/db.js";
// import sequelize
import { DataTypes } from "sequelize";

const AreaPersonModel = db.define('areas_persons', {
    id_person: { 
        type: DataTypes.STRING,
        primaryKey: true,
        references: {
            model: 'persons',
            key: 'id'
        }
    },
    id_area: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'areas',
            key: 'id'
        }
    }
}, {
    tableName: 'areas_persons'
});

export default AreaPersonModel;
