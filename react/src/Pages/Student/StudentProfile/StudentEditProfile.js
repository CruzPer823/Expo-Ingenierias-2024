import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import Menu from '../../../Components/Togglebar/togglebar.js';
import React, { useState,useEffect,useRef} from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import './StudentEditProfile.js';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { Button } from 'react-bootstrap';

export default function Perfil(){
    const [user_b, setUser] = useState({
        id: "",
        name: "",
        lastName: "",
        email: "",
    });
    const [areas,setArea] = useState([{}]);
    const [secAreas, setSecAreas] = useState([]);
    const [areaperson, setAreaPerson] = useState([]);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const {user} = useAuth0();
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (user && user.sub) {
            async function fetchData() {
                try {
                    const userResponse = await fetch(`http://localhost:8000/students/${user.sub}`).then(res => res.json());
                    setUser(userResponse);
                    setNombre(userResponse.name);  // Inicializa el estado del nombre
                    setApellido(userResponse.lastName);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
    
            fetchData();
        }
    }, [user]); // Dependencias del useEffect
    
      //console.log(areaperson);
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
              const id_person = user.sub;
              await axios.put(`http://localhost:8000/students/update/${id_person}`, {
                  name: nombre,
                  lastName: apellido,
              });
              navigate('/student-profile/');
            } catch (error) {
                console.error('Full error object:', error);
                const errorMessage = error.response ? error.response.data.message : error.message || 'Error desconocido';
                throw new Error(`An error has occurred: ${errorMessage}`);
            }
        }
        setValidated(true);
    };
    
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
                <Form noValidate validated={validated} className='row p-2' onSubmit={handleSubmit}>
                <div className='row p-2'>
                <div className='col-6 col-md-6'>
                <h3>Nombre: </h3>
                </div>
                <div className='col-6 col-md-6'>
                    <Form.Control as="textarea" rows="1"  value={nombre} className='text-break' onChange={(e) => setNombre(e.target.value)}/>
                </div>
            </div>
            <div className='row p-2'>
                <div className='col-6 col-md-6'>
                <h3>Apellido: </h3>
                </div>
                <div className='col-6 col-md-6'>
                    <Form.Control as="textarea" rows="1"  value={apellido} className='text-break' onChange={(e) => setApellido(e.target.value)}/>
                </div>
            </div>
            <div className='row p-2'>
                <div className='col-6 col-md-6'>
                <h3>Correo: </h3>
                </div>
                <div className='col-6 col-md-6'>
                    <span className='text-break'>{user.email}</span>
                </div>
            </div>
                  <Row className="mb-3">
                    <center>
                    <Button type="submit" className='custom-btn-edit'>Guardar</Button>
                    </center>
                  </Row>
                  </Form>
              </div>
            </>
          );
        }
