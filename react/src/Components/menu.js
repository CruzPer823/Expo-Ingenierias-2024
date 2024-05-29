import React, { useState } from 'react';
import ProfPict from '../img/descargar.jpeg'
import logo from '../img/logo.svg'
import {Link} from 'react-router-dom'

import '../css/menu.css'
export default function Menu() {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggle = () => {
    setShowMenu(!showMenu);
  };
    return (
      <>  
      <div className='container-fluid'>
        <div className="row" id = "NavMain">
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
          <div className="container-fluid p-0 w-100">
            <div className='row'>
              <div className='col-md-12'>
          <nav className='navbar navbar-expand-lg fixed-top' id="NavBar">
        <div className="navbar-brand">
          <img className="ExpoIngLog img-fluid" src={logo} alt="" />
        </div>
        <button className="navbar-toggler"
        type="button"
        onClick={handleToggle}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse justify-content-end ${showMenu ? 'show' : ''}`} id="navbarNav">
          <ul className="nav navbar-nav">
            <li className="nav-item">
              <Link to="/Conocenos" className='nav-link opciones m-2'>Conocenos</Link>
            </li>
            <li className="nav-item">
              <Link to="/Como-participar" className='nav-link  opciones m-2'>¿Cómo Participar?</Link>
            </li>
            <li className="nav-item">
              <Link to="/Ediciones-pasadas" className='nav-link opciones m-2'>Ediciones Pasadas</Link>
            </li>
            <li className="nav-item">
              <Link to="/Catalogo" className='nav-link opciones m-2'>Catalogo</Link>
            </li>
            <li className="nav-item">
              <Link to="/Registro-inicio" className='nav-link  opciones-btn m-2'>Registrarse</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className='nav-link opciones-btn m-2'>Iniciar Sesion</Link>
            </li>
          </ul>
        </div>
    </nav>
    </div>
    </div>  
    </div>    
      </>
  
    );
  }