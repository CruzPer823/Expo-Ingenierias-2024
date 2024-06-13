--CREATE TABLES  
  CREATE TABLE "maps" (
    "id" SERIAL PRIMARY KEY,
    "map_image" VARCHAR(60),
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
  );

  CREATE TABLE "editions" (
    "id" SERIAL PRIMARY KEY,
    "period" VARCHAR(30),
    "year" INT,
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
  );

  CREATE TABLE "students" (
    "id" VARCHAR(50) PRIMARY KEY,
    "name" VARCHAR(50),
    "lastName" VARCHAR(50),
    "enrollment" VARCHAR(20),
    "isActive" INT,
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
  );

  CREATE TABLE "areas" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(40),
    "description" VARCHAR(60),
    "isActive" INT,
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
  );

  CREATE TABLE "categories" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(30),
    "description" VARCHAR(90),
    "isActive" INT,
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
  );

  CREATE TABLE "persons" (
    "id" VARCHAR(50) PRIMARY KEY,
    "name" VARCHAR(50),
    "lastName" VARCHAR(50),
    "email" VARCHAR(60),
    "isJudge" INT,
    "isActive" INT,
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
  );

  CREATE TABLE "projects" (
    "id" VARCHAR(15) PRIMARY KEY,
    "title" VARCHAR(450),
    "description" TEXT,
    "statusGeneral" VARCHAR(15) CHECK ("statusGeneral" IN ('aprobado', 'en revision', 'rechazado')),
    "statusPoster" VARCHAR(15) CHECK ("statusPoster" IN ('aprobado', 'en revision', 'rechazado')),
    "statusVideo" VARCHAR(15) CHECK ("statusVideo" IN ('aprobado', 'en revision', 'rechazado')),
    "linkPoster" VARCHAR(450),
    "linkVideo" VARCHAR(450),
    "finalGrade" FLOAT,
    "id_edition" INT,
    "id_area" INT,
    "id_category" INT,
    "id_lider" VARCHAR(50),
    "id_responsable" VARCHAR(50),
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP,
    FOREIGN KEY ("id_edition") REFERENCES "editions"("id"),
    FOREIGN KEY ("id_area") REFERENCES "areas"("id"),
    FOREIGN KEY ("id_category") REFERENCES "categories"("id"),
    FOREIGN KEY ("id_lider") REFERENCES "students"("id"),
    FOREIGN KEY ("id_responsable") REFERENCES "persons"("id")
  );

  CREATE TABLE "projects_maps" (
    "id_project" VARCHAR(15),
    "coordinates" VARCHAR(10),
    "id_map" INT,
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP,
    FOREIGN KEY ("id_map") REFERENCES "maps"("id"),
    FOREIGN KEY ("id_project") REFERENCES "projects"("id")
  );

  CREATE TABLE "admins" (
    "id" VARCHAR(50) PRIMARY KEY,
    "name" VARCHAR(50),
    "lastName" VARCHAR(50),
    "email" VARCHAR(60),
    "isActive" INT,
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
  );

  CREATE TABLE "announcements" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(50),
    "description" VARCHAR(350),
    "audience" VARCHAR(50) CHECK ("audience" IN ('students', 'teachers', 'judges', 'all')),
    "multimedia" VARCHAR(355),
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
  );

  CREATE TABLE "admin_announcements" (
    "id_admin" VARCHAR(50),
    "id_announce" INT,
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP,
    FOREIGN KEY ("id_admin") REFERENCES "admins"("id"),
    FOREIGN KEY ("id_announce") REFERENCES "announcements"("id")
  );

  CREATE TABLE "project_disqualified" (
    "id_admin" VARCHAR(50),
    "id_project" VARCHAR(30),
    "reason" TEXT,
    FOREIGN KEY ("id_admin") REFERENCES "admins"("id")
  );

  CREATE TABLE "teams" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(450),
    "id_leader" VARCHAR(50),
    "id_project" VARCHAR(15),
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP,
    FOREIGN KEY ("id_leader") REFERENCES "students"("id"),
    FOREIGN KEY ("id_project") REFERENCES "projects"("id")
  );

  CREATE TABLE "criterias" (
    "id" SERIAL PRIMARY KEY,
    "description" VARCHAR(100),
    "weight" INT,
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
  );

  CREATE TABLE "materials" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(30),
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
  );

  CREATE TABLE "materials_projects" (
    "id_project" VARCHAR(15),
    "id_material" INT,
    "amount" INT,
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP,
    FOREIGN KEY ("id_material") REFERENCES "materials"("id"),
    FOREIGN KEY ("id_project") REFERENCES "projects"("id")
  );

  CREATE TABLE "comments" (
    "id_person" VARCHAR(50),
    "id_project" VARCHAR(15),
    "comment" TEXT,
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP,
    FOREIGN KEY ("id_person") REFERENCES "persons"("id"),
    FOREIGN KEY ("id_project") REFERENCES "projects"("id")
  );

  CREATE TABLE "team_members" (
    "id_team" INT,
    "id_member" VARCHAR(50),
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP,
    FOREIGN KEY ("id_member") REFERENCES "students"("id"),
    FOREIGN KEY ("id_team") REFERENCES "teams"("id")
  );

  CREATE TABLE "asessor_projects" (
    "id_person" VARCHAR(50),
    "id_project" VARCHAR(15),
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP,
    FOREIGN KEY ("id_person") REFERENCES "persons"("id"),
    FOREIGN KEY ("id_project") REFERENCES "projects"("id")
  );

  CREATE TABLE "criteria_judges" (
    "id_person" VARCHAR(50),
    "id_criteria" INT,
    "grade" INT,
    "id_project" VARCHAR(15),
    "Comentario" TEXT,
    "id_admin" VARCHAR(50),
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP,
    FOREIGN KEY ("id_criteria") REFERENCES "criterias"("id"),
    FOREIGN KEY ("id_person") REFERENCES "persons"("id"),
    FOREIGN KEY ("id_project") REFERENCES "projects"("id"),
    FOREIGN KEY ("id_admin") REFERENCES "admins"("id")
  );

  CREATE TABLE "judge_projects" (
    "id_person" VARCHAR(50),
    "id_project" VARCHAR(15),
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP,
    FOREIGN KEY ("id_person") REFERENCES "persons"("id"),
    FOREIGN KEY ("id_project") REFERENCES "projects"("id")
  );

  CREATE TABLE "areas_persons" (
    "id_person" VARCHAR(50),
    "id_area" INT,
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP,
    FOREIGN KEY ("id_person") REFERENCES "persons"("id"),
    FOREIGN KEY ("id_area") REFERENCES "areas"("id")
  );

  CREATE TABLE "announ_read_student" (
    "id_announce" INT,
    "id_student" VARCHAR(50),
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP,
    FOREIGN KEY ("id_announce") REFERENCES "announcements"("id"),
    FOREIGN KEY ("id_student") REFERENCES "students"("id")
  );

  CREATE TABLE "announ_read_person" (
    "id_announce" INT,
    "id_person" VARCHAR(50),
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP,
    FOREIGN KEY ("id_announce") REFERENCES "announcements"("id"),
    FOREIGN KEY ("id_person") REFERENCES "persons"("id")
  );

  CREATE TABLE "comments_judge" (
    "id_person" VARCHAR(50),
    "id_project" VARCHAR(15),
    "comment" TEXT,
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP,
    FOREIGN KEY ("id_person") REFERENCES "persons"("id"),
    FOREIGN KEY ("id_project") REFERENCES "projects"("id")
  );


--Inserts
  INSERT INTO "areas" ("name", "description", "createdAt", "updatedAt") 
  VALUES ('Cyber', 'Area relacionada', NULL, NULL);

  INSERT INTO "areas" ("name", "description", "createdAt", "updatedAt") 
  VALUES ('Nano', 'Area relacionada con...', '2024-05-03', '2024-05-03');

  INSERT INTO "areas" ("name", "description", "createdAt", "updatedAt") 
  VALUES ('Nexus', 'Area relacionada con...', '2024-05-03', '2024-05-03');

  INSERT INTO "areas" ("name", "description", "createdAt", "updatedAt") 
  VALUES ('Bio', 'Area relacionada con...', '2024-05-03', '2024-05-03');

  INSERT INTO "categories" ("title", "description", "createdAt", "updatedAt") 
  VALUES ('Concepto', 'Categoría relacionada con...', '2024-05-03', '2024-05-03');

  INSERT INTO "categories" ("title", "description", "createdAt", "updatedAt") 
  VALUES ('Prototipo', 'Categoría relacionada con...', '2024-05-03', '2024-05-03');

  INSERT INTO "categories" ("title", "description", "createdAt", "updatedAt") 
  VALUES ('Prototipo finalizado', 'Categoría relacionada con...', '2024-05-03', '2024-05-03');

  INSERT INTO "editions" ("period", "year", "createdAt", "updatedAt") 
  VALUES ('Primavera', 2023, '2024-05-03', '2024-05-03');

  INSERT INTO "editions" ("period", "year", "createdAt", "updatedAt") 
  VALUES ('Otoño', 2024, '2024-05-03', '2024-05-03');

  INSERT INTO "materials" ("name", "createdAt", "updatedAt") 
  VALUES ('contacto', NULL, NULL);

  INSERT INTO "materials" ("name", "createdAt", "updatedAt") 
  VALUES ('mampara', NULL, NULL);

  INSERT INTO "materials" ("name", "createdAt", "updatedAt") 
  VALUES ('pantalla', NULL, NULL);

  INSERT INTO "criterias" ("description", "weight", "createdAt", "updatedAt") 
  VALUES ('rubrica 1', 20, NULL, NULL);

  INSERT INTO "criterias" ("description", "weight", "createdAt", "updatedAt") 
  VALUES ('rubrica 2', 20, NULL, NULL);

  INSERT INTO "criterias" ("description", "weight", "createdAt", "updatedAt") 
  VALUES ('rubrica 3', 20, NULL, NULL);

  INSERT INTO "criterias" ("description", "weight", "createdAt", "updatedAt") 
  VALUES ('rubrica 4', 20, NULL, NULL);

  INSERT INTO "criterias" ("description", "weight", "createdAt", "updatedAt") 
  VALUES ('rubrica 5', 20, NULL, NULL);

  -- Inserciones en la tabla "admins"
  Insert into "admins" ("id","name","lastName","email","isActive","createdAt","updatedAt") values ('auth0|66539b1ce539b35aea94e74d','Cruz Daniel','P\E9rez Jim\E9nez','a01736214@tec.mx',1,to_date('07-JUN-24','DD-MON-RR'),to_date('07-JUN-24','DD-MON-RR')); 
  
  -- Inserciones en la tabla "persons"
  Insert into "persons" ("id","name","lastName","email","isJudge","ISACTIVE","createdAt","updatedAt") values ('auth0|6661f543de0e36db627a3b66','Alba','Romero Garcia','aromerog@tec.mx',1,1,null,to_date('08-JUN-24','DD-MON-RR'));
  Insert into "persons" ("id","name","lastName","email","isJudge","ISACTIVE","createdAt","updatedAt") values ('auth0|6653d38ae957844eac7c9f99','Rosa','Paredes','rgparedes@tec.mx',0,1,null,to_date('08-JUN-24','DD-MON-RR'));
  Insert into "persons" ("id","name","lastName","email","isJudge","ISACTIVE","createdAt","updatedAt") values ('auth0|6654bd87f4306b7b1fa38ae0','Daniel','Perez','danperez@tec.mx',0,1,null,to_date('08-JUN-24','DD-MON-RR'));
  Insert into "persons" ("id","name","lastName","email","isJudge","ISACTIVE","createdAt","updatedAt") values ('auth0|66623f2d49e22d385f6c7954','Gerardo','Deust\FAa Hern\E1ndez','gerrydeustua@tec.mx',0,1,null,to_date('08-JUN-24','DD-MON-RR'));
  Insert into "persons" ("id","name","lastName","email","isJudge","ISACTIVE","createdAt","updatedAt") values ('auth0|66641a48d4c35b8c48825b36','Testuser','User','testuser@tec.mx',null,1,null,null);
  Insert into "persons" ("id","name","lastName","email","isJudge","ISACTIVE","createdAt","updatedAt") values ('auth0|66647cba492e01ff04f7d403','Testuser2','User','userserus@tec.mx',null,1,null,null);
  
  -- Inserciones en la tabla "students"
  Insert into "students" ("id","name","lastName","enrollment","isActive","createdAt","updatedAt") values ('auth0|66539b1ce539b35aea94e74d','Cruz Daniel','P\E9rez Jim\E9nez','a01736214',1,null,null);
  Insert into "students" ("id","name","lastName","enrollment","isActive","createdAt","updatedAt") values ('auth0|66465772cddc69d8a11bcff9','Gerardo','Deust\FAa Hern\E1ndez','a01736455',1,null,null);
  Insert into "students" ("id","name","lastName","enrollment","isActive","createdAt","updatedAt") values ('auth0|6661ecf585be50d179fe1889','Ale Hugo','Zago','a01736278',1,null,null);
  Insert into "students" ("id","name","lastName","enrollment","isActive","createdAt","updatedAt") values ('auth0|66548dc83a478dce1bb57afb','Mikel','Edel','a01705713',1,null,null);
  Insert into "students" ("id","name","lastName","enrollment","isActive","createdAt","updatedAt") values ('auth0|6661f40dde0e36db627a39d7','Rogelio','Hern\E1ndez Cort\E9s','a01735819',0,null,to_date('08-JUN-24','DD-MON-RR'));
  Insert into "students" ("id","name","lastName","enrollment","isActive","createdAt","updatedAt") values ('auth0|6661ecffde0e36db627a30ff','Cesar','Guerra Martinez','a01656774',1,null,null);
  Insert into "students" ("id","name","lastName","enrollment","isActive","createdAt","updatedAt") values ('auth0|6654224574b4f6b24c120e5d','Sarai','Santiago Lozano','a01735331',1,null,null);
  Insert into "students" ("id","name","lastName","enrollment","isActive","createdAt","updatedAt") values ('auth0|6646cd3c4d1c357206d9c385','Marlon','Mart\EDnez','a01424875',1,null,null);
  
  -- Inserciones en la tabla "announcements"
  Insert into "announcements" ("id","title","description","audience","multimedia","createdAt","updatedAt") values (53,'Para estudiantes','Anun','students','imagen.jpg',to_date('09-JUN-24','DD-MON-RR'),to_date('09-JUN-24','DD-MON-RR'));
  Insert into "announcements" ("id","title","description","audience","multimedia","createdAt","updatedAt") values (54,'Para todos','asad','all','iamgen.jpg',to_date('09-JUN-24','DD-MON-RR'),to_date('09-JUN-24','DD-MON-RR'));
  Insert into "announcements" ("id","title","description","audience","multimedia","createdAt","updatedAt") values (55,'Para jueces','dasda','judges','imagen.jpg',to_date('09-JUN-24','DD-MON-RR'),to_date('09-JUN-24','DD-MON-RR'));
  
  -- Inserciones en la tabla "announ_read_student"
  Insert into "announ_read_student" ("id_announce","id_student","createdAt","updatedAt") values (54,'auth0|66465772cddc69d8a11bcff9',to_date('10-JUN-24','DD-MON-RR'),to_date('10-JUN-24','DD-MON-RR'));
  Insert into "announ_read_student" ("id_announce","id_student","createdAt","updatedAt") values (53,'auth0|66465772cddc69d8a11bcff9',to_date('10-JUN-24','DD-MON-RR'),to_date('10-JUN-24','DD-MON-RR'));
  Insert into "announ_read_student" ("id_announce","id_student","createdAt","updatedAt") values (54,'auth0|6646cd3c4d1c357206d9c385',to_date('09-JUN-24','DD-MON-RR'),to_date('09-JUN-24','DD-MON-RR'));
  Insert into "announ_read_student" ("id_announce","id_student","createdAt
  
  ","updatedAt") values (53,'auth0|6646cd3c4d1c357206d9c385',to_date('09-JUN-24','DD-MON-RR'),to_date('09-JUN-24','DD-MON-RR'));
  
  -- Inserciones en la tabla "areas_persons"
  Insert into "areas_persons" ("id_person","id_area","createdAt","updatedAt") values ('auth0|66623f2d49e22d385f6c7954',1,to_date('09-JUN-24','DD-MON-RR'),to_date('09-JUN-24','DD-MON-RR'));
  Insert into "areas_persons" ("id_person","id_area","createdAt","updatedAt") values ('auth0|66623f2d49e22d385f6c7954',2,to_date('09-JUN-24','DD-MON-RR'),to_date('09-JUN-24','DD-MON-RR'));
  Insert into "areas_persons" ("id_person","id_area","createdAt","updatedAt") values ('auth0|6661f543de0e36db627a3b66',1,to_date('08-JUN-24','DD-MON-RR'),to_date('08-JUN-24','DD-MON-RR'));
  Insert into "areas_persons" ("id_person","id_area","createdAt","updatedAt") values ('auth0|6661f543de0e36db627a3b66',4,to_date('08-JUN-24','DD-MON-RR'),to_date('08-JUN-24','DD-MON-RR'));
  
  -- Inserciones en la tabla "criteria_judges"
  Insert into "criteria_judges" ("id_person","id_criteria","grade","id_project","id_admin","createdAt","updatedAt") values ('auth0|6653d38ae957844eac7c9f99',1,2,'CybCon1',null,to_date('09-JUN-24','DD-MON-RR'),to_date('09-JUN-24','DD-MON-RR'));
  Insert into "criteria_judges" ("id_person","id_criteria","grade","id_project","id_admin","createdAt","updatedAt") values ('auth0|6653d38ae957844eac7c9f99',2,3,'CybCon1',null,to_date('09-JUN-24','DD-MON-RR'),to_date('09-JUN-24','DD-MON-RR'));
  Insert into "criteria_judges" ("id_person","id_criteria","grade","id_project","id_admin","createdAt","updatedAt") values ('auth0|6653d38ae957844eac7c9f99',3,4,'CybCon1',null,to_date('09-JUN-24','DD-MON-RR'),to_date('09-JUN-24','DD-MON-RR'));
  Insert into "criteria_judges" ("id_person","id_criteria","grade","id_project","id_admin","createdAt","updatedAt") values ('auth0|6653d38ae957844eac7c9f99',4,1,'CybCon1',null,to_date('09-JUN-24','DD-MON-RR'),to_date('09-JUN-24','DD-MON-RR'));
  Insert into "criteria_judges" ("id_person","id_criteria","grade","id_project","id_admin","createdAt","updatedAt") values ('auth0|6653d38ae957844eac7c9f99',5,5,'CybCon1',null,to_date('09-JUN-24','DD-MON-RR'),to_date('09-JUN-24','DD-MON-RR'));
  Insert into "criteria_judges" ("id_person","id_criteria","grade","id_project","id_admin","createdAt","updatedAt") values ('auth0|6653d38ae957844eac7c9f99',1,3,'NanPro1',null,to_date('09-JUN-24','DD-MON-RR'),to_date('09-JUN-24','DD-MON-RR'));
  Insert into "criteria_judges" ("id_person","id_criteria","grade","id_project","id_admin","createdAt","updatedAt") values ('auth0|6653d38ae957844eac7c9f99',2,4,'NanPro1',null,to_date('09-JUN-24','DD-MON-RR'),to_date('09-JUN-24','DD-MON-RR'));
  Insert into "criteria_judges" ("id_person","id_criteria","grade","id_project","id_admin","createdAt","updatedAt") values ('auth0|6653d38ae957844eac7c9f99',3,3,'NanPro1',null,to_date('09-JUN-24','DD-MON-RR'),to_date('09-JUN-24','DD-MON-RR'));
  Insert into "criteria_judges" ("id_person","id_criteria","grade","id_project","id_admin","createdAt","updatedAt") values ('auth0|6653d38ae957844eac7c9f99',4,2,'NanPro1',null,to_date('09-JUN-24','DD-MON-RR'),to_date('09-JUN-24','DD-MON-RR'));
  Insert into "criteria_judges" ("id_person","id_criteria","grade","id_project","id_admin","createdAt","updatedAt") values ('auth0|6653d38ae957844eac7c9f99',5,4,'NanPro1',null,to_date('09-JUN-24','DD-MON-RR'),to_date('09-JUN-24','DD-MON-RR'));
  
  -- Inserciones en la tabla "judge_projects"
  Insert into "judge_projects" ("id_person","id_project","createdAt","updatedAt") values ('auth0|6653d38ae957844eac7c9f99','NanPro1',null,null);
  Insert into "judge_projects" ("id_person","id_project","createdAt","updatedAt") values ('auth0|6653d38ae957844eac7c9f99','CybCon1',null,null);
  Insert into "judge_projects" ("id_person","id_project","createdAt","updatedAt") values ('auth0|6661f543de0e36db627a3b66','NexPro1',null,null);
  Insert into "judge_projects" ("id_person","id_project","createdAt","updatedAt") values ('auth0|6661f543de0e36db627a3b66','CybCon1',null,null);
  Insert into "judge_projects" ("id_person","id_project","createdAt","updatedAt") values ('auth0|6661f543de0e36db627a3b66','NanPro1',null,null);
  
  -- Inserciones en la tabla "materials_projects"
  Insert into "materials_projects" ("id_project","id_material","amount","createdAt","updatedAt") values ('BioPro1',1,0,to_date('10-JUN-24','DD-MON-RR'),to_date('10-JUN-24','DD-MON-
  
  RR'));
  Insert into "materials_projects" ("id_project","id_material","amount","createdAt","updatedAt") values ('BioPro1',2,0,to_date('10-JUN-24','DD-MON-RR'),to_date('10-JUN-24','DD-MON-RR'));
  Insert into "materials_projects" ("id_project","id_material","amount","createdAt","updatedAt") values ('BioPro1',3,0,to_date('10-JUN-24','DD-MON-RR'),to_date('10-JUN-24','DD-MON-RR'));
  Insert into "materials_projects" ("id_project","id_material","amount","createdAt","updatedAt") values ('BioPro1',4,0,to_date('10-JUN-24','DD-MON-RR'),to_date('10-JUN-24','DD-MON-RR'));

  -- Inserciones en la tabla "projects"
  Insert into "projects" ("id","title","description","id_student","id_area","createdAt","updatedAt") values ('BioPro1','Fermentacion','Descripcion',null,null,null,null);
  Insert into "projects" ("id","title","description","id_student","id_area","createdAt","updatedAt") values ('BioPro2','Biodiesel','Descripcion',null,null,null,null);
  Insert into "projects" ("id","title","description","id_student","id_area","createdAt","updatedAt") values ('BioPro3','Quimica Biologica','Descripcion',null,null,null,null);
  Insert into "projects" ("id","title","description","id_student","id_area","createdAt","updatedAt") values ('BioPro4','Celulas Madre','Descripcion',null,null,null,null);
  Insert into "projects" ("id","title","description","id_student","id_area","createdAt","updatedAt") values ('CybCon1','Proyecto de Seguridad','Una descripci\F3n',null,null,null,null);
  Insert into "projects" ("id","title","description","id_student","id_area","createdAt","updatedAt") values ('CybCon2','Criptograf\EDa','La mejor descripci\F3n',null,null,null,null);
  Insert into "projects" ("id","title","description","id_student","id_area","createdAt","updatedAt") values ('CybCon3','Seguridad en Redes','Una descripci\F3n m\F3vil',null,null,null,null);
  Insert into "projects" ("id","title","description","id_student","id_area","createdAt","updatedAt") values ('CybCon4','Penetration Testing','Una descripci\F3n',null,null,null,null);
  Insert into "projects" ("id","title","description","id_student","id_area","createdAt","updatedAt") values ('NanPro1','Nanotecnologia en Medicina','Una descripci\F3n',null,null,null,null);
  Insert into "projects" ("id","title","description","id_student","id_area","createdAt","updatedAt") values ('NanPro2','Quimica de Materiales','Una descripci\F3n',null,null,null,null);
  Insert into "projects" ("id","title","description","id_student","id_area","createdAt","updatedAt") values ('NanPro3','Nanotecnolog\EDa en la Industria','Una descripci\F3n',null,null,null,null);
  Insert into "projects" ("id","title","description","id_student","id_area","createdAt","updatedAt") values ('NanPro4','Ingenier\EDa de Superficies','Una descripci\F3n',null,null,null,null);
  Insert into "projects" ("id","title","description","id_student","id_area","createdAt","updatedAt") values ('NexPro1','Energ\EDas Renovables','Una descripci\F3n',null,null,null,null);
  Insert into "projects" ("id","title","description","id_student","id_area","createdAt","updatedAt") values ('NexPro2','Ingenier\EDa Industrial','Una descripci\F3n',null,null,null,null);
  Insert into "projects" ("id","title","description","id_student","id_area","createdAt","updatedAt") values ('NexPro3','Desarrollo Sostenible','Una descripci\F3n',null,null,null,null);
  Insert into "projects" ("id","title","description","id_student","id_area","createdAt","updatedAt") values ('NexPro4','Ciudad Inteligente','Una descripci\F3n',null,null,null,null);
  
    -- Inserciones en la tabla teams
  INSERT INTO "teams" ("id","name","id_leader","id_project","createdAt","updatedAt") VALUES (44, 'Titulo para mi proyecto de prubas p', 'auth0|66465772cddc69d8a11bcff9', 'BioPro1', NULL, NULL);
  INSERT INTO "teams" ("id","name","id_leader","id_project","createdAt","updatedAt") VALUES (45, 'sfsdfbdsfb', 'auth0|66465772cddc69d8a11bcff9', 'NexPro2', NULL, NULL);
  INSERT INTO "teams" ("id","name","id_leader","id_project","createdAt","updatedAt") VALUES (2, 'Proyecto de prueba', 'auth0|6646cd3c4d1c357206d9c385', 'NanPro1', NULL, NULL);
  INSERT INTO "teams" ("id","name","id_leader","id_project","createdAt","updatedAt") VALUES (21, 'fsfa', 'auth0|6646cd3c4d1c357206d9c385', 'NexPro1', NULL, NULL);
  INSERT INTO "teams" ("id","name","id_leader","id_project","createdAt","updatedAt") VALUES (41, 'Test89', 'auth0|66548dc83a478dce1bb57afb', 'NanCon1', NULL, NULL);
  INSERT INTO "teams" ("id","name","id_leader","id_project","createdAt","updatedAt") VALUES (42, 'Titulo para mi proyecto de prubas Gerry', 'auth0|66465772cddc69d8a11bcff9', 'NanPro2', NULL, NULL);
  INSERT INTO "teams" ("id","name","id_leader","id_project","createdAt","updatedAt") VALUES (43, 'Robot automata para automatizar automatas', 'auth0|66465772cddc69d8a11bcff9', 'NexCon1', NULL, NULL);
  INSERT INTO "teams" ("id","name","id_leader","id_project","createdAt","updatedAt") VALUES (1, 'dsfomo\B4ghdsrg', 'auth0|6646cd3c4d1c357206d9c385', 'CybCon1', NULL, NULL);
  
  -- Inserciones en la tabla team_members
  INSERT INTO "team_members" ("id_team","id_member","createdAt","updatedAt") VALUES (21, 'auth0|66465772cddc69d8a11bcff9', NULL, NULL);
  INSERT INTO "team_members" ("id_team","id_member","createdAt","updatedAt") VALUES (44, 'auth0|66548dc83a478dce1bb57afb', NULL, NULL);
  INSERT INTO "team_members" ("id_team","id_member","createdAt","updatedAt") VALUES (45, 'auth0|66548dc83a478dce1bb57afb', NULL, NULL);
  INSERT INTO "team_members" ("id_team","id_member","createdAt","updatedAt") VALUES (1, 'auth0|66539b1ce539b35aea94e74d', NULL, NULL);
  INSERT INTO "team_members" ("id_team","id_member","createdAt","updatedAt") VALUES (2, 'auth0|6661ecf585be50d179fe1889', NULL, NULL);
  INSERT INTO "team_members" ("id_team","id_member","createdAt","updatedAt") VALUES (2, 'auth0|6661f40dde0e36db627a39d7', NULL, NULL);
  INSERT INTO "team_members" ("id_team","id_member","createdAt","updatedAt") VALUES (41, 'auth0|66539b1ce539b35aea94e74d', NULL, NULL);
  INSERT INTO "team_members" ("id_team","id_member","createdAt","updatedAt") VALUES (42, 'auth0|66548dc83a478dce1bb57afb', NULL, NULL);
  INSERT INTO "team_members" ("id_team","id_member","createdAt","updatedAt") VALUES (43, 'auth0|6661f40dde0e36db627a39d7', NULL, NULL);
  
  
  -- Inserciones en la tabla "projects_evaluations"
  Insert into "projects_evaluations" ("id_project","id_admin","grade","createdAt","updatedAt") values ('CybCon1',null,10,to_date('09-JUN-24','DD-MON-RR'),to_date('09-JUN-24','DD-MON-RR'));
  Insert into "projects_evaluations" ("id_project","id_admin","grade","createdAt","updatedAt") values ('CybCon1',null,7,to_date('09-JUN-24','DD-MON-RR'),to_date('09-JUN-24','DD-MON-RR'));
  Insert into "projects_evaluations" ("id_project","id_admin","grade","createdAt","updatedAt") values ('CybCon1',null,9,to_date('09-JUN-24','DD-MON-RR'),to_date('09-JUN-24','DD-MON-RR'));
  Insert into "projects_evaluations" ("id_project","id_admin","grade","createdAt","updatedAt") values ('NanPro1',null,10,to_date('09-JUN-24','DD-MON-RR'),to_date('09-JUN-24','DD-MON-RR'));
  Insert into "projects_evaluations" ("id_project","id_admin","grade","createdAt","updatedAt") values ('NanPro1',null,9,to_date('09-JUN-24','DD-MON-RR'),to_date('09-JUN-24','DD-MON-RR'));
  Insert into "projects_evaluations" ("id_project","id_admin","grade","createdAt","updatedAt") values ('NanPro1',null,8,to_date('09-JUN-24','DD-MON-RR'),to_date('09-JUN-24','DD-MON-RR'));
  