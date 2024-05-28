import './NavigationBar.css'
import React from 'react';
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import logo from '../../../Assets/logo.svg';
import logo2 from '../../../Assets/logo2.svg';

import Offcanvas from 'react-bootstrap/Offcanvas';
import {Link, useParams} from 'react-router-dom';



function ToggleBarStudent({Person, SectionName}) {
    const [show, setShow] = useState(false);
    //const defaultIdPersona = 5;  // Define un valor por defecto para idpersona por ahora antes de poner el auth0

  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
  
    return (
      <>
        <div className ="ToggleButton">
          <i className='bi bi-list the_bars' onClick={handleShow}></i>
          <img className="ExpoIngLog2" src ={logo} alt="" onClick={handleShow}></img>
          <span className="textm no-select" onClick={handleShow}><strong>{SectionName}</strong></span>
        </div>
  
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header className='pb-0'>
            <Offcanvas.Title >
  
            <div className='ExpoIngLog3' onClick={handleClose}>
            <center><img className="ExpoIngLog3 w-50 h-50" src ={logo2} alt=""></img></center>  
            </div>
  
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className='pt-0'>
          <hr />
            <div className='container-fluid'>
              <div className='row'>
                <div className='col'>
                <center><i className='bi bi-person-circle docu-icon2'>
                  </i><Link to={`/Juez/Perfil/${Person.id}`} className='Titulo-toggle'>{Person.name} {Person.lastName}</Link></center>
                </div>
              </div>
            </div>
          <hr />
      <nav>
            <div className='container'>
              <div className='row m-2'>
                <div className ='col-md-auto '>
                  <Link to={`/Juez/${Person.id}`} onClick={() => { handleClose();}} class="bi bi-boxes docu-icon2"></Link>
                  <Link to={`/Juez/${Person.id}`} className ="TextoValid2" onClick={() => { handleClose(); }}>Mis proyectos</Link> 
                </div>  
              </div>

              <div className='row m-2'>
                <div className ='col-md-auto '>
                  <Link to={`/Juez/General/${Person.id}`} onClick={() => { handleClose();}} class="bi bi-boxes docu-icon2"></Link>
                  <Link to={`/Juez/General/${Person.id}`} className ="TextoValid2" onClick={() => { handleClose(); }}>Todos los proyectos</Link> 
                </div>  
              </div>


              <div className='row m-2'>
                <div className ='col-md-auto '>
                  <Link to={`/Juez/Anuncios/${Person.id}`} onClick={() => { handleClose();}} class="bi bi-megaphone-fill docu-icon2"></Link>
                  <Link to={`/Juez/Anuncios/${Person.id}`} className ="TextoValid2" onClick={() => { handleClose();}}>Anuncios</Link> 
                </div>  
              </div>

              <div className='row m-2'>
                <div className ='col-md-auto '>
                  <Link to={`/mapa`} onClick={() => { handleClose(); }} class="bi bi-map-fill docu-icon2"></Link>
                  <Link to={`/mapa`} className ="TextoValid2" onClick={() => { handleClose();}}>Mapa</Link> 
                </div>  
              </div>


              <div className='row m-2 mt-5'>
                <div className ='col-md-auto mt-5'>
                  <Link to={`/mapa`} onClick={() => { handleClose(); }} class="bi bi-box-arrow-left docu-icon2"></Link>
                  <Link to={`/mapa`} className ="TextoValid2" onClick={() => { handleClose(); }}>Cerrar sesión</Link> 
                </div>  
              </div>

            </div>
          </nav>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }

export default function Menu({NameSection}){
  const { idpersona } = useParams();
  const [person, setPerson] = useState({
      id:0,
      name: "",
      lastName: ""
  });

  useEffect(() => {
    fetch(`http://localhost:8000/api/persons/${idpersona}`)
    .then((res) => res.json())
    .then((data) => {
      setPerson(data);
    });
  }, [idpersona]);

  return (
    <>
  <div className ="container-fluid">
  <div className="row" id = "NavBar">
    <div className="col-auto">
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
  <div className="row " id = "NavBar">
    <div className="col-5">
      <ToggleBarStudent Person={person} SectionName={NameSection} />
    </div>
 
  </div>
</div>
</nav>
</>
);

}