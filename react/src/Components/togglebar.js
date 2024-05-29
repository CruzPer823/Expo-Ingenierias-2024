import '../css/togglebar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import logo from '../img/logo.svg';
import logo2 from '../img/logo2.svg';

import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Routes, Route, Link} from 'react-router-dom';
function ToggleBar() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [section,setSection] = useState("Expo Ingenierias")
  
    return (
      <>
        <div className ="ToggleButton">
          <i className='bi bi-list the_bars' onClick={handleShow}></i>
          <img className="ExpoIngLog2" src ={logo} alt="" onClick={handleShow}></img>
          <span className="textm no-select" onClick={handleShow}><strong>{section}</strong></span>
        </div>
  
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header>
            <Offcanvas.Title>
  
            <div className='ExpoIngLog3' onClick={handleClose}>
            <center><img className="ExpoIngLog3 w-50 h-50" src ={logo2} alt=""></img></center>  
            </div>
  
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <nav>
              <div className='container'>
                <div className='row m-2'>
                  <div className ='col-md-auto '>
                    <Link to='/principal-profesor' onClick={() => { handleClose(); setSection("principal-profesor"); }} class="bi bi-book-fill docu-icon2"></Link>
                    <Link to='/principal-profesor' className ="TextoValid2" onClick={() => { handleClose(); setSection("principal-profesor");}}>Resumen</Link> 
                  </div>  
                </div>
  
                <div className='row m-2'>
                  <div className ='col-md-auto '>
                    <Link to='/constancia-profesor' onClick={() => { handleClose(); setSection("constancia-profesor");}} class="bi bi-trophy-fill docu-icon2"></Link>
                    <Link to='/constancia-profesor' className ="TextoValid2" onClick={() => { handleClose(); setSection("constancia-profesor"); }}>Constancia</Link> 
                  </div>  
                </div>
  
                <div className='row m-2'>
                  <div className ='col-md-auto '>
                    <Link to='/anuncios-profesors' onClick={() => { handleClose(); setSection("anuncios-profesor");}} class="bi bi-megaphone-fill docu-icon2"></Link>
                    <Link to='/anuncios-profesor' className ="TextoValid2" onClick={() => { handleClose(); setSection("anuncios-profesor");}}>Anuncios</Link> 
                  </div>  
                </div>
                <div className='row m-2'>
                  <div className ='col-md-auto '>
                    <Link to='/perfil-usuario' onClick={() => { handleClose(); setSection("anuncios-profesor");}} class="bi bi-person-fill docu-icon2"></Link>
                    <Link to='/perfil-usuario' className ="TextoValid2" onClick={() => { handleClose(); setSection("anuncios-profesor");}}>Perfil</Link> 
                  </div>  
                </div>

  
              </div>
            </nav>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }

export default function Menu(){
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
      <ToggleBar />
    </div>
 
  </div>
</div>
</nav>
</>
);

}