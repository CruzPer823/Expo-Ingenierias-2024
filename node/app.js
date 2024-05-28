import config from './config.js'
import cron from "node-cron"
import express  from "express"
import cors from 'cors'
import session from 'express-session'
import SequelizeStore from 'connect-session-sequelize'

//importamos la conexión a la DB
import db from "./database/db.js"

//importamos nuestro enrutador

//hay que importar las rutas de admin
import UserRoutes from './routes/UserRoutes.js';
import CategorysRoutes from './routes/CategorysRoutes.js';
import StudentsRoutes from './routes/StudentsRoutes.js';
import ProjectsRoutes from './routes/ProjectsRoutes.js';
import AnnounsRoutes from './routes/AnnounsRoutes.js';
import AdminRoutes from "./routes/AdminRoutes.js";
//rutas de edicion
import EditionRoutes from "./routes/EditionRoutes.js";

// las rutas de juez
import CriteriaRoutes from './routes/CriteriaRoutes.js';
import ProjectRoutes from './routes/ProjectRoutes.js';
import CategoryRoutes from './routes/CategoryRoutes.js';
import AreaRoutes from './routes/AreaRoutes.js';
import CriteriaJudgeRoutes from './routes/CriteriaJudgeRoutes.js'; 
import CommentRoutes from './routes/CommentRoutes.js';
import JudgeProjectRoutes from './routes/JudgeProjectRoutes.js';
import StudentRoutes from './routes/StudentRoutes.js';
import PersonRoutes from './routes/PersonRoutes.js';
import TeamRoutes from './routes/TeamRoutes.js';
import TeamMemberRoutes from './routes/TeamMemberRoutes.js';
import AnnounRoutes from './routes/AnnounRoutes.js';


const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Adimn Routes
app.use('/users', UserRoutes);
app.use('/categories', CategorysRoutes);

// Judge Routes
app.use('/projects', ProjectsRoutes);
app.use('/students', StudentsRoutes);
app.use('/announ', AnnounsRoutes);
app.use('/Admin',  AdminRoutes);
app.use('/Ediciones',EditionRoutes);


// JUDGE ROUTES
app.use('/api', CriteriaRoutes);
app.use('/api', ProjectRoutes);
app.use('/api', CategoryRoutes);
app.use('/api', AreaRoutes);
app.use('/api', CriteriaJudgeRoutes);
app.use('/api', CommentRoutes); 
app.use('/api', JudgeProjectRoutes); 
app.use('/api', StudentRoutes);
app.use('/api', PersonRoutes);
app.use('/api', TeamRoutes);
app.use('/api', TeamMemberRoutes);
app.use('/api', AnnounRoutes);

//console.log(process.env.DB_CONNECTION_STRING)

try {
    await db.authenticate()
    console.log('Conexión exitosa a la DB')
} catch (error) {
    console.log(`El error de conexión es: ${error}`)
}


const sessionStore = SequelizeStore(session.Store)
const store = new sessionStore({db:db})


app.listen(8000, ()=>{
    console.log('Server UP running in http://localhost:8000/')
})
