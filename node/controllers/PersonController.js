//importamos el Modelo
import {ProjectModel, PersonModel, AreaModel, AreaPersonModel, AsessorProjectModel} from "../models/Relations.js"


//** Métodos para el CRUD **/

// Get all judges for a given area, excluding the project responsible and those already related to the project
export const getAreaJudge = async (req, res) => {
    const { areaId } = req.params; // Assume the area ID is provided as a URL parameter
    const { projectId } = req.query; // Assume the project ID is provided as a query parameter

    try {
        // Retrieve the project to get the id_responsable
        const project = await ProjectModel.findByPk(projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const { id_responsable } = project;

        // Retrieve all person IDs related to the project
        const assessorEntries = await AsessorProjectModel.findAll({
            where: { id_project: project.id },
            attributes: ['id_person']
        });

        // Extract the person IDs from the assessorEntries
        const relatedPersonIds = assessorEntries.map(entry => entry.id_person);

        // Find all judges for the given area
        const judges = await PersonModel.findAll({
            include: [{
                model: AreaModel,
                through: {
                    model: AreaPersonModel,
                    attributes: []
                },
                where: { id: areaId }
            }],
            where: { isJudge: 1 }
        });

        if (judges.length === 0) {
            return res.status(404).json({ message: 'No judges found for the given area' });
        }

        // Filter out the project responsible and those related to the project from the list of judges
        const filteredJudges = judges.filter(judge => judge.id !== id_responsable && !relatedPersonIds.includes(judge.id));

        // Map the judges to the desired format
        const formattedJudges = filteredJudges.map(judge => ({
            id: judge.id,
            name: judge.name,
            lastName: judge.lastName,
            profileImg: "user.png"
        }));

        res.json(formattedJudges);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all available judges excluding the project responsible and those already related to the project
export const getAllJudges = async (req, res) => {
    const { projectId } = req.query; // Assume the project ID is provided as a query parameter

    try {
        // Retrieve the project to get the id_responsable
        const project = await ProjectModel.findByPk(projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const { id_responsable } = project;

        // Retrieve all person IDs related to the project
        const assessorEntries = await AsessorProjectModel.findAll({
            where: { id_project: project.id },
            attributes: ['id_person']
        });

        // Extract the person IDs from the assessorEntries
        const relatedPersonIds = assessorEntries.map(entry => entry.id_person);

        // Find all judges
        const judges = await PersonModel.findAll({
            where: { isJudge: 1 }
        });

        if (judges.length === 0) {
            return res.status(404).json({ message: 'No judges found' });
        }

        // Filter out the project responsible and those related to the project from the list of judges
        const filteredJudges = judges.filter(judge => judge.id !== id_responsable && !relatedPersonIds.includes(judge.id));

        // Map the judges to the desired format
        const formattedJudges = filteredJudges.map(judge => ({
            id: judge.id,
            name: `${judge.name} ${judge.lastName}`
        }));

        res.json(formattedJudges);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//------------------------------------------------------------------------------------------------------------------
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
export const getPerson = async (req, res) => {
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
