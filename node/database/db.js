import config from '../config.js'
import { Sequelize } from "sequelize";
import oracledb from 'oracledb';

const db = new Sequelize({
    dialect: 'oracle',
    username: 'admin',
    password: config.DB_PASSWORD,
    dialectOptions: {   
        connectString: config.DB_CONNECTION_STRING,
        dialectModule: oracledb
    },
    logging: console.log
});




export default db