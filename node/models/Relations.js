import AreaModel from "./AreaModel.js";
import CategoryModel from "./CategoryModel.js";
import EditionModel from "./EditionModel.js";
import PersonModel from "./PersonModel.js";
import ProjectModel from "./ProjectModel.js";
import StudentModel from "./StudentModel.js";
import TeamModel from "./TeamModel.js";
import MaterialModel from "./MaterialModel.js";
import MaterialProjectModel from "./MaterialProjectModel.js";
import AdminModel from "./AdminModel.js";
import AnnounceModel from "./AnnounceModel.js";
import MapModel from "./MapModel.js";
import ProjectMapModel from "./ProjectMapModel.js";
import CommentsModel from "./CommentModel.js";
import CriteriaModel from "./CriteriaModel.js";
import CriteriaJudgeModel from "./CriteriaJudgeModel.js";
import DisqualifiedModel from "./DisqualifiedModel.js";
import AreaPersonModel from "./AreaPersonModel.js";
import AsessorProjectModel from './AsessorProjectModel.js'; 
import JudgeProjectModel from "./JudgeProjectModel.js";
import TeamMemberModel from "./TeamMemberModel.js";


TeamModel.belongsTo(ProjectModel, {foreignKey: 'id_project'});
ProjectModel.hasOne(TeamModel, {foreignKey: 'id_project'});


StudentModel.hasMany(ProjectModel, {foreignKey: 'id_lider'});
ProjectModel.belongsTo(StudentModel, { foreignKey: 'id_lider' });

PersonModel.hasMany(ProjectModel, {foreignKey: 'id_responsable', as: 'ProyectosLiderados'});
ProjectModel.belongsTo(PersonModel, { foreignKey: 'id_responsable', as: 'Lider' });

AreaModel.hasMany(ProjectModel, {foreignKey: 'id_area'});
ProjectModel.belongsTo(AreaModel, { foreignKey: 'id_area' });

// Area Person relation
PersonModel.belongsToMany(AreaModel, { through: AreaPersonModel, foreignKey: 'id_person' });
AreaModel.belongsToMany(PersonModel, { through: AreaPersonModel, foreignKey: 'id_area' });

CategoryModel.hasMany(ProjectModel, {foreignKey: 'id_category'});
ProjectModel.belongsTo(CategoryModel, { foreignKey: 'id_category' });

// AsessorProjectModel associations
AsessorProjectModel.belongsTo(ProjectModel, { foreignKey: 'id_project' });
AsessorProjectModel.belongsTo(PersonModel, { foreignKey: 'id_person' });

// ProjectModel associations
ProjectModel.belongsToMany(PersonModel, { through: AsessorProjectModel, foreignKey: 'id_project' });

// PersonModel associations
PersonModel.belongsToMany(ProjectModel, { through: AsessorProjectModel, foreignKey: 'id_person' });


// JudgeProjectModel associations
JudgeProjectModel.belongsTo(ProjectModel, { foreignKey: 'id_project' });
JudgeProjectModel.belongsTo(PersonModel, { foreignKey: 'id_person' });

// ProjectModel associations
ProjectModel.belongsToMany(PersonModel, { through: JudgeProjectModel, foreignKey: 'id_project' });

// PersonModel associations
PersonModel.belongsToMany(ProjectModel, { through: JudgeProjectModel, foreignKey: 'id_person' });


EditionModel.hasMany(ProjectModel, {foreignKey: 'id_edition'});
PersonModel.hasMany(ProjectModel, {foreignKey: 'id_responsable'});

AdminModel.hasMany(DisqualifiedModel,{foreignKey: 'id_admin'});
DisqualifiedModel.belongsTo(AdminModel,{foreignKey: 'id_admin'});

ProjectModel.hasMany(DisqualifiedModel,{foreignKey: 'id_project'});
DisqualifiedModel.belongsTo(AdminModel,{foreignKey: 'id_project'});
//Definición de la relacion de admin con anuncios

AdminModel.belongsToMany(AnnounceModel,
        {through: 'admin_announcements',
        foreignKey: 'id_admin',
        otherKey: 'id_announce'
});
AnnounceModel.belongsToMany(AdminModel,
        {through: 'admin_announcements',
        foreignKey: 'id_announce',
        otherKey: 'id_admin'
});


PersonModel.belongsToMany(ProjectModel, {
        through: 'asessor_projects', // Nombre de tu tabla intermedia
        foreignKey: 'id_person', // Nombre de la columna en team_members que referencia estudiantes
        otherKey: 'id_project',
        as: 'ProyectosAsesorados'
});

ProjectModel.belongsToMany(PersonModel, {
        through: 'asessor_projects', // Nombre de tu tabla intermedia
        foreignKey: 'id_project', // Nombre de la columna en team_members que referencia estudiantes
        otherKey: 'id_person',
        as: 'Asesores'
});



// Definición de la relación desde StudentModel a TeamModel
StudentModel.belongsToMany(TeamModel, {
        through: 'team_members', // Nombre de tu tabla intermedia
        foreignKey: 'id_member', // Nombre de la columna en team_members que referencia estudiantes
        otherKey: 'id_team'

});

TeamModel.belongsToMany(StudentModel, {
        through: 'team_members', // Nombre de tu tabla intermedia
        foreignKey: 'id_team',   // Nombre de la columna en team_members que referencia equipos
        otherKey: 'id_member'
});

      
MaterialModel.belongsToMany(ProjectModel, {
        through: 'materials_projects', // Nombre de tu tabla intermedia
        foreignKey: 'id_material'   // Nombre de la columna en team_members que referencia equipos

});

ProjectModel.belongsToMany(MaterialModel, {
        through: 'materials_projects', // Nombre de tu tabla intermedia
        foreignKey: 'id_project'   // Nombre de la columna en team_members que referencia equipos
});

ProjectModel.hasMany(MaterialProjectModel, {foreignKey: 'id_project'});
MaterialProjectModel.belongsTo(ProjectModel, {foreignKey: 'id_project'})


// Define associations if not already defined
MaterialModel.hasMany(MaterialProjectModel, { foreignKey: 'id_material' });
MaterialProjectModel.belongsTo(MaterialModel, { foreignKey: 'id_material' });

StudentModel.hasMany(TeamModel, {foreignKey: 'id_leader'});
TeamModel.belongsTo(StudentModel, {foreignKey: 'id_leader'});

//Mapa

ProjectModel.belongsToMany(MapModel,{
        through: 'projects_maps',
        foreignKey: 'id'
});

MapModel.belongsToMany(ProjectModel,{
        through: 'projects_maps',
        foreignKey: 'id'
});

//comentarios
PersonModel.hasMany(CommentsModel,{foreignKey:'id_person'});
CommentsModel.belongsTo(PersonModel,{foreignKey:'id_person'});
ProjectModel.hasMany(CommentsModel,{foreignKey:'id_project'});
CommentsModel.belongsTo(ProjectModel, { foreignKey: 'id_project' });

//criterios
CriteriaModel.hasMany(CriteriaJudgeModel,{foreignKey:'id_criteria'});
CriteriaJudgeModel.belongsTo(CriteriaModel,{foreignKey:'id_criteria'});

PersonModel.hasMany(CriteriaJudgeModel,{foreignKey:'id_person'});
CriteriaJudgeModel.belongsTo(PersonModel,{foreignKey:'id_person'});

ProjectModel.hasMany(CriteriaJudgeModel,{foreignKey:'id_project'});
CriteriaJudgeModel.belongsTo(ProjectModel,{foreignKey: 'id_project'});

export {
        AreaModel,
        AreaPersonModel,
        CategoryModel,
        EditionModel,
        PersonModel,
        ProjectModel,
        StudentModel,
        TeamModel,
        MaterialModel,
        MaterialProjectModel,
        ProjectMapModel,
        CommentsModel,
        MapModel,
        CriteriaJudgeModel,
        CriteriaModel,
        AdminModel,
        AnnounceModel,
        DisqualifiedModel,
        AsessorProjectModel,
        JudgeProjectModel,
        TeamMemberModel
};