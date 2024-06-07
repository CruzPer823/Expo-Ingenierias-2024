import MapModel from "../models/MapModel.js";

export const getMap = async(req,res)=>{
    try{
        const map=await MapModel.findAll({
            where:{id:req.params.id}
        })
        res.json(map);
    }catch(error){
        res.json({message:error.message})
    }
};

export const updateMap = async(req,res)=>{
    try{
        await MapModel.update(req.body,{
            where: {id:req.params.id}
        })
        res.status(201).json({
            message: "Mapa correctamente actualizado!"
        })
    }catch(error){
        res.json({ message: error.message});
    }
};