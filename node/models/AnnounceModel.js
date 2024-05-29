import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const AnnounceModel = db.define('announcements', {
    id: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    description: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    audience: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    multimedia: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true 
});

export default AnnounceModel;
