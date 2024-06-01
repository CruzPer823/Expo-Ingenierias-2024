import config from './config.js'
import cron from "node-cron"
import express  from "express"
import cors from 'cors'

//importamos la conexión a la DB
import db from "./database/db.js"

//importamos nuestro enrutador

//hay que importar las rutas de admin
import UserRoutes from './routes/UserRoutes.js';
import CategoryRoutes from './routes/CategoryRoutes.js';
import StudentRoutes from './routes/StudentRoutes.js';
import ProjectRoutes from './routes/ProjectRoutes.js';
import AnnounRoutes from './routes/AnnounRoutes.js';
import AdminRoutes from "./routes/AdminRoutes.js";
import CommentRoutes from './routes/CommentRoutes.js';
import PersonRoutes from './routes/PersonRoutes.js';
import EditionRoutes from "./routes/EditionRoutes.js";



// las rutas de juez
//import ProjectRoutes from './routes/ProjectRoutes.js';
import AreaRoutes from './routes/AreaRoutes.js';
import CriteriaJudgeRoutes from './routes/CriteriaJudgeRoutes.js'; 
import JudgeProjectRoutes from './routes/JudgeProjectRoutes.js';
import TeamRoutes from './routes/TeamRoutes.js';
import TeamMemberRoutes from './routes/TeamMemberRoutes.js';
import AreaPersonRoutes from './routes/AreaPersonRoutes.js'
import main from './middleware/authConfig.js'

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Adimn Routes
app.use('/users', UserRoutes);
app.use('/categories', CategoryRoutes);

// Judge Routes
app.use('/projects', ProjectRoutes);
app.use('/students', StudentRoutes);
app.use('/announ', AnnounRoutes);
app.use('/Admin',  AdminRoutes);
app.use('/Ediciones',EditionRoutes);
app.use('/person',  PersonRoutes);
app.use('/comments',CommentRoutes);
app.use('/areas',AreaRoutes);
app.use('/areaperson',AreaPersonRoutes);

// JUDGE ROUTES
// app.use('/api', CriteriaRoutes);
// app.use('/api', ProjectRoutes);
// app.use('/api', CategoryRoutes);
// app.use('/api', AreaRoutes);
// app.use('/api', CriteriaJudgeRoutes);
// app.use('/api', CommentRoutes); 
// app.use('/api', JudgeProjectRoutes); 
// app.use('/api', StudentRoutes);
// app.use('/api', PersonRoutes);
// app.use('/api', TeamRoutes);
// app.use('/api', TeamMemberRoutes);
// app.use('/api', AnnounRoutes);

//console.log(process.env.DB_CONNECTION_STRING)

try {
    await db.authenticate()
    console.log('Conexión exitosa a la DB')
} catch (error) {
    console.log(`El error de conexión es: ${error}`)
}




// cron.schedule('*/20 * * * * *', function() { console.log('Running a task every 20 seconds'); main();});



app.listen(8000, ()=>{
    console.log('Server UP running in http://localhost:8000/')
})
