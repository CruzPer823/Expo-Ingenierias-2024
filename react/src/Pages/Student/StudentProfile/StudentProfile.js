import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import Placeholder from 'react-bootstrap/Placeholder';

import Menu from '../../../Components/TogglebarStudent/togglebarStudent.js';
import './StudentProfile.css';

import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { useAuth0 } from '@auth0/auth0-react';

const URL = 'http://localhost:8000/students/'

function Datos({name,email,type,id,IsLoaded}){
    return(
        <>
            {IsLoaded && (
                <>
                    <div className='row p-2'>
                        <div className='col-6 col-md-6'>
                        <h3>Nombre: </h3>
                        </div>
                        <div className='col-6 col-md-6'>
                            <span className='text-break'>{name}</span>
                        </div>
                    </div>
                    <div className='row p-2'>
                        <div className='col-6 col-md-6'>
                        <h3>Correo: </h3>
                        </div>
                        <div className='col-6 col-md-6'>
                            <span className='text-break'>{email}</span>
                        </div>
                    </div>
                    <div className='row p-2'>
                        <div className='col-6 col-md-6'>
                        <h3>Matricula: </h3>
                        </div>
                        <div className='col-6 col-md-6'>
                            <span>{id}</span>
                        </div>
                    </div>
                    <div className='row p-2'>
                        <div className='col-6 col-md-6'>
                        <h3>Usuario: </h3>
                        </div>
                        <div className='col-6 col-md-6 mb-4'>
                            <span>{type}</span>
                        </div>
                    </div>
                </>
            )}

            {!IsLoaded && (
                <>
                    <div className='row p-2'>
                        <div className='col-6 col-md-6'>
                        <h3>Nombre: </h3>
                        </div>
                        <div className='col-6 col-md-6'>
                            <Placeholder animation="glow" className="w-100">
                                <Placeholder xs={7} size="lg" />
                            </Placeholder>
                        </div>
                    </div>
                    <div className='row p-2'>
                        <div className='col-6 col-md-6'>
                        <h3>Correo: </h3>
                        </div>
                        <div className='col-6 col-md-6'>
                        <Placeholder animation="glow" className="w-100">
                                <Placeholder xs={5} size="lg" />
                            </Placeholder>
                        </div>
                    </div>
                    <div className='row p-2'>
                        <div className='col-6 col-md-6'>
                        <h3>Matricula: </h3>
                        </div>
                        <div className='col-6 col-md-6'>
                            <Placeholder animation="glow" className="w-100">
                                <Placeholder xs={4} size="lg" />
                            </Placeholder>
                        </div>
                    </div>
                    <div className='row p-2'>
                        <div className='col-6 col-md-6'>
                        <h3>Usuario: </h3>
                        </div>
                        <div className='col-6 col-md-6 mb-4'>
                            <Placeholder animation="glow" className="w-100">
                                <Placeholder xs={3} size="lg" />
                            </Placeholder>
                        </div>
                    </div>
                </>
            )}

        </>
    );
}
export default function Perfil(){
    const [IsLoaded, setIsLoaded] = useState(false);

    const { isAuthenticated, isLoading, error, user } = useAuth0();

    const [student, setStudent] = useState({
        id_student: 0,
        name: "",
        lastName: "",
        enrollment: "",
      });

      const { id_student } = useParams();
    
    
    
      useEffect(() => {
        //fetch(URL+id_student)
        fetch(URL+ user.sub)
          .then((res) => res.json())
          .then((data) => {
            setStudent(data);
            setIsLoaded(true); // Cambiamos IsLoaded a true cuando los datos están cargados
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            setIsLoaded(true); // En caso de error, también cambiamos IsLoaded a true para evitar bucles infinitos de carga
          });
      }, [id_student]);
    
      


    return(
        <>
        <Menu NameSection={"Perfil de usuario"} />
        <div className='container-fluid m-5 perfil cont-principal mx-auto'>
            <div className='row p-2'>
                <i className="bi bi-person-circle icon-p"></i>
            </div>
            <div className='row p-2 '>
                <div className='col-md-12'>
                    <h1>Perfil</h1>
                </div>
            </div>
            <Datos IsLoaded={IsLoaded} name={student.name + " " + student.lastName} type={"Estudiante"} id={student.enrollment}  email={student.enrollment + "@tec.mx"}/>
            
        </div>
        </>
    );
}