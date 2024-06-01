// controllers/commentController.js
import {ProjectModel,PersonModel,CommentModel} from "../models/Relations.js"

// Crear un nuevo comentario
async function createCommentJudge(req, res) {
  const { id_person, id_project, comment } = req.body;

  try {
    const newComment = await CommentModel.create({
      id_person,
      id_project,
      comment,
    });
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error al crear el comentario:', error);
    res.status(500).json({ error: 'Error al crear el comentario' });
  }
}

// Obtener todos los comentarios
async function fetchAllComments(req, res) {
  try {
    const comments = await CommentModel.findAll();
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error al obtener los comentarios:', error);
    res.status(500).json({ error: 'Error al obtener los comentarios' });
  }
}

// Obtener comentarios por id_persona y id_project
async function fetchCommentByPersonAndProject(req, res) {
  const { id_person, id_project } = req.params;

  try {
    const comment = await CommentModel.findOne({
      where: {
        id_person,
        id_project
      }
    });

    if (comment) {
      res.status(200).json(comment);
    } else {
      res.status(404).json({ error: 'Comentario no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el comentario:', error);
    res.status(500).json({ error: 'Error al obtener el comentario' });
  }
}

// Obtener comentarios por id_project
async function fetchCommentsByProject(req, res) {
  const { id_project } = req.params;
  try {
    const comments = await CommentModel.findAll({
      where: {
        id_project
      }
    });

    if (comments && comments.length > 0) {
      res.status(200).json(comments);
    } else {
      res.status(404).json({ error: 'No se encontraron comentarios para este proyecto' });
    }
  } catch (error) {
    console.error('Error al obtener los comentarios:', error);
    res.status(500).json({ error: 'Error al obtener los comentarios' });
  }
}

// Crear un nuevo comentario
export const createComment = async (req, res) => {
    const { id_person, id_project, comment } = req.body;

    try {
        // Verificar que el proyecto y la persona existen
        const project = await ProjectModel.findByPk(id_project);
        const person = await PersonModel.findByPk(id_person);

        console.log('person:', id_person)
        console.log('project:', id_project)
        console.log('comment:', comment)
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }

        // Crear el comentario
        const newComment = await CommentModel.create({
            id_person,
            id_project,
            comment
        });

        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ message: error.message });
    }
};

export { fetchAllComments, fetchCommentByPersonAndProject, fetchCommentsByProject,createCommentJudge };
