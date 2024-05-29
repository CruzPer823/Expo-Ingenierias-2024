// controllers/commentController.js
import {ProjectModel,PersonModel,CommentsModel} from "../models/Relations.js"

// Crear un nuevo comentario
export const createComment = async (req, res) => {
    const { id_person, id_project, comment } = req.body;

    try {
        // Verificar que el proyecto y la persona existen
        const project = await ProjectModel.findByPk(id_project);
        const person = await PersonModel.findByPk(id_person);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }

        // Crear el comentario
        const newComment = await CommentsModel.create({
            id_person,
            id_project,
            comment
        });

        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

