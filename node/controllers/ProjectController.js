import db from "../database/db.js";
import {ProjectModel, PersonModel, JudgeProjectModel, AsessorProjectModel, StudentModel, AdminModel, TeamModel, MaterialModel, MaterialProjectModel, CategoryModel, AreaModel, EditionModel, DisqualifiedModel, CommentsModel, CriteriaModel, CriteriaJudgeModel, TeamMemberModel} from "../models/Relations.js"
import Project from "../models/ProjectModel.js";
import { Sequelize } from 'sequelize';  // Import Sequelize
//** Métodos para el CRUD **/


// Helper function to transform project data into the desired format
const transformProjectData = async (project) => {
    const leader = await StudentModel.findByPk(project.id_lider);
    const teacher = await PersonModel.findByPk(project.id_responsable);
    const category = await CategoryModel.findByPk(project.id_category);
    const area = await AreaModel.findByPk(project.id_area);
    const edition = await EditionModel.findByPk(project.id_edition);

    // Retrieve the team for the project
    const team = await TeamModel.findOne({
        where: { id_project: project.id },
        include: [
            { 
                model: StudentModel,
                as: 'leader'
            },
            { 
                model: StudentModel,
                as: 'members',
                through: { attributes: [] } // exclude join table attributes
            }
        ]
    });

    // Extract member names from the team
    const memberNames = team.members.map(member => member.name);

    // Determine if project is reviewed
    const isReviewed = project.statusGeneral === "revisado";

    // Check if the project is disqualified
    const disqualifiedEntry = await DisqualifiedModel.findOne({
        where: { id_project: project.id }
    });
    const isDisqualified = disqualifiedEntry !== null;

    // Retrieve all person IDs related to the project
    const assessorEntries = await AsessorProjectModel.findAll({
        where: { id_project: project.id },
        attributes: ['id_person']
    });
    const assessorIds = assessorEntries.map(entry => entry.id_person);

    // Retrieve the names of the persons
    const assessors = await PersonModel.findAll({
        where: { id: assessorIds },
        attributes: ['name']
    });
    const teacherNames = assessors.map(assessor => assessor.name);

    // Include the responsible teacher at the beginning of the teacher names array
    if (teacher) {
        teacherNames.unshift(teacher.name);
    }

    return {
        id: project.id,
        title: project.title,
        review: isReviewed,
        img: "mockProject.jpeg", // Placeholder, update as necessary
        poster: "poster.jpg",
        video: project.linkVideo,
        description: project.description,
        categories: [category.title, area.name], 
        id_area: project.id_area,
        leader: leader.name,
        members: memberNames,
        teachers: teacherNames, // Assuming one responsible person
        edition: edition.id, 
        score: 0, // Add score to the ProjectModel 
        isDisqualified: isDisqualified
    };
};



// Mostrar todos los registros
export const getAllProjectsChart = async (req, res) => {
    try {
        const projects = await ProjectModel.findAll();

        const transformedProjects = await Promise.all(
            projects.map(project => transformProjectData(project))
        );

        res.json(transformedProjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//mostrarProyectoAdmin
export const getProjectAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await ProjectModel.findByPk(id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const transformedProject = await transformProjectData(project);
        res.json(transformedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch a single project by ID
export const getProjectChart = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await ProjectModel.findByPk(id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const transformedProject = await transformProjectData(project);
        res.json(transformedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to disqualify a project
export const disqualifyProject = async (req, res) => {
    const { id_admin, id_project, reason } = req.body;

    // Check if all required fields are provided
    if (!id_admin || !id_project || !reason) {
        return res.status(400).json({ message: "id_admin, id_project, and reason are required" });
    }

    try {
        // Check if the admin exists
        const admin = await AdminModel.findByPk(id_admin);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        
        // Check if the project exists
        const project = await ProjectModel.findByPk(id_project);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Create the disqualification entry
        await DisqualifiedModel.create({
            id_admin: id_admin,
            id_project: id_project,
            reason: reason
        });

        res.status(201).json({ message: "Project disqualified successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all judges assigned to a project
export const getProjectJudges = async (req, res) => {
    const { projectId } = req.query; // Assume the project ID is provided as a query string

    try {
        // Retrieve the project to ensure it exists
        const project = await ProjectModel.findByPk(projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Retrieve all person IDs related to the project
        const judgeEntries = await JudgeProjectModel.findAll({
            where: { id_project: project.id },
            attributes: ['id_person']
        });

        // Extract the person IDs from the assessorEntries
        const judgesIds = judgeEntries.map(entry => entry.id_person);


        res.json(judgesIds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Remove a judge from a project
export const removeProjectJudge = async (req, res) => {
    const { judgeId, projectId } = req.params; // Assume the judge ID and project ID are provided as URL parameters

    try {
        // Check if there are any comments associated with the judge for the project
        const commentExists = await CommentModel.findOne({
            where: {
                id_person: judgeId,
                id_project: projectId
            }
        });

        if (commentExists) {
            return res.status(400).json({ message: 'Cannot remove project judge because comments exist for the judge in the project' });
        }

        // Find the judge-project relation to ensure it exists
        const judgeProject = await JudgeProjectModel.findOne({
            where: {
                id_person: judgeId,
                id_project: projectId
            }
        });

        if (!judgeProject) {
            return res.status(404).json({ message: 'Judge not assigned to the project' });
        }

        // Remove the judge from the project
        await judgeProject.destroy();

        res.json({ message: 'Judge removed from the project successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a judge to a project
export const assignProjectJudge = async (req, res) => {
    const { judgeId, projectId } = req.body; // Assume the judge ID and project ID are provided in the request body

    try {
        // Check if the judge-project relation already exists
        const existingRelation = await JudgeProjectModel.findOne({
            where: {
                id_person: judgeId,
                id_project: projectId
            }
        });

        if (existingRelation) {
            return res.status(400).json({ message: 'Judge is already assigned to the project' });
        }

        // Create a new entry in the JudgeProjectModel
        await JudgeProjectModel.create({
            id_person: judgeId,
            id_project: projectId
        });

        res.json({ message: 'Judge added to the project successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



//** Métodos para el CRUD **/

//Mostrar todos los registros
export const getAllProjects = async (req, res) => {
    try {
        const projects = await ProjectModel.findAll();

        const transformedProjects = await Promise.all(
            projects.map(project => transformProjectData(project))
        );

        res.json(transformedProjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getAllProjectsByAreas = async (req, res) => {
    try {
        const projects = await AreaModel.findAll({include:
            [
                {model:ProjectModel, include: [
                    { model: AreaModel },
                    { model: CategoryModel },
                    { model: PersonModel,
                        as: 'Lider'
                    },
                    {
                        model: PersonModel,
                        as: 'Asesores'
                    },
                    { model: StudentModel },
                    { model: TeamModel,
                        include: [
                            {
                                model: StudentModel,
                                through: 'team_members'
                            }
                        ]
                    }
                    
                ]}
            ]
        })
        res.json(projects)
    } catch (error) {
        res.json( {message: error.message} )
    }
}

//Mostrar un proyecto
export const getProject = async (req, res) => {
    console.log(req.params.id)
    try {
        const project = await ProjectModel.findByPk(req.params.id, {
            include: [
                { model: AreaModel },
                { model: CategoryModel },
                { model: PersonModel,
                    as: 'Lider',
                },
                { model: StudentModel },
                { model: TeamModel,
                    include: [
                        {
                            model: StudentModel,
                            through: 'team_members'
                        }
                    ]
                },
                { model: CriteriaJudgeModel},

            ]
        });

        

        // Verificar si se encontró el proyecto
        if (!project) {
            return res.status(404).json({ message: 'El proyecto no fue encontrado.' });
        }

        const comentariosGenerales = []

        const comentariosAgrupados = {};
        

        var gradeCriteria1 = 0, gradeCriteria2 = 0, gradeCriteria3 = 0, gradeCriteria4 = 0, gradeCriteria5 = 0;
        var contadorJuez = 0;

         

        for(const criteriaJudge of project.criteria_judges){

            const comentarioGeneral = await CommentsModel.findOne({
                where: { id_project: req.params.id, id_person: criteriaJudge.id_person }
            });


            if (!comentariosAgrupados[criteriaJudge.id_person]) {
                comentariosAgrupados[criteriaJudge.id_person] = {
                    id_juez: (contadorJuez+1),
                    comentarioGeneral: comentarioGeneral ? comentarioGeneral.comment : null,
                };

            }
            const comentarioKey = `comentario${criteriaJudge.id_criteria}`;
            comentariosAgrupados[criteriaJudge.id_person][comentarioKey] = criteriaJudge.Comentario ? criteriaJudge.Comentario: null;

            switch(criteriaJudge.id_criteria){
                case 1:
                    gradeCriteria1 += criteriaJudge.grade;
                    contadorJuez++
                break;
                case 2:
                    gradeCriteria2 += criteriaJudge.grade;
                break;
                case 3:
                    gradeCriteria3 += criteriaJudge.grade;
                break;
                case 4:
                    gradeCriteria4 += criteriaJudge.grade;
                break;
                case 5:
                    gradeCriteria5 += criteriaJudge.grade;
                break;
            }
        }
        
        project.dataValues.comentariosAgrupados = comentariosAgrupados;


        const gradeCriteria1Rounded = (gradeCriteria1/contadorJuez).toFixed(2);
        const gradeCriteria2Rounded = (gradeCriteria2/contadorJuez).toFixed(2);
        const gradeCriteria3Rounded = (gradeCriteria3/contadorJuez).toFixed(2); 
        const gradeCriteria4Rounded = (gradeCriteria4/contadorJuez).toFixed(2); 
        const gradeCriteria5Rounded = (gradeCriteria5/contadorJuez).toFixed(2);

        project.dataValues.gradeCriteria1 = gradeCriteria1Rounded
        project.dataValues.gradeCriteria2 = gradeCriteria2Rounded
        project.dataValues.gradeCriteria3 = gradeCriteria3Rounded
        project.dataValues.gradeCriteria4 = gradeCriteria4Rounded
        project.dataValues.gradeCriteria5 = gradeCriteria5Rounded

        let sumGrades = parseFloat(gradeCriteria1Rounded) + parseFloat(gradeCriteria2Rounded) + parseFloat(gradeCriteria3Rounded) + parseFloat(gradeCriteria4Rounded) + parseFloat(gradeCriteria5Rounded);

        const finalGrade = sumGrades / 5;

        project.dataValues.finalGrade = finalGrade.toFixed(2);


        

        // Obtener todos los comentarios asociados al proyecto
        const comments = await CommentsModel.findAll({
            where: { id_person: project.Lider.id, id_project: req.params.id, },
            order: [['createdAt', 'DESC']]
        });

        if(comments.length ==0){
            
            project.dataValues.comment = null;
        }

        const latestComment = comments.length > 0 ? comments[0] : null;
        project.dataValues.comment = latestComment;

        const criterias = await CriteriaModel.findAll();
        project.dataValues.criterias = criterias;

        // Responder con el proyecto que incluye los nombres de la categoría y el área
        res.json(project);
    } catch (error) {
        // Manejar cualquier error que ocurra durante la consulta
        console.error('Error al obtener el proyecto:', error);
        res.status(500).json({ message: 'Hubo un error al obtener el proyecto.' });
    }
}


//Actualizar un proyecto
export const updateProject = async (req, res) => {
    try {
        await ProjectModel.update(req.body, {
            where: { id: req.params.id}
        })
        res.json({
            "message":"¡Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}

//Eliminar un registro
export const deleteProject = async (req, res) => {
    try {
        await ProjectModel.destroy({ 
            where: { id : req.params.id }
        })
        res.json({
            "message":"¡Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}

//Registro 
//Registro del proyecto
async function registerProject (req, res){

    var id_profesorAsesor = 0;
    
    const { id_student, title, description, linkVideo, linkPoster, area, category, materials, members, teachers } = req.body;
    console.log(id_student + " " + title + " " , description + " " + linkVideo + " " + linkPoster +  " " + area + " " + category + " " + materials);  

    //var codigo = title.substring(0,5) + description.substring(0,5) + area + category;

    var contadorProfe = 0;

    const teacherIds = [];
    // Para cada profesor, crear un objeto Person y guardarlo en la base de datos
    for (const teacher of teachers) {

        const existingPerson = await PersonModel.findOne({ where: { email: teacher.email } });
            
            if (!existingPerson){
                //id_person(codigo + contadorProfe + "T"),
                const person = await PersonModel.create({
                    id: teacher.email,
                    name: teacher.name,
                    lastName: teacher.lastName,
                    email: teacher.email,
                    isJudge: 0,
                    ISACTIVE: 1
                });
                if (contadorProfe === 0){
                    id_profesorAsesor = person.id;
                }
                else{
                    teacherIds.push(person.id);
                }

            }
            else{
                if (contadorProfe === 0){
                    id_profesorAsesor = existingPerson.id;
                }
                else{
                    teacherIds.push(existingPerson.id);
                }
            }

        contadorProfe++;

    // Guardar la persona en la base de datos o realizar alguna acción necesaria
    }
    let nombreArea = await AreaModel.findOne({where: {id: area}});
    let nombreCategoria = await CategoryModel.findOne({where: {id: category}});
    let prefix = nombreArea["name"].substring(0,3) + nombreCategoria["title"].substring(0,3)

    const project = await ProjectModel.create({
        title,
        description,
        linkVideo,
        linkPoster,
        statusGeneral: "en revision",
        statusPoster: "en revision",
        statusVideo: "en revision",
        id_edition: 1,
        id_area: area,
        id_category: category,
        id_responsable: id_profesorAsesor,
        id_lider: id_student,
        prefix: prefix
    });

    const projectId = project.id
    console.log(projectId)

        // Añadir los profesores al proyecto
    console.log(teacherIds);
    if (teacherIds.length > 0) {
        await project.addAsesores(teacherIds);  // Asegúrate de que este método coincide con tu relación definida
        console.log('Profesores añadidos al proyecto')
    }
    console.log("ya pasó")
    // Crear un nuevo proyecto con los datos recibidos

    // Guardar el proyecto en la base de datos
    const team = await TeamModel.create({
        name: title,
        id_leader: id_student,
        id_project: projectId
    });
    console.log("paso del equipo")
    // Para cada miembro, crear un objeto Student y guardarlo en la base de datos
    var contadorStudent = 0
    for (const member of members) {
        const existingStudent = await StudentModel.findOne({ where: { enrollment: member.enrollment } });

        //id_student: (codigo + contadorStudent + "S")
        if (!existingStudent){
            const student = await StudentModel.create({
                id: member.enrollment,
                name: member.name,
                lastName: member.lastName,
                enrollment: member.enrollment,
                isActive: 1
            })
            await team.addStudent(student);
        }
        else{
            await team.addStudent(existingStudent);
        }
        
        contadorStudent++;


    // Guardar el estudiante en la base de datos o realizar alguna acción necesaria
    }



    for (const material of materials) {
        await MaterialProjectModel.create({
            id_project: projectId,
            id_material: material.id_material,
            amount: material.amount
        });
    }

      // Responder al cliente con un mensaje de éxito o cualquier otro dato necesario
    res.json({ message: 'Datos guardados exitosamente.' });
}

async function formProject() {
    const categories = await CategoryModel.findAll();
    const areas = await AreaModel.findAll();
    const teachers = await PersonModel.findAll();
    const students = await StudentModel.findAll();
    return {
        students: students,
        teachers: teachers,
        categories: categories,
        areas: areas
    };
}

export const handleRegister = async(req, res) => {
    if (req.method === 'GET') {
        try {
            const data = await formProject();
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else if (req.method === 'POST') {
        try {
            await registerProject(req, res);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        // Manejar otros métodos HTTP si es necesario
        res.status(405).send('Método HTTP no permitido');
    }
}


export const getProjectsByResponsable = async (req, res) => {
    try {
        const projects = await ProjectModel.findAll({
            where: { id_responsable: req.params.id_responsable },
            include: [
              { model: AreaModel, as: 'area' },
              { model: CategoryModel, as: 'category' }
            ]
          });
  
      // Aplanar los datos
      const flattenedProjects = projects.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        linkVideo: project.linkVideo,
        linkPoster: project.linkPoster,
        statusGeneral: project.statusGeneral,
        statusPoster: project.statusPoster,
        statusVideo: project.statusVideo,
        area: project.area.name,
        category: project.category.title,
        person: project.person,
        student: project.student,
        team: project.team,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt
      }));
  
      res.json(flattenedProjects);
    } catch (error) {
      console.error('Error al obtener los proyectos:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

//Actualizar un proyecto
async function getProjectById(id) {
    try {
        const project = await ProjectModel.findByPk(id);

        // Verificar si se encontró el proyecto
        if (!project) {
            throw new Error('El proyecto no fue encontrado.');
        }

        return project;
    } catch (error) {
        // Manejar cualquier error que ocurra durante la consulta
        console.error('Error al obtener el proyecto:', error);
        throw error;
    }
}

async function updateProjectById(req,res) {
    try {
        console.log(req.body)
        req.body.statusGeneral = "en revision";
        await ProjectModel.update(req.body, {
            where: { id: req.params.id}
        })
        res.json({
            "message":"¡Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}


export const handleEdition = async (req, res) => {
   
    console.log(req.method);

    if (req.method === 'GET') {
        try {
            const data = await getProjectById(req.params.id);
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else if (req.method === 'PUT') {
        try {
            console.log(req.body);
            await updateProjectById(req, res);
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al procesar los datos.' });
        }
    } else {
        res.status(405).send('Método HTTP no permitido');
    }
};


//Eliminar un proyecto y obtener un resumen de los proyectos de un estudiante
async function getProjectByStudentID(id_student) {
    try {
        const projects = await ProjectModel.findAll({
            where: {
                id_lider: id_student
            },
            include:[
                {model: CategoryModel},
                {model: AreaModel}
            ]

    
    })
        // Verificar si se encontró el proyecto
        if (!projects) {
            throw new Error('El proyecto no fue encontrado.');
        }

        return projects;
    } catch (error) {
        // Manejar cualquier error que ocurra durante la consulta
        console.error('Error al obtener el proyecto:', error);
        throw error;
    }
}


async function deleteProjectByID(id_project) {
    const transaction = await db.transaction();
    try {
        console.log(`Iniciando eliminación del proyecto con id: ${id_project}`);

        const idTeam = await TeamModel.findOne({
            where: { id_project },
            transaction
        });

        const teamMembersDeleteCount = await TeamMemberModel.destroy({
            where: { id_team: idTeam.id},
            transaction
        });
        console.log(`Integrantes eliminados: ${teamMembersDeleteCount}`);

        // Eliminar equipos relacionados
        const teamDeleteCount = await TeamModel.destroy({
            where: { id_project: id_project },
            transaction
        });
        console.log(`Equipos eliminados: ${teamDeleteCount}`);

        const materialsDeleteCount = await MaterialProjectModel.destroy({
            where: { id_project: id_project },
            transaction
        });
        console.log(`Materiales eliminados: ${materialsDeleteCount}`);

        // Eliminar relaciones en la tabla intermedia assessor_projects usando una consulta SQL nativa
        const [results, metadata] = await db.query(
            'DELETE FROM "asessor_projects" WHERE "id_project" = :id_project',
            {
                replacements: { id_project: id_project },
                transaction
            }
        );
        console.log(`Relaciones asesor-proyecto eliminadas: ${metadata.rowCount}`);


        const [res, metaData] = await db.query(
            'DELETE FROM "comments" WHERE "id_project" = :id_project',
            {
                replacements: { id_project: id_project },
                transaction
            }
        );
        console.log(`Relaciones comentario-proyecto eliminadas: ${metaData.rowCount}`);


        const [resu, meta] = await db.query(
            'DELETE FROM "criteria_judges" WHERE "id_project" = :id_project',
            {
                replacements: { id_project: id_project },
                transaction
            }
        );
        console.log(`Relaciones criteria-proyecto eliminadas: ${meta.rowCount}`);

        // Eliminar el proyecto
        const projectDeleteCount = await ProjectModel.destroy({
            where: { id: id_project },
            transaction
        });
        console.log(`Proyectos eliminados: ${projectDeleteCount}`);

        // Si todas las eliminaciones fueron exitosas, confirmar la transacción
        await transaction.commit();
        console.log(`Eliminación del proyecto con id: ${id_project} completada exitosamente`);

        return { message: 'Proyecto y sus registros relacionados eliminados correctamente.' };
    } catch (error) {
        // Si hubo algún error, revertir la transacción
        await transaction.rollback();

        // Manejar cualquier error que ocurra durante la consulta
        console.error('Error al eliminar el proyecto y sus registros relacionados:', error);
        throw error;
    }
}


export const handleResumen = async (req, res) => {
    console.log(`Método HTTP recibido: ${req.method}`);

    if (req.method === 'GET') {
        try {
            const data = await getProjectByStudentID(req.params.id);
            res.json(data);
        } catch (error) {
            console.error('Error al obtener proyectos:', error);
            res.status(500).json({ message: error.message });
        }
    } else if (req.method === 'DELETE') {
        try {
            const message = await deleteProjectByID(req.params.id);
            console.log('Mensaje de eliminación:', message);
            res.json(message);
        } catch (error) {
            console.error('Error al eliminar el proyecto:', error);
            res.status(500).json({ error: 'Hubo un error al eliminar el proyecto.' });
        }
    } else {
        res.status(405).send('Método HTTP no permitido');
    }
};

//** Extra Methods **/

// Fetch project status data for the doughnut chart
export const getProjectStatusData = async (req, res) => {
  try {
    const reviewedCount = await ProjectModel.count({
      where: {
        statusGeneral: 'revisado'
      }
    });

    const pendingCount = await ProjectModel.count({
      where: {
        statusGeneral: 'en revision'
      }
    });

    res.json({
      labels: ['Revisado', 'Pendiente'],
      data: [reviewedCount, pendingCount]
    });
  } catch (error) {
    console.error('Error fetching project status data:', error);
    res.status(500).json({ error: 'Internal server error while fetching project status data.' });
  }
};

// controllers/MaterialController.js
export const getMaterialChecklistItems = async (req, res) => {
    try {
        // Fetch all materials
        const materials = await MaterialModel.findAll();

        // Fetch the total amounts for each material
        const totalAmounts = await MaterialProjectModel.findAll({
            attributes: [
                'id_material',
                [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalAmount']
            ],
            group: ['id_material']
        });

        // Convert the totals to a lookup object
        const totalAmountsLookup = totalAmounts.reduce((acc, item) => {
            acc[item.id_material] = item.dataValues.totalAmount;
            return acc;
        }, {});

        // Format materials into checklist items
        const checklistItems = materials.map(material => ({
            id: material.id,
            text: `${material.name} (${totalAmountsLookup[material.id] || 0})`, // Name with total amount in brackets
        }));

        res.json(checklistItems);
    } catch (error) {
        console.error("Error fetching checklist items:", error);
        res.status(500).json({ error: "Internal server error while fetching checklist items." });
    }
};

// Función para obtener todos los proyectos ordenados de manera ascendente por id
export const fetchAllProjects = async () => {
  try {
    const projects = await Project.findAll({
      order: [
        ['id', 'ASC'] // Orden ascendente por la columna 'id'
      ]
    });
    return projects;
  } catch (error) {
    console.error('Error al obtener los proyectos:', error);
    throw error;
  }
}

// Función para obtener un proyecto por su ID
export const fetchProjectById = async (projectId) => {
  try {
    const project = await Project.findByPk(projectId); // Utilizamos findByPk para buscar por primary key
    if (!project) {
      throw new Error(`Proyecto con id ${projectId} no encontrado`);
    }
    return project;
  } catch (error) {
    console.error(`Error al obtener el proyecto con id ${projectId}:`, error);
    throw error;
  }
}


//Mostrar y actualizar materiales adicionales
async function getMaterialsByProyectID(id) {
    try {
        const projects = await MaterialProjectModel.findAll({
            where: {
                id_project: id
            }  
    })
        // Verificar si se encontró el proyecto
        if (!projects) {
            throw new Error('El proyecto no fue encontrado.');
        }

        return projects;
    } catch (error) {
        // Manejar cualquier error que ocurra durante la consulta
        console.error('Error al obtener el proyecto:', error);
        throw error;
    }
}


async function updateMaterialsByProjectID(req, res) {
    try {
        const projectId = req.params.id;
        const materials = req.body;
        console.log(req.body)
        for (const material of materials) {
            await MaterialProjectModel.update(
                { amount: material.amount },
                {
                    where: {
                        id_project: projectId,
                        id_material: material.id_material
                    }
                }
            );
        }
        res.json({
            "message":"¡Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}


export const handleMaterials = async (req, res) => {
    console.log(`Método HTTP recibido: ${req.method}`);

    if (req.method === 'GET') {
        try {
            const data = await getMaterialsByProyectID(req.params.id);
            res.json(data);
        } catch (error) {
            console.error('Error al obtener materiales:', error);
            res.status(500).json({ message: error.message });
        }
    } else if (req.method === 'PUT') {
        try {

            const message = await updateMaterialsByProjectID(req,res);

            res.json(message);

        } catch (error) {
            console.error('Error al actualizar materiales del proyecto:', error);
            res.status(500).json({ error: 'Hubo un error al actualizar materiales del proyecto.' });
        }
    } else {
        res.status(405).send('Método HTTP no permitido');
    }
};


export const getProjectCertificate = async (req, res) => {
    try {
        const projects = await ProjectModel.findAll({
            where: {
                id_lider: req.params.id_person
            },

                include: [
                    { model: AreaModel },
                    { model: CategoryModel },
                    { model: PersonModel,
                        as: 'Lider',
                    },
                    { model: StudentModel },
                    { model: TeamModel,
                        include: [
                            {
                                model: StudentModel,
                                through: 'team_members'
                            }
                        ]
                    }
                ]
        });

        // Verificar si se encontró el proyecto
        if (!projects || projects.length === 0) {
            return res.status(404).json({ message: 'El proyecto no fue encontrado.' });
        }

        return res.status(200).json(projects);
    } catch (error) {
        // Manejar cualquier error que ocurra durante la consulta
        console.error('Error al obtener el proyecto:', error);
        return res.status(500).json({ message: 'Error al obtener el proyecto.', error: error.message });
    }
};
