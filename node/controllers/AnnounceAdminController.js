import AnnounceModel from "../models/AnnounceModel.js"

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