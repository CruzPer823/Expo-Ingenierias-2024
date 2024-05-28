import Area from '../models/AreaModel.js';

export const getAllAreas = async(req,res)=>{
  try{
      const Areas = await Area.findAll()
      res.json(Areas);
  }catch (error){
      res.json({message:error.message});
  }
};

export const createArea = async(req,res)=>{
  const {name,description}=req.body;
  if(!name || !description){
      return res.status(400).json({error: 'Todos los campos requeridos no estan presentes'});
  }
  try{
      const newArea=await Area.create({name,description});
      console.log("Nueva area: ",newArea.toJSON());
      res.status(201).json({newArea});
  }catch(error){
      res.json(400).json({message:error.message});
  }
};

export const updateArea = async(req,res)=>{
  try{
      await Area.update(req.body,{
          where: {id:req.params.id}
      })
      res.status(201).json({
          message: "Area correctamente actualizada!"
      })
  }catch(error){
      res.json({message:error.message});
  }
};

export const deleteArea=async(req,res)=>{
  try{
      await Area.destroy({
          where:{id:req.params.id}
      })
      res.status(201).json({
          "message":"Area eliminada"
      })
  }catch(error){
      res.json({message:error.message})
  }
};
