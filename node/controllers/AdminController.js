import { Op } from "sequelize";
import {AdminModel} from "../models/Relations.js";

export const getAdmin = async(req,res)=>{
    const {adminId} = req.params;
    try{
        const admin=await AdminModel.findAll({
            where:{
                id: adminId, 
                //isActive:1    
            }
        });
        if(!admin|| admin.length === 0){
            return res.status(404).json({
                exists: false
            });
        }else{
            res.status(200).json(admin);
        }
    } catch (error){
        res.json({message:error.message})   
    }
};

export const getAdminInfo = async (req, res) => {
    try {
        const admin = await AdminModel.findAll({
            where:{ id:req.params.id }
        })
        res.json(admin[0])
    } catch (error) {
        res.json( {message: error.message} )
    }
}
//Actualizar un proyecto
export const updateAdmin = async (req, res) => {
    try {
        await AdminModel.update(req.body, {
            where: { id: req.params.id}
        })
        res.json({
            "message":"¡Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}
