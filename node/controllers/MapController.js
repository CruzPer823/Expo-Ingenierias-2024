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