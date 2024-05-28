import {AnnounceModel} from "../models/Relations.js"

export const getAllAnnounces = async(req,res)=>{
    try{
      const Announces = await AnnounceModel.findAll();
      res.json(Announces);
    }catch(error){
      res.status(500).json({message:error.message});
    }
  };

export const getAnnounce = async(req,res)=>{
    try{
        const {id}=req.params;
        const Announce = await AnnounceModel.findByPk(id);
        if(!Announce){
            return res.status(404).json({message: 'Anuncio no encontrado'});
        }else{
            res.json(Announce);
        }
    }catch(error){
        res.json({message:error.message});
    }
};

export const createAnnounce = async(req,res)=>{
    const { title, description, audience, multimedia } = req.body;
    if (!title || !description || !audience) {
        return res.status(400).json({ error: 'Todos los campos requeridos no están presentes' });
    }
    try{
        const newAnnounce= await AnnounceModel.create({ title, description, audience, multimedia });
        console.log("Nuevo anuncio: ", newAnnounce.toJSON());
        res.status(201).json({newAnnounce});
    }catch (error){
        res.status(400).json({error:error.message});
    }
};

export const updateAnnounce = async(req,res)=>{
    try{
        await AnnounceModel.update(req.body,{
            where: {id:req.params.id}
        })
        res.status(201).json({
            message: "Anuncio correctamente actualizado!"
        })
    }catch(error){
        res.json({ message: error.message});
    }
};
export const deleteAnnounce = async(req,res)=>{
    try{
        await AnnounceModel.destroy({
            where: {id:req.params.id}
        })
        res.status(201).json({
            "message":"Anuncio eliminado"
        })
    }catch(error){
        res.json({message:error.message})
    }
};