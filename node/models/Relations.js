import AreaModel from "./AreaModel.js";
import CategoryModel from "./CategoryModel.js";
import EditionModel from "./EditionModel.js";
import PersonModel from "./PersonModel.js";
import ProjectModel from "./ProjectModel.js";
import StudentModel from "./StudentModel.js";
import TeamModel from "./TeamModel.js";
import MaterialModel from "./MaterialModel.js";
import MaterialProjectModel from "./MaterialProjectModel.js";
import CommentsModel from "./CommentsModel.js";
import CriteriaModel from "./CriteriaModel.js";
import CriteriaJudgeModel from "./CriteriaJudgeModel.js";
import TeamMemberModel from "./TeamMemberModel.js";
import AsessorProjectModel from "./AsessorProjectModel.js";

TeamModel.belongsTo(ProjectModel, {foreignKey: 'id_project'});
ProjectModel.hasOne(TeamModel, {foreignKey: 'id_project'});


StudentModel.hasMany(ProjectModel, {foreignKey: 'id_lider'});
ProjectModel.belongsTo(StudentModel, { foreignKey: 'id_lider' });

PersonModel.hasMany(ProjectModel, {foreignKey: 'id_responsable', as: 'ProyectosLiderados'});
ProjectModel.belongsTo(PersonModel, { foreignKey: 'id_responsable', as: 'Lider' });

AreaModel.hasMany(ProjectModel, {foreignKey: 'id_area'});
ProjectModel.belongsTo(AreaModel, { foreignKey: 'id_area' });

CategoryModel.hasMany(ProjectModel, {foreignKey: 'id_category'});
ProjectModel.belongsTo(CategoryModel, { foreignKey: 'id_category' });



EditionModel.hasMany(ProjectModel, {foreignKey: 'id_edition'});
PersonModel.hasMany(ProjectModel, {foreignKey: 'id_responsable'});


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
        otherKey: 'id_team',

});

TeamModel.belongsToMany(StudentModel, {
        through: 'team_members', // Nombre de tu tabla intermedia
        foreignKey: 'id_team',   // Nombre de la columna en team_members que referencia equipos
        otherKey: 'id_member',
});

      
MaterialModel.belongsToMany(ProjectModel, {
        through: 'materials_projects', // Nombre de tu tabla intermedia
        foreignKey: 'id_material',   // Nombre de la columna en team_members que referencia equipos

});

ProjectModel.belongsToMany(MaterialModel, {
        through: 'materials_projects', // Nombre de tu tabla intermedia
        foreignKey: 'id_project',   // Nombre de la columna en team_members que referencia equipos
});


ProjectModel.hasMany(MaterialProjectModel, {foreignKey: 'id_project'});
MaterialProjectModel.belongsTo(ProjectModel, {foreignKey: 'id_project'})




StudentModel.hasMany(TeamModel, {foreignKey: 'id_leader'});
TeamModel.belongsTo(StudentModel, {foreignKey: 'id_leader'})



ProjectModel.hasMany(CommentsModel, { foreignKey: 'id_project' });
CommentsModel.belongsTo(ProjectModel, { foreignKey: 'id_project' });



PersonModel.hasMany(CommentsModel, {foreignKey: 'id_person'});
CommentsModel.belongsTo(PersonModel, { foreignKey: 'id_person'});





ProjectModel.hasMany(CriteriaJudgeModel, {foreignKey: 'id_project'});
CriteriaJudgeModel.belongsTo(ProjectModel, { foreignKey: 'id_project'});




export {
        AreaModel,
        CategoryModel,
        EditionModel,
        PersonModel,
        ProjectModel,
        StudentModel,
        TeamModel,
        MaterialModel,
        MaterialProjectModel,
        CommentsModel,
        CriteriaModel,
        CriteriaJudgeModel,
        TeamMemberModel,
        AsessorProjectModel
};