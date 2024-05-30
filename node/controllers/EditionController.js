import {EditionModel,ProjectModel,StudentModel,PersonModel,CriteriaModel,CommentsModel, CategoryModel, AreaModel, TeamModel} from "../models/Relations.js";
import ExcelJS from 'exceljs';
import path from 'path';

export const getAllEditions = async (req,res)=>{
    try{
        const Editions = await EditionModel.findAll()
        res.json(Editions);
    }catch (error){
        res.json({message: error.message});
    }
};

export const downloadHistoric = async (req, res)=>{
    try{
        const projects= await ProjectModel.findAll({
            where:{id_edition: req.params.id},
            include:[
                {model:CategoryModel, attributes:['title']},
                {model:AreaModel, attributes:['name']},
                {model:StudentModel, attributes:['name','lastName']},
                {model:TeamModel, attributes:['name']}
            ]
        });
        const workbook = new ExcelJS.Workbook();
        const worksheet= workbook.addWorksheet('Historico');

        //Tabla de Proyectos (falta agregar ranking)

        worksheet.columns = [
            { header: 'Area', key: 'area', width: 30 },
            { header: 'Categoria', key: 'category', width: 30 },
            { header: 'Proyecto', key: 'project', width: 30 },
            { header: 'Lider', key: 'leader', width: 30 },
            { header: 'Video', key: 'video', width: 30 },
            { header: 'Poster', key: 'poster', width: 30 },
            { header: 'Equipo', key: 'equipo', width: 30 }
          ];


        projects.forEach(project => {
            worksheet.addRow({
                area: project.id_area ? project.area.name : '',
                category: project.id_category ? project.category.title : '',
                project: project.title,
                leader: project.id_lider ? `${project.student.name} ${project.student.lastName}` : '',
                video: project.linkVideo,
                poster: project.linkPoster,
                equipo: project.team.name
            });
          });

          worksheet.getRow(1).font = { bold: true };
          worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
            row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
              cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
              };
            });
          });

        //tabla de proyecto y equipo 

        const filePath = path.resolve('Historico.xlsx');
        await workbook.xlsx.writeFile(filePath);
    
        res.download(filePath);
    }catch (error){
        res.json({message:error.message})
    }
};