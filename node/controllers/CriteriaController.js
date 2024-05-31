import { CriteriaModel } from "../models/Relations.js";

async function fetchAllCriterias(req, res) {
  try {
    const criterias = await CriteriaModel.findAll({
      order: [['id', 'ASC']]  // Ordenar por ID ascendente
    });
    res.json(criterias);
  } catch (error) {
    console.error('Error al obtener los criterios:', error);
    res.status(500).json({ error: 'Error al obtener los criterios.' });
  }
}

// -------------- Admin Criteria functions -----------------

// Get all criteria
export const getAllCriteria = async (req, res) => {
  try {
      const criterias = await CriteriaModel.findAll()
      res.json(criterias)
  } catch (error) {
      res.json( {message: error.message} )
  }
};

// Retrieve a single record by ID
export const getCriteria = async (req, res) => {
  try {
      const { criteriaId } = req.params; // Extract the ID from the request parameters
      const criteria = await CriteriaModel.findByPk(criteriaId); // Find the record by primary key
      if (criteria) {
          res.json(criteria); // Return the record if found
      } else {
          res.status(404).json({ message: "Criteria not found" }); // Return 404 if not found
      }
  } catch (error) {
      res.status(500).json({ message: error.message }); // Return 500 for any other errors
  }
};

// Update a criteria record by ID
export const updateCriteria = async (req, res) => {
  try {
      const { criteriaId } = req.params; // Extract the ID from the request parameters
      const { description, weight } = req.body; // Extract updated fields from request body

      // Find the record by primary key
      const criteria = await CriteriaModel.findByPk(criteriaId);

      // Check if the criteria exists
      if (criteria) {
          // Update the criteria record with the new values
          await criteria.update({
              description: description || criteria.description, // Update description if provided, otherwise keep the existing value
              weight: weight || criteria.weight, // Update weight if provided, otherwise keep the existing value
          });

          // Return the updated criteria
          res.json({ message: "Criteria updated successfully", criteria });
      } else {
          // Return 404 if criteria not found
          res.status(404).json({ message: "Criteria not found" });
      }
  } catch (error) {
      // Return 500 for any other errors
      res.status(500).json({ message: error.message });
  }
};





export { fetchAllCriterias };
