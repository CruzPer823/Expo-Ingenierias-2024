import axios from "axios";
import config from '../config.js';
import db from "../database/db.js"
import { StudentModel, PersonModel, TeamMemberModel, CommentModel, AsessorProjectModel, ProjectModel, CriteriaJudgeModel, JudgeProjectModel } from "../models/Relations.js"; // Asegúrate de importar PersonModel

async function getAuth0Token() {
  console.log(config.AUTH0_CLIENT_ID + " "+  config.AUTH0_DOMAIN + " " +config.AUTH0_CLIENT_SECRET)
  const url = `https://${config.AUTH0_DOMAIN}/oauth/token`;
  const data = {
    grant_type: 'client_credentials',
    client_id: config.AUTH0_CLIENT_ID,
    client_secret: config.AUTH0_CLIENT_SECRET,
    audience: `https://${config.AUTH0_DOMAIN}/api/v2/`
  };
  try {
    const response = await axios.post(url, data);
    return response.data.access_token;
  } catch (error) {
    console.error('Error obtaining Auth0 token:', error);
    return null;
  }
}

async function fetchAuth0Users(token) {
  const fields = 'email,user_id,user_metadata';
  const url = `https://${config.AUTH0_DOMAIN}/api/v2/users?fields=${fields}&include_fields=true`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users from Auth0:', error);
    return [];
  }
}

async function saveUsersToDatabase(users) {
  
  
  for (const user of users) {
    const { email, user_id } = user;
    const firstName = user.user_metadata ? user.user_metadata.firstName : '';
    const lastName1 = user.user_metadata ? user.user_metadata.lastName : '';

    const username = email.split('@')[0];
    const isStudent = /^[aA]\d{8}$/.test(username);

    if (isStudent) {
      const matricula = username;
      const studentNew = { id: user_id, name: firstName, lastName: lastName1, enrollment: matricula, isActive: 1 };

      const [foundUser, created] = await StudentModel.findOrCreate({
        where: { enrollment: studentNew.enrollment },
        defaults: studentNew,
      });

      if (created) {
        console.log('Registro creado exitosamente', foundUser);
      } else {
        console.log('El registro ya existía y no fue creado de nuevo');
        if (foundUser.id !== studentNew.id) {
          // Actualizar la tabla intermedia primero

          console.log('Actualizar team_members' + foundUser.id + ' ' + studentNew.id)


          await StudentModel.create({
            id: studentNew.id,
            name: foundUser.name,
            lastName: foundUser.lastName,
            enrollment: foundUser.enrollment,
            isActive: foundUser.isActive
          });
    

          await TeamMemberModel.update(
            { id_member: studentNew.id },
            { where: { id_member: foundUser.id } }
          );

          console.log("Se actualizo el equipo")

          await StudentModel.destroy({ where: { id: foundUser.id } });
          
          foundUser.id = studentNew.id;
          console.log('Clave primaria actualizada exitosamente', foundUser);
        }
      }
    }
    
    else {
      const personNew = { id: user_id, name: firstName, lastName: lastName1, email, isJudge: 0, ISACTIVE: 1};

      console.log(personNew);



      const [foundUser, created] = await PersonModel.findOrCreate({
        where: { email: personNew.email },
        defaults: personNew
      })
        if (created) {
          console.log('Registro creado exitosamente', foundUser);
        } else {
          if(foundUser.id !== personNew.id)
          {
            await PersonModel.create({
              id: personNew.id,
              name: foundUser.name,
              lastName: foundUser.lastName,
              email: foundUser.email,
              isJudge: foundUser.isJudge,
              ISACTIVE: foundUser.ISACTIVE,
            });

            await CommentModel.update(
              {id_person: personNew.id},
              {where: {id_person: foundUser.id}}
            );

            await AsessorProjectModel.update(
              {id_person: personNew.id},
              {where: {id_person: foundUser.id}}
            )

            await ProjectModel.update(
              {id_responsable: personNew.id},
              {where: {id_responsable: foundUser.id}}
            )

            await CriteriaJudgeModel.update(
              {id_person: personNew.id},
              {where: {id_person: foundUser.id}}
            )

            
            await JudgeProjectModel.update(
              {id_person: personNew.id},
              {where: {id_person: foundUser.id}}
            )

            await PersonModel.destroy({where: {id: foundUser.id}});

            foundUser.id = personNew.id;
            console.log('Clave primaria actualizada exitosamente', foundUser);
      
          }
        }
      
    }
  }
}

export default async function main() {
  const token = await getAuth0Token();
  if (!token) return;
  const users = await fetchAuth0Users(token);
  if (users.length > 0) {
    await saveUsersToDatabase(users);
  } else {
    console.log('No new users to process.');
  }
}
