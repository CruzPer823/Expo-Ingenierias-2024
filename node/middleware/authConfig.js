
import axios from "axios"

import config from '../config.js';
import {StudentModel} from "../models/Relations.js"



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

    var matricula = email.slice(0,-7)

    var studentNew = {id: user_id, name: firstName, lastName: lastName1, enrollment: matricula}

    console.log(studentNew)

    //const student = await StudentModel.create(studentNew);

    const student = await StudentModel.findOrCreate({
      where: { id: studentNew.id }, // Supone que 'email' debe ser único
      defaults: studentNew // los datos que serán insertados si no se encuentra el registro
    })
    .then(([user, created]) => {
      if (created) {
        console.log('Registro creado exitosamente', user);
      } else {
        console.log('El registro ya existía y no fue creado de nuevo');
      }
    })
    .catch(error => {
      console.log('Error en la operación', error);
    });
    
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

