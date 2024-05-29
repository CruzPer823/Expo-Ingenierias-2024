// config.js
import dotenv from 'dotenv';
dotenv.config();

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DB_PASSWORD = process.env.DB_PASSWORD;
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET

export default { 
    DB_CONNECTION_STRING,
    DB_PASSWORD,
    AUTH0_DOMAIN,
    AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET
};