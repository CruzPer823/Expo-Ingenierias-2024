import logo from '../../img/logo.svg';
import { Link } from 'react-router-dom';
import './menu.css';
import { useAuth0 } from "@auth0/auth0-react";
import Callback from '../../auth0/callback.js';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

const RegisterLink = () => {
  const { loginWithRedirect } = useAuth0();
  
  return (
    <button onClick={() => loginWithRedirect()} className="opciones-btn me-3">Iniciar Sesión</button>
  );
};


const PlatformLink = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const navigate = useNavigate();

  const handlePlatformClick = () => {
    if (!isLoading && isAuthenticated && user) {
      const username = user.email.split('@')[0];
      const isStudent = /^[aA]\d{8}$/.test(username);

      if (isStudent) {
        localStorage.setItem('userRole', 'student');
        navigate('/principal-estudiante'); // Redirigir a la página de estudiante
      } else {
        localStorage.setItem('userRole', 'teacher');
        navigate('/principal-profesor'); // Redirigir a la página de profesor
      }
    }
  };

  return (
    <button onClick={handlePlatformClick} className="opciones-btn me-3">Iniciar Sesión</button>
  );
};


export default function Menu() {
  const { isAuthenticated } = useAuth0();


  return (
    <>  
      <div className='container-fluid'>
        <div className="row" id="NavMain">
          <div className="col-10">
            <div className="ToggleButton"></div>
          </div>
          <div className="col-2">
            <div className="ToggleButton">
              <div className="ProfPictFrame"></div>
            </div>
          </div>          
        </div>
      </div>
      <div className="container-fluid p-0 w-100">
        <div className='row'>
          <div className='col-md'>
            <nav className='navbar navbar-expand-lg fixed-top' id="NavBar">
            <div className ="ToggleButtonMain">
              <img className="ExpoIngLog2Main" src ={logo} alt=""></img>
              <span className="textm no-select"><strong>ExpoIngenierias</strong></span>
            </div>
  
              <div className={`collapse navbar-collapse justify-content-end`} id="navbarNav">
                <ul className="nav navbar-nav">
                  <li className="nav-item">
                    <Link to="/Ediciones-pasadas" className='nav-link opciones m-2'>Ediciones Pasadas</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/Catalogo" className='nav-link opciones m-2'>Catalogo</Link>
                  </li>
                  <li className="nav-item">
                    {isAuthenticated ? <PlatformLink /> : <RegisterLink />}
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
