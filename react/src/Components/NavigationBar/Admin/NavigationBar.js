import './NavigationBar.css'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import logo from '../../../Assets/logo.svg';
import logo2 from '../../../Assets/logo2.svg';

import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Link} from 'react-router-dom';



function ToggleBarStudent({SectionName}) {
    const [show, setShow] = useState(false);
  
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
                  </i><Link to='/student-profile' className='Titulo-toggle'> Cruz Daniel Pérez Jiménez</Link></center>
                </div>
              </div>
            </div>
          <hr />
      <nav>
            <div className='container'>
              <div className='row m-2'>
                <div className ='col-md-auto '>
                  <Link to='/' onClick={() => { handleClose();}} class="bi bi-bar-chart docu-icon2"></Link>
                  <Link to='/' className ="TextoValid2" onClick={() => { handleClose(); }}>Tablero</Link> 
                </div>  
              </div>

              <div className='row m-2'>
                <div className ='col-md-auto '>
                  <Link to ='/historico'onClick={() => { handleClose(); }} class="bi bi-book-fill docu-icon2"></Link>
                  <Link to='/historico' className ="TextoValid2" onClick={() => { handleClose(); }}>Histórico</Link> 
                </div>  
              </div>

              <div className='row m-2'>
                <div className ='col-md-auto '>
                  <Link to='/usuarios' onClick={() => { handleClose(); }} class="bi bi-people-fill docu-icon2"></Link>
                  <Link to='/usuarios' className ="TextoValid2" onClick={() => { handleClose();  }}>Usuarios</Link> 
                </div>  
              </div>

              <div className='row m-2'>
                <div className ='col-md-auto '>
                  <Link to='/proyectos' onClick={() => { handleClose();}} class="bi bi-boxes docu-icon2"></Link>
                  <Link to='/proyectos' className ="TextoValid2" onClick={() => { handleClose();}}>Proyectos</Link> 
                </div>  
              </div>

              <div className='row m-2'>
                <div className ='col-md-auto '>
                  <Link to='/proyectos' onClick={() => { handleClose();}} class="bi bi-megaphone-fill docu-icon2"></Link>
                  <Link to='/anuncios' className ="TextoValid2" onClick={() => { handleClose();}}>Anuncios</Link> 
                </div>  
              </div>

              <div className='row m-2'>
                <div className ='col-md-auto '>
                  <Link to='/mapa' onClick={() => { handleClose(); }} class="bi bi-map-fill docu-icon2"></Link>
                  <Link to='/mapa' className ="TextoValid2" onClick={() => { handleClose();}}>Mapa</Link> 
                </div>  
              </div>

              <div className='row m-2'>
                <div className ='col-md-auto '>
                  <Link to='/areas' onClick={() => { handleClose();}} class="bi bi-lightbulb-fill docu-icon2"></Link>
                  <Link to='/areas' className ="TextoValid2" onClick={() => { handleClose();}}>Áreas</Link> 
                </div>  
              </div>

              <div className='row m-2'>
                <div className ='col-md-auto '>
                  <Link to='/categorias' onClick={() => { handleClose();}} class="bi bi-gear-fill docu-icon2"></Link>
                  <Link to='/categorias' className ="TextoValid2" onClick={() => { handleClose();}}>Categorias</Link> 
                </div>  
              </div>

              <div className='row m-2'>
                <div className ='col-md-auto '>
                  <Link to='/proyectos' onClick={() => { handleClose();}} class="bi bi-pass-fill docu-icon2"></Link>
                  <Link to='/proyectos' className ="TextoValid2" onClick={() => { handleClose();}}>Rúbrica</Link> 
                </div>  
              </div>

              <div className='row m-2 mt-5'>
                <div className ='col-md-auto mt-5'>
                  <Link to='/mapa' onClick={() => { handleClose(); }} class="bi bi-box-arrow-left docu-icon2"></Link>
                  <Link to='/mapa' className ="TextoValid2" onClick={() => { handleClose(); }}>Cerrar sesión</Link> 
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
      <ToggleBarStudent SectionName={NameSection} />
    </div>
 
  </div>
</div>
</nav>
</>
);

}