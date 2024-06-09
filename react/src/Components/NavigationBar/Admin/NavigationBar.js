import './NavigationBar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import logo from '../../../img/logo.svg';
import logo2 from '../../../img/logo2.svg';
import React, { useState,useEffect} from "react";

import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="TextoValid2" onClick={handleLogout} style={{ cursor: 'pointer' }}>
      Cerrar sesión
    </div>
  );
};

function ToggleBar({SectionName}) {
    const [show, setShow] = useState(false);
    const [user_b, setUser] = useState({
      id: "",
      name: "",
      lastName: "",
      email: "",
  })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const { isAuthenticated, isLoading, error, user } = useAuth0();

    useEffect(() => {
      // Verificación inicial
      if (!user || !user.sub) {
          return;
      }
  
      async function fetchData() {
          try {
            
              const response = await fetch(`http://localhost:8000/Admin/getAdminInfo/${user.sub}`);
              
              // Verificación de que la respuesta es correcta
              if (!response.ok) {
                  throw new Error(`Network response was not ok: ${response.statusText}`);
              }
              
              const userResponse = await response.json();
              setUser(userResponse);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      }
  
      fetchData();
  }, [user]); // Dependencias del useEffect
  
  
  
  
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
  
            <div className='container'>
            <div className='row'>
              <div className='col-10 contenedorimagenredireccionprincipal'>
                <Link to={"/"}><center><img className="ExpoIngLog3 w-50 h-50" src ={logo2} alt=""></img></center></Link>  
              </div>

              <div className='col'>
                <center> <i className='bi bi-x-circle-fill CerrrarMadreEsta' onClick={handleClose}></i></center>  
              </div>
            </div>
          </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className='pt-0'>
          <hr />
            <div className='container-fluid'>
              <div className='row'>
                <div className='col'>
                <center><i className='bi bi-person-circle docu-icon2'>
                  </i><Link to='/Admin/admin-profile' className='Titulo-toggle'> {user_b.name+' '+user_b.lastName}</Link></center>
                </div>
              </div>
            </div>
          <hr />
      <nav>
            <div className='container'>
              <div className='row m-2'>
                <div className ='col-md-auto '>
                  <Link to='/Admin' onClick={() => { handleClose();}} class="bi bi-bar-chart docu-icon2"></Link>
                  <Link to='/Admin' className ="TextoValid2" onClick={() => { handleClose(); }}>Tablero</Link> 
                </div>  
              </div>

              <div className='row m-2'>
                <div className ='col-md-auto '>
                  <Link to ='/Admin/historico'onClick={() => { handleClose(); }} class="bi bi-book-fill docu-icon2"></Link>
                  <Link to='/Admin/historico' className ="TextoValid2" onClick={() => { handleClose(); }}>Histórico</Link> 
                </div>  
              </div>

              <div className='row m-2'>
                <div className ='col-md-auto '>
                  <Link to='/Admin/usuarios' onClick={() => { handleClose(); }} class="bi bi-people-fill docu-icon2"></Link>
                  <Link to='/Admin/usuarios' className ="TextoValid2" onClick={() => { handleClose();  }}>Usuarios</Link> 
                </div>  
              </div>

              <div className='row m-2'>
                <div className ='col-md-auto '>
                  <Link to='/Admin/proyectos' onClick={() => { handleClose();}} class="bi bi-boxes docu-icon2"></Link>
                  <Link to='/Admin/proyectos' className ="TextoValid2" onClick={() => { handleClose();}}>Proyectos</Link> 
                </div>  
              </div>

              <div className='row m-2'>
                <div className ='col-md-auto '>
                  <Link to='/Admin/anuncios' onClick={() => { handleClose();}} class="bi bi-megaphone-fill docu-icon2"></Link>
                  <Link to='/Admin/anuncios' className ="TextoValid2" onClick={() => { handleClose();}}>Anuncios</Link> 
                </div>  
              </div>

              <div className='row m-2'>
                <div className ='col-md-auto '>
                  <Link to='/Admin/mapa' onClick={() => { handleClose(); }} class="bi bi-map-fill docu-icon2"></Link>
                  <Link to='/Admin/mapa' className ="TextoValid2" onClick={() => { handleClose();}}>Mapa</Link> 
                </div>  
              </div>

              <div className='row m-2'>
                <div className ='col-md-auto '>
                  <Link to='/Admin/areas' onClick={() => { handleClose();}} class="bi bi-lightbulb-fill docu-icon2"></Link>
                  <Link to='/Admin/areas' className ="TextoValid2" onClick={() => { handleClose();}}>Áreas</Link> 
                </div>  
              </div>

              <div className='row m-2'>
                <div className ='col-md-auto '>
                  <Link to='/Admin/categorias' onClick={() => { handleClose();}} class="bi bi-gear-fill docu-icon2"></Link>
                  <Link to='/Admin/categorias' className ="TextoValid2" onClick={() => { handleClose();}}>Categorias</Link> 
                </div>  
              </div>

              <div className='row m-2'>
                <div className ='col-md-auto '>
                  <Link to='/rubrica' onClick={() => { handleClose();}} class="bi bi-pass-fill docu-icon2"></Link>
                  <Link to='/Admin/rubrica' className ="TextoValid2" onClick={() => { handleClose();}}>Rúbrica</Link> 
                </div>  
              </div>

              <div className='row m-2 mt-5'>
                <div className='col-md-auto mt-5 d-flex align-items-center'>
                  <Link onClick={() => { handleClose(); }} className="bi bi-box-arrow-left docu-icon2" style={{ display: 'inline' }}></Link>
                  <LogoutButton />
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
      <ToggleBar SectionName={NameSection} />
    </div>
 
  </div>
</div>
</nav>
</>
);

}
