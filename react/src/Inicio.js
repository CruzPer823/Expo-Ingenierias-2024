import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import ProfPict from './img/descargar.jpeg'
import logo from './img/logo.svg';
import logo2 from './img/logo2.svg';

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import Row from 'react-bootstrap/Row';

import Offcanvas from 'react-bootstrap/Offcanvas';

import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

import './ProjectResumenContent.js';

import './Page.css';
import './Resume.css';

function AreaButtons(){
  return(

    <ToggleButtonGroup type="radio" name="options" defaultValue={1} className='d-flex justify-content-between w-100'>
      <ToggleButton id="tbg-radio-1" value={1} className='w-100'>
        Área 1
      </ToggleButton>
      <ToggleButton id="tbg-radio-2" value={2} className='w-100'>
        Área 2
      </ToggleButton>
      <ToggleButton id="tbg-radio-3" value={3} className='w-100'>
        Área 3
      </ToggleButton>
    </ToggleButtonGroup>

  );
}

function CategoryButtons(){
  return(

    <ToggleButtonGroup type="radio" name="options1" defaultValue={1} className='d-flex justify-content-between w-100'>
      <ToggleButton id="tbg-radio-1.1" value={1} className='w-100'>
        Categoria 1
      </ToggleButton>
      <ToggleButton id="tbg-radio-1.2" value={2} className='w-100'>
        Categoria 2
      </ToggleButton>
      <ToggleButton id="tbg-radio-1.3" value={3} className='w-100'>
        Categoria 3
      </ToggleButton>
    </ToggleButtonGroup>

  );
}

function FormExample() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3  ">
        <Form.Group as={Col} md="12" controlId="validationTitle" >
          <Form.Label className='Titulo'>Nombre del proyecto</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Ingresa un titulo"
            maxLength={100}
            className='InputFormat'
          />
          <Form.Control.Feedback type='invalid'>No has ingresado un nombre para el proyecto</Form.Control.Feedback>
        </Form.Group>
      </Row>


      <Row className="mb-3  ">
        <Form.Group as={Col} md="12" controlId="validationMembers">
          <Form.Label className='Titulo'>Integrantes</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Integrantes"
            className='InputFormat'
          />
          <Form.Control.Feedback type='invalid'>No hay integrantes</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3  ">
        <Form.Group as={Col} md="12" controlId="validationArea">
          <div className='cotainer-fluid'>
            <div className='row'>
              <div className='col'>
                <Form.Label className='Titulo'>Área</Form.Label>
              </div>
            </div>

            <div className='row'>
              <div className='col'>
                <AreaButtons/>
              </div>
            </div>
          </div>
        </Form.Group>
      </Row>


      <Row className="mb-3  ">
        <Form.Group as={Col} md="12" controlId="validationCustom03">
          <div className='cotainer-fluid'>
            <div className='row'>
              <div className='col'>
                <Form.Label className='Titulo'>Categoría</Form.Label>
              </div>
            </div>

            <div className='row'>
              <div className='col'>
                <CategoryButtons/>
              </div>
            </div>
          </div>
        </Form.Group>
      </Row>

      <Row className="mb-3  ">
        <Form.Group as={Col} md="12" controlId="validationCustom04">
          <Form.Label className='Titulo'>Profesor(es) asesor</Form.Label>
          <Form.Control type="text" placeholder="State" required className='InputFormat' />
          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3  ">
        <Form.Group as={Col} md="12" controlId="validationCustom05">
          <Form.Label className='Titulo'>Póster (PDF)</Form.Label>
          <Form.Control type="text" placeholder="Zip" required className='InputFormat' />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>


      <Row className="mb-3  ">

        <Form.Group as={Col} md="12" controlId="validationCustom06">
          <Form.Label className='Titulo'>Link video</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            defaultValue="Mark"
            className='InputFormat'
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3  ">
        <Form.Group as={Col} md="12" controlId="validationCustom07">
          <Form.Label className='Titulo'>Necesitas algún extra para tu proyecto?</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            defaultValue="Otto"
            className='InputFormat'
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

      </Row>
      <center><Button type="submit" className='mt-4'>Registrar proyecto</Button></center>
    </Form>
  );
}

function Algo(){
  return (
    <div className='container w-50 mt-3 mb-3 bg-white'>
      <div className='row p-2'>
        <div className='col p-4 '>
          <FormExample />
        </div>
      </div>
    </div>
  );
}




function ToggleBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className = "ToggleButton">
        <img className="ExpoIngLog" src ={logo} alt="" onClick={handleShow}></img>
        <span className="textm" onClick={handleShow}><strong>Registro de Proyecto</strong></span>
      </div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header>
          <Offcanvas.Title>

          <div className='ExpoIngLog2' onClick={handleClose}>
          <center><img className="ExpoIngLog2 w-50 h-50" src ={logo2} alt=""></img></center>  
          </div>

          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='container'>
            <div className='row m-2'>
              <div className ='col-md-auto '>
                <i class="bi bi-book-fill docu-icon2"></i>
                <span className ="TextoValid2">Resumen</span> 
              </div>  
            </div>

            <div className='row m-2'>
              <div className ='col-md-auto '>
                <i class="bi bi-boxes docu-icon2"></i>
                <span className ="TextoValid2">Mis Proyectos</span> 
              </div>  
            </div>

            <div className='row m-2'>
              <div className ='col-md-auto '>
                <i class="bi bi-wrench-adjustable-circle docu-icon2"></i>
                <span className ="TextoValid2">Solicitar material extra</span> 
              </div>  
            </div>

            <div className='row m-2'>
              <div className ='col-md-auto '>
                <i class="bi bi-trophy-fill docu-icon2"></i>
                <span className ="TextoValid2">Constancia</span> 
              </div>  
            </div>

            <div className='row m-2'>
              <div className ='col-md-auto '>
                <i class="bi bi-megaphone-fill docu-icon2"></i>
                <span className ="TextoValid2">Anuncios</span> 
              </div>  
            </div>

            <div className='row m-2'>
              <div className ='col-md-auto '>
                <i class="bi bi-map-fill docu-icon2"></i>
                <span className ="TextoValid2">Mapa</span> 
              </div>  
            </div>

          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}


function App() {
  return (
    <>
      <div className ="container-fluid">
          <div className="row" id = "NavBar">
            <div className="col-10">
              <div className = "ToggleButton">

              </div>
            </div>

            <div className="col-2">
              <div className = "ToggleButton">
                <div className="ProfPictFrame">
                </div>
              </div>
            </div>          
          </div>
        </div>


      <nav className='fixed-top'>
        <div className ="container-fluid">
          <div className="row" id = "NavBar">
            <div className="col-10">
              <ToggleBar />
            </div>

            <div className="col-2">
              <div className = "ToggleButton">
                <div className="ProfPictFrame">
                  <img src = {ProfPict} alt=""></img>
                </div>
              </div>
            </div>          
          </div>
        </div>
      </nav>

      <Algo  />
    
    </>

  );
}

export default App;
