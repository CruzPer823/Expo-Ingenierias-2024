import AnnounModel from '../models/AnnounModel.js'

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
