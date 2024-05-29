
import config from './config.js'
import cron from "node-cron"
import express  from "express"
import cors from 'cors'

//importamos la conexión a la DB
import db from "./database/db.js"
//importamos nuestro enrutador
import studentRoutes from './routes/StudentRoutes.js'
import projectRoutes from './routes/ProjectRoutes.js'
import AnnounRoutes from './routes/AnnounRoutes.js'
import personRoutes from './routes/PersonRoutes.js'
import commenRoutes from './routes/CommentsRoutes.js'
import main from './middleware/authConfig.js'




const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/projects', projectRoutes);
app.use('/students', studentRoutes);
app.use('/announ', AnnounRoutes);
app.use('/person',personRoutes);
app.use('/comments',commenRoutes);


//console.log(process.env.DB_CONNECTION_STRING)


try {
    await db.authenticate()
    console.log('Conexión exitosa a la DB')
} catch (error) {
    console.log(`El error de conexión es: ${error}`)
}




cron.schedule('*/20 * * * * *', function() { console.log('Running a task every 20 seconds'); main();});



app.listen(8000, ()=>{
    console.log('Server UP running in http://localhost:8000/')
})