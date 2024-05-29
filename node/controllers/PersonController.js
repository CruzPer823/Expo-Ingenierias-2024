//importamos el Modelo
import {PersonModel} from "../models/Relations.js"

//** Métodos para el CRUD **/

//Mostrar todos los registros
export const getAllPersons = async (req, res) => {
    try {
        const persons = await PersonModel.findAll()
        res.json(persons)
    } catch (error) {
        res.json( {message: error.message} )
    }
}

//Mostrar un proyecto
export const getStudent = async (req, res) => {
        try {
            const person = await PersonModel.findAll({
                where:{ id:req.params.id }
            })
            res.json(person[0])
        } catch (error) {
            res.json( {message: error.message} )
        }
}
//Crear un registro
export const createPerson = async (req, res) => {
    try {
        const person = await PersonModel.create(req.body);
        console.log("Nuevo proyecto creado:", person.toJSON());
        res.status(201).json({ message: "¡Registro creado correctamente!", person });
    } catch (error) {
        console.error("Error al crear el proyecto:", error);
        res.status(500).json({ message: error.message });
    }
};


//Actualizar un proyecto
export const updatePerson = async (req, res) => {
    try {
        await PersonModel.update(req.body, {
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
export const deletePerson = async (req, res) => {
    try {
        await PersonModel.destroy({ 
            where: { id : req.params.id }
        })
        res.json({
            "message":"¡Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}