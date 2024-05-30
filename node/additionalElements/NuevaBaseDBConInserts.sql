CREATE TABLE "maps" (
  "id" INT GENERATED ALWAYS AS IDENTITY NOT NULL,
  "map_image" VARCHAR(60),
  "createdAt" DATE,
  "updatedAt" DATE,
  PRIMARY KEY ("id")
);

CREATE TABLE "editions" (
  "id" INT GENERATED ALWAYS AS IDENTITY NOT NULL,
  "period" VARCHAR(30),
  "year" INT,
  "createdAt" DATE,
  "updatedAt" DATE,
  PRIMARY KEY ("id")
);

CREATE TABLE "students" (
  "id" VARCHAR(50) NOT NULL,
  "name" VARCHAR(30),
  "lastName" VARCHAR(50),
  "enrollment" VARCHAR(20),
  "isActive" INT,
  "createdAt" DATE,
  "updatedAt" DATE,
  PRIMARY KEY ("id")
);

CREATE TABLE "areas" (
  "id" INT GENERATED ALWAYS AS IDENTITY NOT NULL,
  "name" VARCHAR(40),
  "description" VARCHAR(60),
  "isActive" INT,
  "createdAt" DATE,
  "updatedAt" DATE,
  PRIMARY KEY ("id")
);

CREATE TABLE "categories" (
  "id" INT GENERATED ALWAYS AS IDENTITY NOT NULL,
  "title" VARCHAR(30),
  "description" VARCHAR(90),
  "isActive" INT,
  "createdAt" DATE,
  "updatedAt" DATE,
  PRIMARY KEY ("id")
);

CREATE TABLE "persons" (
  "id" VARCHAR(50) NOT NULL,
  "name" VARCHAR(30),
  "lastName" VARCHAR(50),
  "email" VARCHAR(60),
  "isJudge" INT,
  "ISACTIVE" INT,
  "createdAt" DATE,
  "updatedAt" DATE,
  PRIMARY KEY ("id")
);

CREATE TABLE "projects" (
  "id" VARCHAR(15) NOT NULL,
  "title" VARCHAR(50),
  "description" CLOB,
  "statusGeneral" VARCHAR(15) CHECK ("statusGeneral" IN ('aprobado', 'en revision', 'rechazado')),
  "statusPoster" VARCHAR(15) CHECK ("statusPoster" IN ('aprobado', 'en revision', 'rechazado')),
  "statusVideo" VARCHAR(15) CHECK ("statusVideo" IN ('aprobado', 'en revision', 'rechazado')),
  "linkPoster" VARCHAR(250),
  "linkVideo" VARCHAR(250),
  "finalGrade" FLOAT,
  "id_edition" INT,
  "id_area" INT,
  "id_category" INT,
  "id_lider" VARCHAR(50),
  "id_responsable" VARCHAR(50),
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_projects.id_edition"
    FOREIGN KEY ("id_edition")
      REFERENCES "editions"("id"),
  CONSTRAINT "FK_projects.id_lider"
    FOREIGN KEY ("id_lider")
      REFERENCES "students"("id"),
  CONSTRAINT "FK_projects.id_area"
    FOREIGN KEY ("id_area")
      REFERENCES "areas"("id"),
  CONSTRAINT "FK_projects.id_category"
    FOREIGN KEY ("id_category")
      REFERENCES "categories"("id"),
  CONSTRAINT "FK_projects.id_responsable"
    FOREIGN KEY ("id_responsable")
      REFERENCES "persons"("id")
);

CREATE TABLE "projects_maps" (
  "id_project" VARCHAR(15),
  "coordinates" VARCHAR(10),
  "id_map" INT,
  "createdAt" DATE,
  "updatedAt" DATE,
  CONSTRAINT "FK_projects_maps.id_map"
    FOREIGN KEY ("id_map")
      REFERENCES "maps"("id"),
  CONSTRAINT "FK_projects_maps.id_project"
    FOREIGN KEY ("id_project")
      REFERENCES "projects"("id")
);

CREATE TABLE "admins" (
  "id" VARCHAR(50) NOT NULL,
  "name" VARCHAR(30),
  "lastName" VARCHAR(50),
  "email" VARCHAR(60),
  "isActive" INT,
  "createdAt" DATE,
  "updatedAt" DATE,
  PRIMARY KEY ("id")
);

CREATE TABLE "announcements" (
  "id" INT GENERATED ALWAYS AS IDENTITY NOT NULL,
  "title" VARCHAR(30),
  "description" VARCHAR(90),
  "audience" VARCHAR(50) CHECK ("audience" IN ('students', 'teachers', 'judges')),
  "multimedia" VARCHAR(155),
  "createdAt" DATE,
  "updatedAt" DATE,
  PRIMARY KEY ("id")
);

CREATE TABLE "admin_announcements" (
  "id_admin" VARCHAR(50),
  "id_announce" INT,
  "createdAt" DATE,
  "updatedAt" DATE,
  CONSTRAINT "FK_admin_announcements.id_admin"
    FOREIGN KEY ("id_admin")
      REFERENCES "admins"("id"),
  CONSTRAINT "FK_admin_announcements.id_announce"
    FOREIGN KEY ("id_announce")
      REFERENCES "announcements"("id")
);

CREATE TABLE "project_disqualified" (
  "id_admin" VARCHAR(50),
  "id_project" VARCHAR(30),
  "reason" CLOB,
  CONSTRAINT "FK_Project_disqualified.id_admin"
    FOREIGN KEY ("id_admin")
      REFERENCES "admins"("id")
);

CREATE TABLE "teams" (
  "id" INT GENERATED ALWAYS AS IDENTITY NOT NULL,
  "name" VARCHAR(50),
  "id_leader" VARCHAR(50),
  "id_project" VARCHAR(15),
  "createdAt" DATE,
  "updatedAt" DATE,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_teams.id_leader"
    FOREIGN KEY ("id_leader")
      REFERENCES "students"("id"),
  CONSTRAINT "FK_teams.id_project"
    FOREIGN KEY ("id_project")
      REFERENCES "projects"("id")
);

CREATE TABLE "criterias" (
  "id" INT GENERATED ALWAYS AS IDENTITY NOT NULL,
  "description" VARCHAR(100),
  "weight" INT,
  "createdAt" DATE,
  "updatedAt" DATE,
  PRIMARY KEY ("id")
);

CREATE TABLE "materials" (
  "id" INT GENERATED ALWAYS AS IDENTITY NOT NULL,
  "name" VARCHAR(30),
  "createdAt" DATE,
  "updatedAt" DATE,
  PRIMARY KEY ("id")
);

CREATE TABLE "materials_projects" (
  "id_project" VARCHAR(15),
  "id_material" INT,
  "amount" INT,
  "createdAt" DATE,
  "updatedAt" DATE,
  CONSTRAINT "FK_materials_projects.id_material"
    FOREIGN KEY ("id_material")
      REFERENCES "materials"("id"),
  CONSTRAINT "FK_materials_projects.id_project"
    FOREIGN KEY ("id_project")
      REFERENCES "projects"("id")
);

CREATE TABLE "comments" (
  "id_person" VARCHAR(50),
  "id_project" VARCHAR(15),
  "comment" CLOB,
  "createdAt" DATE,
  "updatedAt" DATE,
  CONSTRAINT "FK_comments.id_person"
    FOREIGN KEY ("id_person")
      REFERENCES "persons"("id"),
  CONSTRAINT "FK_comments.id_project"
    FOREIGN KEY ("id_project")
      REFERENCES "projects"("id")
);

CREATE TABLE "team_members" (
  "id_team" INT,
  "id_member" VARCHAR(50),
  "createdAt" DATE,
  "updatedAt" DATE,
  CONSTRAINT "FK_team_members.id_member"
    FOREIGN KEY ("id_member")
      REFERENCES "students"("id"),
  CONSTRAINT "FK_team_members.id_team"
    FOREIGN KEY ("id_team")
      REFERENCES "teams"("id")
);

CREATE TABLE "asessor_projects" (
  "id_person" VARCHAR(50),
  "id_project" VARCHAR(15),
  "createdAt" DATE,
  "updatedAt" DATE,
  CONSTRAINT "FK_asessor_projects.id_person"
    FOREIGN KEY ("id_person")
      REFERENCES "persons"("id"),
  CONSTRAINT "FK_asessor_projects.id_project"
    FOREIGN KEY ("id_project")
      REFERENCES "projects"("id")
);

CREATE TABLE "criteria_judges" (
  "id_person" VARCHAR(50),
  "id_criteria" INT,
  "grade" INT,
  "id_project" VARCHAR(15),
  "Comentario" CLOB,
  "id_admin" VARCHAR(50),
  "createdAt" DATE,
  "updatedAt" DATE,
  CONSTRAINT "FK_criteria_judges.id_criteria"
    FOREIGN KEY ("id_criteria")
      REFERENCES "criterias"("id"),
  CONSTRAINT "FK_criteria_judges.id_person"
    FOREIGN KEY ("id_person")
      REFERENCES "persons"("id"),
  CONSTRAINT "FK_criteria_judges.id_project"
    FOREIGN KEY ("id_project")
      REFERENCES "projects"("id"),
  CONSTRAINT "FK_criteria_judges.id_admin"
    FOREIGN KEY ("id_admin")
      REFERENCES "admins"("id")
);

CREATE TABLE "judge_projects" (
  "id_person" VARCHAR(50),
  "id_project" VARCHAR(15),
  "createdAt" DATE,
  "updatedAt" DATE,
  CONSTRAINT "FK_judge_projects.id_person"
    FOREIGN KEY ("id_person")
      REFERENCES "persons"("id"),
  CONSTRAINT "FK_judge_projects.id_project"
    FOREIGN KEY ("id_project")
      REFERENCES "projects"("id")
);

CREATE TABLE "areas_persons" (
  "id_person" VARCHAR(50),
  "id_area" INT,
  CONSTRAINT "FK_persons_areas.id_person"
    FOREIGN KEY ("id_person")
      REFERENCES "persons"("id"),
  CONSTRAINT "FK_persons_areas.id_area"
    FOREIGN KEY ("id_area")
      REFERENCES "areas"("id")
);

-- INSERTS

Insert into ADMIN."students" ("id","name","lastName","enrollment","createdAt","updatedAt") values ('auth0|6654224574b4f6b24c120e5d','Sarai','Santiago Lozano','a01735331',to_date('27-MAY-24','DD-MON-RR'),to_date('27-MAY-24','DD-MON-RR'));
Insert into ADMIN."students" ("id","name","lastName","enrollment","createdAt","updatedAt") values ('auth0|66539b1ce539b35aea94e74d','Cruz Daniel','P rez Jim nez','a01736214',to_date('27-MAY-24','DD-MON-RR'),to_date('27-MAY-24','DD-MON-RR'));
Insert into ADMIN."students" ("id","name","lastName","enrollment","createdAt","updatedAt") values ('auth0|66465772cddc69d8a11bcff9','Gerry','Deust a Hern ndez','a01736455',to_date('27-MAY-24','DD-MON-RR'),to_date('27-MAY-24','DD-MON-RR'));
Insert into ADMIN."students" ("id","name","lastName","enrollment","createdAt","updatedAt") values ('auth0|66548dc83a478dce1bb57afb','Mikel','Edel','a01705713',to_date('28-MAY-24','DD-MON-RR'),to_date('28-MAY-24','DD-MON-RR'));
Insert into ADMIN."students" ("id","name","lastName","enrollment","createdAt","updatedAt") values ('auth0|6646cd3c4d1c357206d9c385','Marlon','Mart nez','a01424875',to_date('27-MAY-24','DD-MON-RR'),to_date('27-MAY-24','DD-MON-RR'));

Insert into ADMIN."persons" ("id","name","lastName","email","createdAt","updatedAt") values ('auth0|6653d38ae957844eac7c9f99','Rosa','Paredes','rgparedes@tec.mx',to_date('26-MAY-24','DD-MON-RR'),to_date('26-MAY-24','DD-MON-RR'));
Insert into ADMIN."persons" ("id","name","lastName","email","createdAt","updatedAt") values ('aromerog@tec.mx','Alba','Romero','aromerog@tec.mx',to_date('27-MAY-24','DD-MON-RR'),to_date('27-MAY-24','DD-MON-RR'));
Insert into ADMIN."persons" ("id","name","lastName","email","createdAt","updatedAt") values ('auth0|6654bd87f4306b7b1fa38ae0','Daniel','Perez','danperez@tec.mx',to_date('28-MAY-24','DD-MON-RR'),to_date('28-MAY-24','DD-MON-RR'));

Insert into ADMIN."areas" ("id","name","description","createdAt","updatedAt") values (21,'Cyber','Area relacionada',null,null);
Insert into ADMIN."areas" ("id","name","description","createdAt","updatedAt") values (1,'Nano',' rea relacionada con...',to_date('03-MAY-24','DD-MON-RR'),to_date('03-MAY-24','DD-MON-RR'));
Insert into ADMIN."areas" ("id","name","description","createdAt","updatedAt") values (2,'Nexus',' rea relacionada con...',to_date('03-MAY-24','DD-MON-RR'),to_date('03-MAY-24','DD-MON-RR'));
Insert into ADMIN."areas" ("id","name","description","createdAt","updatedAt") values (3,'Bio',' rea relacionada con...',to_date('03-MAY-24','DD-MON-RR'),to_date('03-MAY-24','DD-MON-RR'));

Insert into ADMIN."categories" ("id","title","description","createdAt","updatedAt") values (1,'Concepto','Categor a relacionada con...',to_date('03-MAY-24','DD-MON-RR'),to_date('03-MAY-24','DD-MON-RR'));
Insert into ADMIN."categories" ("id","title","description","createdAt","updatedAt") values (2,'Prototipo','Categor a relacionada con...',to_date('03-MAY-24','DD-MON-RR'),to_date('03-MAY-24','DD-MON-RR'));
Insert into ADMIN."categories" ("id","title","description","createdAt","updatedAt") values (3,'Prototipo finalizado','Categor a relacionada con...',to_date('03-MAY-24','DD-MON-RR'),to_date('03-MAY-24','DD-MON-RR'));

Insert into ADMIN."projects" ("id", "title", "description", "statusGeneral", "statusPoster", "statusVideo", "linkPoster", "linkVideo", "finalGrade", "id_edition", "id_area", "id_category", "id_lider", "id_responsable") values ('ABC10','title','descripcion','en revision','en revision','en revision','linkPoster','nuevofdsgsadgsdgasg',0,1,1,1,'auth0|66465772cddc69d8a11bcff9','auth0|6653d38ae957844eac7c9f99');

Insert into ADMIN."projects" ("id", "title", "description", "statusGeneral", "statusPoster", "statusVideo", "linkPoster", "linkVideo", "finalGrade", "id_edition", "id_area", "id_category", "id_lider", "id_responsable") values ('ABC11','title2','descripcion2','en revision','en revision','en revision','linkPoster','nuevofdsgsadgsdgasg',0,1,1,1,'auth0|6646cd3c4d1c357206d9c385','auth0|6653d38ae957844eac7c9f99');

Insert into ADMIN."teams" ("name","createdAt","updatedAt","id_leader","id_project") values ('nuevofdsgsadgsdgasg',to_date('29-MAY-24','DD-MON-RR'),to_date('29-MAY-24','DD-MON-RR'),'auth0|66465772cddc69d8a11bcff9','ABC11');
Insert into ADMIN."teams" ("name","createdAt","updatedAt","id_leader","id_project") values ('Proyecto de prueba 2',to_date('28-MAY-24','DD-MON-RR'),to_date('28-MAY-24','DD-MON-RR'),'auth0|6646cd3c4d1c357206d9c385','ABC10');


Insert into ADMIN."team_members" ("id_team","id_member","createdAt","updatedAt") values (5,'auth0|66539b1ce539b35aea94e74d',to_date('29-MAY-24','DD-MON-RR'),to_date('29-MAY-24','DD-MON-RR'));
Insert into ADMIN."team_members" ("id_team","id_member","createdAt","updatedAt") values (5,'auth0|66548dc83a478dce1bb57afb',to_date('28-MAY-24','DD-MON-RR'),to_date('28-MAY-24','DD-MON-RR'));
Insert into ADMIN."team_members" ("id_team","id_member","createdAt","updatedAt") values (5,'auth0|66465772cddc69d8a11bcff9',to_date('28-MAY-24','DD-MON-RR'),to_date('28-MAY-24','DD-MON-RR'));
Insert into ADMIN."team_members" ("id_team","id_member","createdAt","updatedAt") values (5,'auth0|66539b1ce539b35aea94e74d',to_date('28-MAY-24','DD-MON-RR'),to_date('28-MAY-24','DD-MON-RR'));
Insert into ADMIN."team_members" ("id_team","id_member","createdAt","updatedAt") values (5,'auth0|66465772cddc69d8a11bcff9',to_date('28-MAY-24','DD-MON-RR'),to_date('28-MAY-24','DD-MON-RR'));
Insert into ADMIN."team_members" ("id_team","id_member","createdAt","updatedAt") values (6,'auth0|66548dc83a478dce1bb57afb',to_date('28-MAY-24','DD-MON-RR'),to_date('28-MAY-24','DD-MON-RR'));
Insert into ADMIN."team_members" ("id_team","id_member","createdAt","updatedAt") values (6,'auth0|66548dc83a478dce1bb57afb',to_date('28-MAY-24','DD-MON-RR'),to_date('28-MAY-24','DD-MON-RR'));
Insert into ADMIN."team_members" ("id_team","id_member","createdAt","updatedAt") values (6,'auth0|6654224574b4f6b24c120e5d',to_date('28-MAY-24','DD-MON-RR'),to_date('28-MAY-24','DD-MON-RR'));
Insert into ADMIN."team_members" ("id_team","id_member","createdAt","updatedAt") values (6,'auth0|6654224574b4f6b24c120e5d',to_date('28-MAY-24','DD-MON-RR'),to_date('28-MAY-24','DD-MON-RR'));
Insert into ADMIN."team_members" ("id_team","id_member","createdAt","updatedAt") values (6,'auth0|6654224574b4f6b24c120e5d',to_date('28-MAY-24','DD-MON-RR'),to_date('28-MAY-24','DD-MON-RR'));

Insert into ADMIN."materials" ("name","createdAt","updatedAt") values ('contacto',null,null);
Insert into ADMIN."materials" ("name","createdAt","updatedAt") values ('mampara',null,null);
Insert into ADMIN."materials" ("name","createdAt","updatedAt") values ('pantalla',null,null);


Insert into ADMIN."materials_projects" ("id_project","id_material","amount","createdAt","updatedAt") values ('ABC10',1,2,to_date('28-MAY-24','DD-MON-RR'),to_date('28-MAY-24','DD-MON-RR'));
Insert into ADMIN."materials_projects" ("id_project","id_material","amount","createdAt","updatedAt") values ('ABC10',2,3,to_date('28-MAY-24','DD-MON-RR'),to_date('28-MAY-24','DD-MON-RR'));
Insert into ADMIN."materials_projects" ("id_project","id_material","amount","createdAt","updatedAt") values ('ABC10',3,5,to_date('28-MAY-24','DD-MON-RR'),to_date('28-MAY-24','DD-MON-RR'));
Insert into ADMIN."materials_projects" ("id_project","id_material","amount","createdAt","updatedAt") values ('ABC11',1,6,to_date('28-MAY-24','DD-MON-RR'),to_date('28-MAY-24','DD-MON-RR'));
Insert into ADMIN."materials_projects" ("id_project","id_material","amount","createdAt","updatedAt") values ('ABC11',2,2,to_date('28-MAY-24','DD-MON-RR'),to_date('28-MAY-24','DD-MON-RR'));
Insert into ADMIN."materials_projects" ("id_project","id_material","amount","createdAt","updatedAt") values ('ABC11',3,1,to_date('28-MAY-24','DD-MON-RR'),to_date('28-MAY-24','DD-MON-RR'));

Insert into ADMIN."asessor_projects" ("id_person","id_project","createdAt","updatedAt") values ('auth0|6654bd87f4306b7b1fa38ae0','ABC10',to_date('28-MAY-24','DD-MON-RR'),to_date('28-MAY-24','DD-MON-RR'));


--DROP ALL THE TABLES
drop table DBTOOLS$EXECUTION_HISTORY cascade constraints;
drop table "maps" cascade constraints;
drop table "editions" cascade constraints;
drop table "students" cascade constraints;
drop table "areas" cascade constraints;
drop table "categories" cascade constraints;
drop table "persons" cascade constraints;
drop table "projects" cascade constraints;
drop table "projects_maps" cascade constraints;
drop table "admins" cascade constraints;
drop table "announcements" cascade constraints;
drop table "admin_announcements" cascade constraints;
drop table "project_disqualified" cascade constraints;
drop table "teams" cascade constraints;
drop table "criterias" cascade constraints;
drop table "materials" cascade constraints;
drop table "materials_projects" cascade constraints;
drop table "comments" cascade constraints;
drop table "team_members" cascade constraints;
drop table "asessor_projects" cascade constraints;
drop table "criteria_judges" cascade constraints;
drop table "judge_projects" cascade constraints;
drop table "areas_persons" cascade constraints;


