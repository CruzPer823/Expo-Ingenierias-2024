import config from '../config.js'
import {Sequelize} from 'sequelize'
import oracledb from 'oracledb';



//BASE DE DATOS ORACLE
/*
const db = new Sequelize({
    dialect: 'oracle',
    username: 'admin',
    password: config.DB_PASSWORD,
    dialectOptions: {   
        connectString: config.DB_CONNECTION_STRING,
        dialectModule: oracledb
    },
    logging: console.log
});*/


const db = new Sequelize('expoingenieria', 'postgres', '12345', {
    host: 'localhost',
    dialect: 'postgres'
});



export default db