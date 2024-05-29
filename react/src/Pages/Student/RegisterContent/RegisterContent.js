


import './RegisterContent.css';
import { Link } from 'react-router-dom';

export default function UserRegisterCont(){

    return (
        <div className='container w-75 mt-5 mb-2 ContainersForm'>
            <h1 className='Titulo1 text-center'>Selecciona el tipo de cuenta a crear</h1>
            <div className='row p-2'>
                <div className='col p-4 d-flex justify-content-center'>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col d-flex justify-content-center'>
                                <Link to={'/studentregister'} className ="TextoValid3 text-center">Registrar estudiante</Link>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col d-flex justify-content-center'>
                                <p className='text-center p-3'>Participantes de Expo-Ingenierías: Accede al formulario de registro para inscribir tu proyecto y continuar con el proceso de participación en el evento.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col p-4 d-flex justify-content-center'>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col d-flex justify-content-center'>
                                <Link to={'/userregister'} className ="TextoValid3 text-center">Registrar profesor</Link>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col d-flex justify-content-center'>
                                <p className='text-center p-3'>Profesores y jueces: Regístrate aquí para aprobar proyectos y desempeñar tu papel como evaluador en Expo-Ingenierías. ¡Tu contribución es esencial para el éxito del evento!</p>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
        </div>
    );
}