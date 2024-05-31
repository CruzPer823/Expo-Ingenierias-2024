import {CategoryModel} from "../models/Relations.js"
import ProjectModel from "../models/ProjectModel.js";

import  db  from "../database/db.js";

async function  inhabilitateCategory(req,res) {
  const {id}=req.params;
  try{
      let category = await CategoryModel.findByPk(id);
      if(category){
          category.isActive = category.isActive===0?1:0;
      }else{
          return res.status(404).json({ error: 'User not found' });
      }
      category.save();
      res.json({message: "Categoria correctamente inhabilitada"})

  }catch(error){
      console.error("Error toggling area active status:", error);
  res.status(500).json({ error: 'Internal server error while toggling user active status.' });
  }
};

async function createCategory(req,res) {
  const {title,description}=req.body;
  const isActive=1;
  if(!title || !description){
    return res.status(400).json({error: 'Todos los campos requeridos no estan presentes'});
  }
  try{
    const newCategory=await CategoryModel.create({title,description,isActive});
    console.log("Nueva Categoria: ",newCategory.toJSON());
    res.status(201).json({newCategory});
}catch(error){
    res.json(400).json({message:error.message});
}
};

async function updateCategory(req,res) {
    try{
        await CategoryModel.update(req.body,{
            where : {id:req.params.id}
        })
        res.status(201).json({
            message:"Categoria correctamente actualizada!"
        })
    }catch(error){
        res.json({message:error.message});
    }
};

async function getCategoryProjectData(req, res) {
    try {
      const categories = await CategoryModel.findAll({
        include: [{
          model: ProjectModel,
          attributes: []
        }],
        attributes: [
          'title',
          [db.fn('COUNT', db.col('projects.id')), 'projectCount']
        ],
        group: ['categories.id', 'categories.title']
      });
  
      const labels = categories.map(category => category.title);
      const data = categories.map(category => category.get('projectCount'));
  
      res.json({ labels, data });
    } catch (error) {
      console.error("Error fetching category project data:", error);
      res.status(500).json({ error: 'Internal server error while fetching category project data.' });
    }
  }

// Obtener todas las categorías
async function getAllCategories(req, res) {
  try {
    const categories = await CategoryModel.findAll();
    res.json(categories);
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    res.status(500).json({ error: 'Error al obtener las categorías.' });
  }
}

async function getCategoryById(req,res) {
  try{
      const {id}=req.params;
      const Category = await CategoryModel.findByPk(id);
      if(!Category){
          return res.status(404).json({message: 'Categoria no encontrada'});
      }else{
          res.json(Category);
      }
  }catch(error){
      res.json({message:error.message});
  }
};

export { inhabilitateCategory, createCategory, updateCategory, getCategoryProjectData, getAllCategories, getCategoryById };
