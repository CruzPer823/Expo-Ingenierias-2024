import {AreaPersonModel,AreaModel} from '../models/Relations.js';

export const registerAreaPerson = async (req, res) => {
    const { id_person, id_area } = req.body;

    if (!id_area || !id_person) {
        return res.status(400).json({ error: 'id_area and id_person are required' });
    }

    try {
        // Verificar si ya existe un registro con el mismo id_area e id_person
        const existingEntry = await AreaPersonModel.findOne({ where: { id_person, id_area } });

        if (existingEntry) {
            return res.status(409).json({ error: 'A record with the same id_area and id_person already exists' });
        }

        // Crear un nuevo registro si no existe uno duplicado
        const newEntry = await AreaPersonModel.create({
            id_person,
            id_area
        });
        res.status(201).json(newEntry);
    } catch (error) {
        console.error('Error registering area person:', error);
        res.status(500).json({ error: 'An error occurred while registering the area person' });
    }
};

export const getAreaPerson = async (req, res) => {
    const { id_person } = req.params;

    if (!id_person) {
        return res.status(400).json({ error: 'id_person is required' });
    }

    try {
        // Buscar todas las relaciones en la tabla areas_persons que tengan el mismo id_person
        const areaPersons = await AreaPersonModel.findAll({
            where: { id_person }
        });

        if (!areaPersons || areaPersons.length === 0) {
            return res.status(404).json({ error: 'No areas found for this person' });
        }

        // Obtener los nombres de las áreas asociadas
        const areaNames = await Promise.all(areaPersons.map(async (areaPerson) => {
            const area = await AreaModel.findByPk(areaPerson.id_area, {
                attributes: ['name']
            });
            return area.name;
        }));

        // Devolver la información de las áreas asociadas
        res.status(200).json({
            id_person: id_person,
            areas: areaNames
        });
    } catch (error) {
        console.error('Error fetching area person:', error);
        res.status(500).json({ error: 'An error occurred while fetching the area person' });
    }
};
export const updateAreaPerson = async (req, res) => {
    const { id_person, areas } = req.body;

    if (!id_person || !Array.isArray(areas)) {
        return res.status(400).json({ error: 'id_person and areas are required, and areas should be an array' });
    }

    try {
        // Eliminar todas las relaciones actuales de areas_persons para el id_person
        await AreaPersonModel.destroy({
            where: { id_person }
        });

        // Agregar las nuevas relaciones de areas_persons
        const newEntries = await Promise.all(areas.map(async (id_area) => {
            return await AreaPersonModel.create({
                id_person,
                id_area
            });
        }));

        // Devolver la información de las nuevas áreas asociadas
        res.status(200).json({
            id_person: id_person,
            areas: newEntries.map(entry => entry.id_area)
        });
    } catch (error) {
        console.error('Error updating area person:', error);
        res.status(500).json({ error: 'An error occurred while updating the area person' });
    }
};


