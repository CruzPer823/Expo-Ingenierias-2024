import { Op } from "sequelize";
import {AdminModel} from "../models/Relations.js";

export const getAdmin = async(req,res)=>{
    const {adminId} = req.params;
    console.log(adminId);
    try{
        const admin=await AdminModel.findAll({
            where:{
                email:{
                    [Op.like]:`${adminId}@%`
                }    
            }
        });
        if(!admin|| admin.length === 0){
            return res.status(404).json({
                message: 'Administrador no encontrado'
            });
        }else{
            res.status(201).json(admin);
        }
    } catch (error){
        res.json({message:error.message})
    }
};