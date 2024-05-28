import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const DisqualifiedModel = db.define('project_disqualified', {
    id_project: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'projects',
            key: 'id'
        }
    },
    id_admin: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'admins',
            key: 'id'
        }
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true,
    tableName: 'project_disqualified', // Ensure the correct table name
});

export default DisqualifiedModel;
