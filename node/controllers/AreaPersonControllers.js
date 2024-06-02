import {AreaPersonModel,AreaModel} from '../models/Relations.js';

export const registerAreaPerson = async (req, res) => {
    const { id_person, id_area } = req.body;

    if (!id_area || !id_person) {
        return res.status(400).json({ error: 'id_area and id_person are required' });
    }

    try {
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
        // Buscar la relación en la tabla areas_persons
        const areaPerson = await AreaPersonModel.findOne({
            where: { id_person }
        });

        if (!areaPerson) {
            return res.status(404).json({ error: 'No area found for this person' });
        }

        // Obtener el nombre del área asociada
        const area = await AreaModel.findByPk(areaPerson.id_area, {
            attributes: ['name'] // Seleccionar solo el nombre del área
        });

        if (!area) {
            return res.status(404).json({ error: 'Area not found' });
        }

        // Devolver la información del área asociada
        res.status(200).json({
            id_person: areaPerson.id_person,
            id_area: areaPerson.id_area,
            area_name: area.name
        });
    } catch (error) {
        console.error('Error fetching area person:', error);
        res.status(500).json({ error: 'An error occurred while fetching the area person' });
    }
};
