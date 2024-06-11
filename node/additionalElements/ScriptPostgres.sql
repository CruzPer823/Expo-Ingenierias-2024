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


