import ProjectModel from "../models/JudgeXProjectModel.js"

// Función para obtener todos los proyectos ordenados de manera ascendente por id
export const fetchAllProjects = async () => {
    try {
      const projects = await ProjectModel.findAll({
        order: [
          ['id', 'ASC'] // Orden ascendente por la columna 'id'
        ]
      });
      return projects;
    } catch (error) {
      console.error('Error al obtener los proyectos:', error);
      throw error;
    }
  }
  
  // Función para obtener un proyecto por su ID
  export const fetchProjectById = async (projectId) => {
    try {
      const project = await ProjectModel.findByPk(projectId); // Utilizamos findByPk para buscar por primary key
      if (!project) {
        throw new Error(`Proyecto con id ${projectId} no encontrado`);
      }
      return project;
    } catch (error) {
      console.error(`Error al obtener el proyecto con id ${projectId}:`, error);
      throw error;
    }
  }