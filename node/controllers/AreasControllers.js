import {AreaModel} from "../models/Relations.js";

export const getAllAreas = async(req,res)=>{
    try{
        const Areas = await AreaModel.findAll()
        res.json(Areas);
    }catch (error){
        res.json({message:error.message});
    }
};

export const getAresById = async(req,res)=>{
    try{
        const {id}=req.params;
        const Area = await AreaModel.findByPk(id);
        if(!Area){
            return res.status(404).json({message: 'Area no encontrada'});
        }else{
            res.json(Area);
        }
    }catch(error){
        res.json({message:error.message});
    }
};


export const createArea = async(req,res)=>{
    const {name,description}=req.body;
    if(!name || !description){
        return res.status(400).json({error: 'Todos los campos requeridos no estan presentes'});
    }
    try{
        const newArea=await AreaModel.create({name,description});
        console.log("Nueva area: ",newArea.toJSON());
        res.status(201).json({newArea});
    }catch(error){
        res.json(400).json({message:error.message});
    }
};
export const updateArea = async(req,res)=>{
    try{
        await AreaModel.update(req.body,{
            where: {id:req.params.id}
        })
        res.status(201).json({
            message: "Area correctamente actualizada!"
        })
    }catch(error){
        res.json({message:error.message});
    }
};

export const  inhabilitateArea = async(req,res)=>{
    const {id}=req.params;
    try{
        let area = await AreaModel.findByPk(id);
        if(area){
            area.IsActive = area.IsActive===0?1:0;
        }else{
            return res.status(404).json({ error: 'User not found' });
        }
        area.save();
        res.json({message: "Area correctamente inhabilitada"})

    }catch(error){
        console.error("Error toggling area active status:", error);
    res.status(500).json({ error: 'Internal server error while toggling user active status.' });
    }
};

export const deleteArea=async(req,res)=>{
    try{
        await AreaModel.destroy({
            where:{id:req.params.id}
        })
        res.status(201).json({
            "message":"Area eliminada"
        })
    }catch(error){
        res.json({message:error.message})
    }
};