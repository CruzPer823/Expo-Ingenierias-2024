import PersonModel from "../models/JudgeXPersonModel.js"

export const fetchAllPersons = async (req, res) => {
    try {
      const persons = await PersonModel.findAll({
        order: [['createdAt', 'DESC']]
      });
      res.json(persons);
    } catch (error) {
      console.error('Error fetching all persons:', error);
      res.status(500).json({ error: 'Error fetching all persons.' });
    }
  };
  
  export const fetchPersonById = async (req, res) => {
    const { id } = req.params;
    try {
      const person = await PersonModel.findByPk(id);
      if (!person) {
        res.status(404).json({ error: 'Person not found.' });
      } else {
        res.json(person);
      }
    } catch (error) {
      console.error('Error fetching person by id:', error);
      res.status(500).json({ error: 'Error fetching person by id.' });
    }
  };