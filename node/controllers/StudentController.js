import Student from '../models/StudentModel.js';

//** Métodos para el CRUD **/

//Mostrar todos los registros
export const getAllStudents = async (req, res) => {
  try {
      const students = await Student.findAll()
      res.json(students)
  } catch (error) {
      res.json( {message: error.message} )
  }
}

//Mostrar un proyecto
export const getStudent = async (req, res) => {
      try {
          const student = await Student.findAll({
              where:{ id:req.params.id }
          })
          res.json(student[0])
      } catch (error) {
          res.json( {message: error.message} )
      }
}

//Crear un registro
export const createStudent = async (req, res) => {
  try {
      const student = await Student.create(req.body);
      console.log("Nuevo proyecto creado:", student.toJSON());
      res.status(201).json({ message: "¡Registro creado correctamente!", student });
  } catch (error) {
      console.error("Error al crear el proyecto:", error);
      res.status(500).json({ message: error.message });
  }
};

//Actualizar un proyecto
export const updateStudent = async (req, res) => {
  try {
      await Student.update(req.body, {
          where: { id: req.params.id}
      })
      res.json({
          "message":"¡Registro actualizado correctamente!"
      })
  } catch (error) {
      res.json( {message: error.message} )
  }
}

//Eliminar un registro
export const deleteStudent = async (req, res) => {
  try {
      await Student.destroy({ 
          where: { id : req.params.id }
      })
      res.json({
          "message":"¡Registro eliminado correctamente!"
      })
  } catch (error) {
      res.json( {message: error.message} )
  }
}

export const fetchAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
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
      const student = await Student.findByPk(studentId);
      if (!student) {
        return res.status(404).json({ error: 'Estudiante no encontrado.' });
      }
      res.json(student);
    } catch (error) {
      console.error('Error al obtener el estudiante por ID:', error);
      res.status(500).json({ error: 'Error al obtener el estudiante.' });
    }
  }
