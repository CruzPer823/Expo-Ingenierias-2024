//importamos el Modelo
import {StudentModel} from "../models/Relations.js"

//** Métodos para el CRUD **/

//Mostrar todos los registros
export const getAllStudents = async (req, res) => {
    try {
        const students = await StudentModel.findAll()
        res.json(students)
    } catch (error) {
        res.json( {message: error.message} )
    }
}

//Mostrar un proyecto
export const getStudent = async (req, res) => {
        try {
            const student = await StudentModel.findAll({
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
        const student = await StudentModel.create(req.body);
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
        await StudentModel.update(req.body, {
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
        await StudentModel.destroy({ 
            where: { id : req.params.id }
        })
        res.json({
            "message":"¡Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}
