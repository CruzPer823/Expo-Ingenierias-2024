import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import Placeholder from 'react-bootstrap/Placeholder';

import Menu from '../../../Components/TogglebarStudent/togglebarStudent.js';
import './StudentProfile.css';
import { Link} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { useAuth0 } from '@auth0/auth0-react';

const URL = 'https://140.84.165.119/api/students/'

function Datos({name,email,type,id,IsLoaded}){

    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

    useEffect(() => {
      const handleResize = () => {
        setIsLargeScreen(window.innerWidth > 768);
      };
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return(
        <>
            {IsLoaded && (
                <>
                    {isLargeScreen ? (
                        <>
                            <div className='row p-2'>
                                <div className='col-md-6'>
                                <h3>Nombre: </h3>
                                </div>
                                <div className='col-md-6'>
                                    <span className='text-break'>{name}</span>
                                </div>
                            </div>
                            <div className='row p-2'>
                                <div className='col-md-6'>
                                <h3>Correo: </h3>
                                </div>
                                <div className='col-md-6'>
                                    <span className='text-break'>{email}</span>
                                </div>
                            </div>
                            <div className='row p-2'>
                                <div className='col-md-6'>
                                <h3>Matricula: </h3>
                                </div>
                                <div className='col-md-6'>
                                    <span>{id}</span>
                                </div>
                            </div>
                            <div className='row p-2'>
                                <div className='col-md-6'>
                                <h3>Usuario: </h3>
                                </div>
                                <div className='col-md-6 mb-4'>
                                    <span>{type}</span>
                                </div>
                            </div>
                            <div className='row p-2'>
                            <div className='col-12 col-md-12 mb-4 d-flex justify-content-center'>
                                <Link to='/editar-perfil-estudiante' className='custom-btn-edit'>Editar Perfil</Link>
                            </div>
                        </div>

                        </>
                    ) : (
                        <>
                            <div className='row p-2'>
                                <div className='container-fluid'>
                                    <div className='row'>
                                        <div className='col'>
                                            <h3>Nombre: </h3>
                                        </div>
                                        
                                    </div>
                                    <div className='row'>
                                        <div className='col'>
                                            <span className='text-break'>{name}</span>
                                        </div>
                                    </div>                                    
                                </div>
                            </div>
                            <div className='row p-2'>
                                <div className='container-fluid'>
                                    <div className='row'>
                                        <div className='col'>
                                            <h3>Correo: </h3>
                                        </div>
                                        
                                    </div>
                                    <div className='row'>
                                        <div className='col'>
                                            <span className='text-break'>{email}</span>
                                        </div>
                                    </div>                                    
                                </div>
                            </div>
                            <div className='row p-2'>
                                <div className='container-fluid'>
                                    <div className='row'>
                                        <div className='col'>
                                            <h3>Matricula: </h3>
                                        </div>
                                        
                                    </div>
                                    <div className='row'>
                                        <div className='col'>
                                            <span className='text-break'>{id}</span>
                                        </div>
                                    </div>                                    
                                </div>
                            </div>
                            <div className='row p-2'>
                                <div className='container-fluid'>
                                    <div className='row'>
                                        <div className='col'>
                                            <h3>Usuario: </h3>
                                        </div>
                                        
                                    </div>
                                    <div className='row'>
                                        <div className='col'>
                                            <span className='text-break'>{type}</span>
                                        </div>
                                    </div>                                    
                                </div>
                            </div>
                            
                        </>
                    )}
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
        <div className='container-fluid perfil cont-principal-perfil-estudiante mx-auto mt-4 pt-3'>
            <div className='row p-2'>
                <i className="bi bi-person-circle icon-p"></i>
            </div>
            <div className='row p-2 '>
                <div className='col-md-12 QuitarH'>
                    <h1>Perfil</h1>
                </div>
            </div>
            <Datos IsLoaded={IsLoaded} name={student.name + " " + student.lastName} type={"Estudiante"} id={student.enrollment}  email={student.enrollment + "@tec.mx"}/>
            
        </div>
        </>
    );
}