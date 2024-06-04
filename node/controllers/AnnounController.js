
import {AnnounModel, StudentModel, AnnounceReadStudentModel, PersonModel, AnnounceReadPersonModel} from "../models/Relations.js";

export const getAllAnnouns = async (req, res) => {
    try {
        const announs = await AnnounModel.findAll({
            order: [
                ['id','ASC'] // Orden ascendente por id
            ]
        });
        res.json(announs)
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const getAnnoun = async (req, res) => {
    try {
        const announ = await AnnounModel.findByPk(req.params.id 
          
        );

        // Verificar si se encontró el proyecto
        if (!announ) {
            return res.status(404).json({ message: 'El proyecto no fue encontrado.' });
        }
        // Responder con el proyecto que incluye los nombres de la categoría y el área
        res.json(announ);
    } catch (error) {
        // Manejar cualquier error que ocurra durante la consulta
        console.error('Error al obtener el proyecto:', error);
        res.status(500).json({ message: 'Hubo un error al obtener el proyecto.' });
    }
}


//Create Announ read student
export const createReadAnnounStudents = async (req, res) => {
   
    try {
        const student = await StudentModel.findByPk(req.body.id_student);
        const announce = await AnnounModel.findByPk(req.body.id_announce);
        if (student && announce) {
             console.log('pasa por aqui')
          const result = await student.addAnnouncement(announce); // Sequelize se encargará de actualizar la tabla intermedia
          console.log(result)
          res.status(200).json({ message: 'Announcement marked as read' });
        } else {
          res.status(404).json({ message: 'Student or Announcement not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
}


export const countReadAnnouncementsStudents = async (req, res) => {
    try {



        const { id_student } = req.params; // Suponiendo que estás pasando el ID del estudiante como parámetro en la URL

        const allAnnoun = await AnnounModel.count();

        // Realiza la consulta de conteo
        const countRead = await AnnounceReadStudentModel.count({
            where: { id_student }
        });

        let countsAnnoun = allAnnoun - countRead;

        res.status(200).json({ countsAnnoun });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};


//Create announ read teacher
export const createReadAnnounPerson = async (req, res) => {
   
    try {
        const person = await PersonModel.findByPk(req.body.id_person);
        const announce = await AnnounModel.findByPk(req.body.id_announce);
        if (person && announce) {
             console.log('pasa por aqui')
          const result = await person.addAnnouncement(announce); // Sequelize se encargará de actualizar la tabla intermedia
          console.log(result)
          res.status(200).json({ message: 'Announcement marked as read' });
        } else {
          res.status(404).json({ message: 'Person or Announcement not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
}

export const countReadAnnouncementsPerson = async (req, res) => {
    try {

        const { id_person } = req.params; // Suponiendo que estás pasando el ID del estudiante como parámetro en la URL

        const allAnnoun = await AnnounModel.count();

        // Realiza la consulta de conteo
        const countRead = await AnnounceReadPersonModel.count({
            where: { id_person }
        });

        let countsAnnoun = allAnnoun - countRead;

        res.status(200).json({ countsAnnoun });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};