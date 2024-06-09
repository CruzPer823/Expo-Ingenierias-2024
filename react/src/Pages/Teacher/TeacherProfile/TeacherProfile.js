import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import Menu from '../../../Components/Togglebar/togglebar.js';
import React, { useState,useEffect,useRef} from "react";
import { Link} from 'react-router-dom';
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


import { Modal, Button } from 'react-bootstrap';

function SimpleModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [areas,setArea] = useState([{}]);
    const {user} = useAuth0();
    const [secAreas, setSecAreas] = useState([]); // Cambiado a un array para manejar múltiples selecciones
    const [areaperson, setAreaPerson] = useState([]);
    const [validated, setValidated] = useState(false);
    useEffect(() => {
      if (user && user.sub) {
          async function fetchData() {
              try {
                  fetch(`http://localhost:8000/areas/allareas`)
                  .then(res => res.json())
                  .then((data)=>{setArea(data)})
              } catch (error) {
                  console.error('Error fetching data:', error);
              }
          }

          fetchData();
      }
  }, [user]);// Dependencias del useEffect

  const handleToggleChange = (selectedId) => {
    // Verifica si el ID ya está en el array
    const index = secAreas.indexOf(selectedId);

    if (index === -1) {
        // Si el ID no está en el array, agrégalo
        setSecAreas([...secAreas, selectedId]);
    } else {
        // Si el ID ya está en el array, quítalo
        const updatedAreas = secAreas.filter(id => id !== selectedId);
        setSecAreas(updatedAreas);
    }
};

    const handleSubmit = async (event) => {
      if (event) {
          event.preventDefault();
      }
  
      const form = event ? event.target : null;
      if (form && form.checkValidity() === false) {
          if (event) {
              event.preventDefault();
              event.stopPropagation();
          }
      } else {
          try {
              const id_person = user.sub; // Asegúrate de que este valor es correcto
              const promises = secAreas.map(async (id_area) => {
                  id_area = parseInt(id_area, 10); // Convertir id_area a número si es necesario
                  await axios.post(`http://localhost:8000/areaperson/register`, { id_person, id_area });
              });
              await Promise.all(promises);
              // Maneja el éxito si es necesario
          } catch (error) {
              console.error('Full error object:', error);
              const errorMessage = error.response ? error.response.data.message : error.message || 'Error desconocido';
              throw new Error(`An error has occurred: ${errorMessage}`);
          }
      }
      setValidated(true);
  };
  

    return (
        <>
            <Button variant="primary" className="custom-btn-edit" onClick={handleShow}>
                Agregar áreas
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Areas</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className='row p-2'>
                  <div className='col-md-12'>
                    <center>
                    <h4>Escoja las area en las que se sienta con más conocimientos</h4>
                    </center>
                  </div>
                </div>
                <Form noValidate validated={validated} className='row p-1' onSubmit={handleSubmit}>
                  <Row className="mb-1 w-100">
                    <Form.Group as={Col} md="12" controlId="validationArea">
                      <div className='container-fluid'>
                          <ToggleButtonGroup
                            type="checkbox"
                            value={secAreas}
                            className='d-flex justify-content-between w-100'
                        >
                            {areas.map(area => (
                                <>
                            <Form.Check
                            type="checkbox"
                            checked={secAreas.includes(area.id)}
                            onChange={() => handleToggleChange(area.id)}
                            inline
                            label={area.name}
                            className='ButtonAreas w-100'
                            
                        />
                            </>
                            ))}
                        </ToggleButtonGroup>
                      </div>
                    </Form.Group>
                  </Row>                
                <Modal.Body className='centered-container h-100 d-flex justify-content-evenly'>
                    <Button variant="secondary" className='ButtonContinue' onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" type="submit" disabled={secAreas.length === 0} className='fw-bold ' onClick={handleClose}>
                        Guardar
                    </Button>
                </Modal.Body>
                </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

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
    });
    const [areaperson, setAreaPerson] = useState({
      id_person:"",
      areas:[]
});
    const [isEmpty, setIsEmpty] = useState(false);
    const {user} = useAuth0();
    const navigate = useNavigate();
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);    
    useEffect(() => {
      if (user && user.sub) {
          async function fetchData() {
              try {
                  const [userResponse, areaperResponse] = await Promise.all([
                      fetch(`http://localhost:8000/person/resume/${user.sub}`).then(res => res.json()),
                      fetch(`http://localhost:8000/areaperson/getArea/${user.sub}`).then(res => res.json().catch(error => {
                          if (error.response && error.response.status === 404 && error.response.data.error === 'No area found for this person') {
                            return { id_person: user.sub, areas: [] };
                          }
                          throw error;
                      }))
                  ]);
                    setAreaPerson(areaperResponse);
                    setUser(userResponse);
              } catch (error) {
                  console.error('Error fetching data:', error);
              }
          }

          fetchData();
      }

      const handleResize = () => {
        setIsLargeScreen(window.innerWidth > 768);
      };
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, [user]);// Dependencias del useEffect
  useEffect(() => {
    if (areaperson && areaperson.areas && areaperson.areas.length === 0) {
        setIsEmpty(true);
    }
}, [areaperson]);
useEffect(() => {
    if (areaperson && areaperson.areas && areaperson.areas.length != 0) {
        setIsEmpty(false);
    }
}, [areaperson]);
  console.log(areaperson);
  console.log(isEmpty);
  
        return (
            <>
              <Menu />
              <div className='container-fluid perfil cont-principal-profile-profe mx-auto mt-4 pt-3'>
                <div className='row p-2'>
                  <i className="bi bi-person-circle icon-p"></i>
                </div>
                <div className='row p-2'>
                  <div className='col-md-12 QuitarH textSizeForProfile'>
                    <h1>Perfil</h1>
                  </div>
                </div>
                <Datos name={`${user_b.name} ${user_b.lastName}`} type={"Profesor"} email={user.email} />
                {!isEmpty && (
                    <div className='row p-2'>
                    <div className='col-6 col-md-6'>
                    <h3>Área: </h3>
                    </div>
                    <div className='col-6 col-md-6 mb-4'>
                    {areaperson.areas.map((item, index) => (
                    <span key={index}>{item+', '}</span>
                      ))}
                  </div>
              </div>
          )}
           {isEmpty && (
                  <div className='row p-2'>
                  <div className='col-6 col-md-6'>
                  <h3>Área: </h3>
                  </div>
                  <div className='col-6 col-md-6 mb-4'>
                  <span>Registrar en que areas podrías ser juez de proyectos</span>
                </div>
            </div>

           )}

            {isLargeScreen ? (
                <>
                    <div className='row p-2'>
                        <div className='col-12 col-md-6 mb-4 d-flex justify-content-end'>
                        <Link to='/editar-perfil-profesor' className='custom-btn-edit'>Editar Perfil</Link>
                        </div>
                        <div className='col-12 col-md-6 mb-4 d-flex justify-content-start'>
                            <SimpleModal />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className='row p-1'>
                        <div className='col-12 d-flex justify-content-center'>
                            <Link to='/editar-perfil-profesor' className='custom-btn-edit'>Editar Perfil</Link>
                        </div>
                    </div>
                    <div className='row p-1'>
                        <div className='col-12 mb-2 d-flex justify-content-center'>
                            <SimpleModal />
                        </div>
                    </div>
                </>
            )}

              </div>
            </>
          );
        }