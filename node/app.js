import config from './config.js'
import cron from "node-cron"
import express  from "express"
import cors from 'cors'

import sendEmail from './mailer.js';

//importamos la conexión a la DB
import db from "./database/db.js"

//importamos nuestro enrutador
import MapRoutes from './routes/MapRoutes.js';
//hay que importar las rutas de admin
import AdminRoutes from "./routes/AdminRoutes.js";
import UserRoutes from './routes/UserRoutes.js';
import CategoryRoutes from './routes/CategoryRoutes.js';
import StudentRoutes from './routes/StudentRoutes.js';
import ProjectRoutes from './routes/ProjectRoutes.js';
import AnnounRoutes from './routes/AnnounRoutes.js';
import CommentRoutes from './routes/CommentRoutes.js';
import PersonRoutes from './routes/PersonRoutes.js';
import EditionRoutes from "./routes/EditionRoutes.js";


// las rutas de juez
//import ProjectRoutes from './routes/ProjectRoutes.js';
import JudgeRoutes from "./routes/JudgeRoutes.js";
import AreaRoutes from './routes/AreaRoutes.js';
import JudgeXAreaRoutes from './routes/JudgeXAreaRoutes.js';
import CriteriaJudgeRoutes from './routes/CriteriaJudgeRoutes.js';
import CriteriaRoutes from './routes/CriteriaRoutes.js'; 
import JudgeXCommentRoutes from './routes/JudgeXCommentRoutes.js'
import JudgeProjectRoutes from './routes/JudgeProjectRoutes.js';
import JudgeXProjectRoutes from './routes/JudgeXProjectRoutes.js';
import JudgeXStudentRoutes from './routes/JudgeXStudentRoutes.js';
import JudgeXPersonRoutes from './routes/JudgeXPersonRoutes.js';
import JudgeXTeamRoutes from './routes/JudgeXTeamRoutes.js';
import TeamMemberRoutes from './routes/TeamMemberRoutes.js';
import AreaPersonRoutes from './routes/AreaPersonRoutes.js'
import main from './middleware/authConfig.js'

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/assets', express.static('assets'));
//general
app.use('/map',MapRoutes);
// Adimn Routes
app.use('/users', UserRoutes);
app.use('/categories', CategoryRoutes);

// Judge Routes
app.use('/Admin',  AdminRoutes);
app.use('/areas', AreaRoutes);
app.use('/projects', ProjectRoutes);
app.use('/students', StudentRoutes);
app.use('/announ', AnnounRoutes);
app.use('/Ediciones',EditionRoutes);
app.use('/person',  PersonRoutes);
app.use('/comments',CommentRoutes);
app.use('/areas',AreaRoutes);
app.use('/areaperson',AreaPersonRoutes);

// JUDGE ROUTES
app.use('/Juez', JudgeRoutes)
app.use('/criterias', CriteriaRoutes);
app.use('/jprojects', JudgeXProjectRoutes);
app.use('/jareas', JudgeXAreaRoutes);
app.use('/criteria_judges', CriteriaJudgeRoutes);
app.use('/jcomments', JudgeXCommentRoutes); 
app.use('/judgeProjects', JudgeProjectRoutes); 
app.use('/jstudents', JudgeXStudentRoutes);
app.use('/jperson', JudgeXPersonRoutes);
app.use('/teams', JudgeXTeamRoutes);
app.use('/teamMembers', TeamMemberRoutes);



//console.log(process.env.DB_CONNECTION_STRING)

try {
    await db.authenticate()
    console.log('Conexión exitosa a la DB')
} catch (error) {
    console.log(`El error de conexión es: ${error}`)
}

// Ruta para enviar correos electrónicos
app.post('/send-email', async (req, res) => {
    const { templateName, templateParams } = req.body;

    try {
    await sendEmail({ templateName, templateParams });
    res.status(200).send('Correo enviado con éxito');
    } catch (error) {
    res.status(500).send(`Error al enviar correo: ${error.toString()}`);
    }
});

//cron.schedule('*/20 * * * * *', function() { console.log('Running a task every 20 seconds'); main();});

app.listen(8000, ()=>{
    console.log('Server UP running in http://localhost:8000/')
})

export default app;