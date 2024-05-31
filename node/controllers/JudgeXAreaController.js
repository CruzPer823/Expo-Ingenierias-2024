import JudgeAreaModel from '../models/JudgeXAreaModel.js';

export const getAllAreas = async(req,res)=>{
  try{
      const Areas = await JudgeAreaModel.findAll()
      res.json(Areas);
  }catch (error){
      res.json({message:error.message});
  }
};