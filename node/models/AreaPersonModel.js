// import the connection to the DB
import db from "../database/db.js";
// import sequelize
import { DataTypes } from "sequelize";

const AreaPersonModel = db.define('areas_persons', {
    id_area: { 
        type: DataTypes.INTEGER,
        references: {
            model: 'areas',
            key: 'id'
        }
    },
    id_person: { 
        type: DataTypes.STRING,
        references: {
            model: 'persons',
            key: 'id'
        }
    }
}, {
    tableName: 'areas_persons'
});

export default AreaPersonModel;
