import StudentModel from "../models/JudgeXStudentModel.js"

export const fetchAllStudents = async (req, res) => {
    try {
      const students = await StudentModel.findAll({
        order: [['id', 'ASC']]  // Ordenar por ID ascendente
      });
      res.json(students);
    } catch (error) {
      console.error('Error al obtener los estudiantes:', error);
      res.status(500).json({ error: 'Error al obtener los estudiantes.' });
    }
  }
  
  export const findStudentById = async (req, res) => {
      const studentId = req.params.id;
    
      try {
        const student = await StudentModel.findByPk(studentId);
        if (!student) {
          return res.status(404).json({ error: 'Estudiante no encontrado.' });
        }
        res.json(student);
      } catch (error) {
        console.error('Error al obtener el estudiante por ID:', error);
        res.status(500).json({ error: 'Error al obtener el estudiante.' });
      }
    }