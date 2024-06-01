import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import Menu from '../../../Components/Togglebar/togglebar.js';
import React, { useState,useEffect,useRef} from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import './TeacherProfile.css';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Usure from '../../../Components/BotonConfirmacion/ConfBot';





function Datos({name,email,type,id}){

    return(
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
                <h3>Usuario: </h3>
                </div>
                <div className='col-6 col-md-6 mb-4'>
                    <span>{type}</span>
                </div>
            </div>
            </>
    );
}
export default function Perfil(){
    const [user_b, setUser] = useState({
        id: "",
        name: "",
        lastName: "",
        email: "",
    })
    const [areas,setArea] = useState([{}]);
    const [secArea, setSecArea] = useState(1);
    const [areaperson, setAreaPerson] = useState([]);
    const {user} = useAuth0();
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
      if (user && user.sub) {
          async function fetchData() {
              try {
                  const [userResponse, areasResponse, areaperResponse] = await Promise.all([
                      fetch(`http://localhost:8000/person/resume/${user.sub}`).then(res => res.json()),
                      fetch(`http://localhost:8000/areas/allareas`).then(res => res.json()),
                      fetch(`http://localhost:8000/areaperson/getArea/${user.sub}`).then(res => res.json().catch(error => {
                          if (error.response && error.response.status === 404 && error.response.data.error === 'No area found for this person') {
                              return null;
                          }
                          throw error;
                      }))
                  ]);
                  setUser(userResponse);
                  setArea(areasResponse);
                  setAreaPerson(areaperResponse);
              } catch (error) {
                  console.error('Error fetching data:', error);
              }
          }

          fetchData();
      }
  }, [user]);// Dependencias del useEffect
      //console.log(areaperson);
      const id_person = user.sub;
      const id_area = secArea;
      const handleSubmit = async (event) => {
        if (event) {
            event.preventDefault();
        }
  
        const form = event ? event.target : null;
        if (form && form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            try {
                await axios.post(`http://localhost:8000/areaperson/register`, {    
                    id_person,
                    id_area
                });
                navigate('/principal-profesor');
            } catch (error) {
                console.error('Full error object:', error);
                const errorMessage = error.response ? error.response.data.message : error.message || 'Error desconocido';
                throw new Error(`An error has occurred: ${errorMessage}`);
            }
            
        }
        setValidated(true);
    };
    const tieneInformacion = (areaperson) => {
      return areaperson && areaperson.area_name;
  };
  
        return (
            <>
              <Menu />
              <div className='container-fluid m-5 perfil cont-principal mx-auto'>
                <div className='row p-2'>
                  <i className="bi bi-person-circle icon-p"></i>
                </div>
                <div className='row p-2'>
                  <div className='col-md-12'>
                    <h1>Perfil</h1>
                  </div>
                </div>
                <Datos name={`${user_b.name} ${user_b.lastName}`} type={"Profesor"} email={user.email} />
                {tieneInformacion(areaperson) && (
                <div className='row p-2'>
                <div className='col-6 col-md-6'>
                <h3>Area: </h3>
                </div>
                <div className='col-6 col-md-6 mb-4'>
                    <span>{areaperson.area_name}</span>
                </div>
                </div>)}
                {!tieneInformacion(areaperson) && (
                  <>
                <div className='row p-2'>
                  <div className='col-md-12'>
                    <center>
                    <h4>Escoja la area en la que se sienta con más conocimientos</h4>
                    </center>
                  </div>
                </div>
                <Form noValidate validated={validated} className='row p-2' onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="validationArea">
                      <div className='container-fluid'>
                        <div className='row'>
                          <div className='col'>
                            <ToggleButtonGroup type="radio" name="options" defaultValue={1} className='d-flex justify-content-between w-100'>
                              {areas.map(area => (
                                <ToggleButton 
                                  key={area.id} // Añadir una clave única para cada elemento
                                  id={"tbg-radio" + area.id} 
                                  value={area.id} 
                                  onChange={(e) => setSecArea(e.currentTarget.value)} // Asegurarse de usar el valor correcto del evento
                                  className='ButtonMaterials w-100'
                                >
                                  {area.name}
                                </ToggleButton>
                              ))}
                            </ToggleButtonGroup>
                          </div>
                        </div>
                      </div>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                  <Form.Group as={Col} md="12" controlId="validationArea">
                    <center>
                  <Usure Path={'/principal-profesor'} className={"custom-btn"} Texto={"Guardar"}
                              MensajeTitle={'¿Estás seguro que quieres confirmar la selección de area?'}
                              BotonA={'Cancelar'}
                              BotonB={'Aceptar'}
                              onConfirm={handleSubmit} />
                              </center>
                      </Form.Group>
                  </Row>
                </Form>
                </>
                )}
              </div>
            </>
          );
        }
