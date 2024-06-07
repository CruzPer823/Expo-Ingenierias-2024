import './togglebar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import logo from '../../img/logo.svg';
import logo2 from '../../img/logo2.svg';
import React, { useState,useEffect} from "react";

import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';


const URLAnnoun = 'http://localhost:8000/announ/countReadAnnouncementsPerson/'

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      returnTo: "http://localhost:3000", 
    });
  };

  
  return (
    <Link to='/' className="TextoValid2" onClick={handleLogout}>Cerrar sesión</Link>
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

  const [unreadCount, setUnreadCount] = useState(0);
  useEffect(() => {
    // Verificación inicial
    if (!user || !user.sub) {
        return;
    }

    async function fetchData() {
        try {
            const response = await fetch(`http://localhost:8000/person/resume/${user.sub}`);
            
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


  useEffect(() => {
    fetch(URLAnnoun + user.sub)
      .then((res) => res.json())
      .then((data) => {
        setUnreadCount(data.countsAnnoun);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


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
            </i><Link to='/perfil-profesor' className='Titulo-toggle'>{user_b.name+' '+user_b.lastName}</Link></center>
          </div>
        </div>
      </div>
      <hr />
            <nav>
              <div className='container'>
                <div className='row m-2'>
                  <div className ='col-md-auto '>
                    <Link to='/principal-profesor' onClick={() => { handleClose();  }} class="bi bi-book-fill docu-icon2"></Link>
                    <Link to='/principal-profesor' className ="TextoValid2" onClick={() => { handleClose(); }}>Autorizar proyectos</Link> 
                  </div>  
                </div>

                <div className='row m-2'>
                <div className ='col-md-auto '>
                  <Link to={`/Juez`} onClick={() => { handleClose();}} class="bi bi-award-fill docu-icon2"></Link>
                  <Link to={`/Juez`} className ="TextoValid2" onClick={() => { handleClose(); }}>Calificar proyectos</Link> 
                </div>  
              </div>

              {/*<div className='row m-2'>
                <div className ='col-md-auto '>
                  <Link to={`/Juez/General`} onClick={() => { handleClose();}} class="bi bi-book-fill docu-icon2"></Link>
                  <Link to={`/Juez/General`} className ="TextoValid2" onClick={() => { handleClose(); }}>Todos los proyectos</Link> 
                </div>  
              </div>*/}

              <div className='row m-2'>
                  <div className ='col-md-auto '>
                    <Link to='/constancia-profesor' onClick={() => { handleClose(); }} class="bi bi-trophy-fill docu-icon2"></Link>
                    <Link to='/constancia-profesor' className ="TextoValid2" onClick={() => { handleClose();  }}>Constancia</Link> 
                  </div>  
                </div>
  
                <div className='row m-2'>
                  <div className ='col-md-auto d-flex align-items-center'>
                    <Link to='/anuncios-profesors' onClick={() => { handleClose(); }} class="bi bi-megaphone-fill docu-icon2"></Link>
                    <Link to='/anuncios-profesor' className ="TextoValid2" onClick={() => { handleClose(); }}>Anuncios {unreadCount > 0 && (<span className="notification-badge">{unreadCount}</span>)}</Link> 
                  </div>  
                </div>

                <div className='row m-2'>
                  <div className ='col-md-auto d-flex align-items-center'>
                    <Link to='/Juez/Mapa' onClick={() => { handleClose(); }} class="bi bi-map-fill docu-icon2"></Link>
                    <Link to='/Juez/Mapa' className ="TextoValid2" onClick={() => { handleClose(); }}>Mapa</Link> 
                  </div>  
                </div>

                <div className='row m-2 mt-5'>
                  <div className='col-md-auto mt-5'>
                  <Link onClick={() => { handleClose(); }} class="bi bi-box-arrow-left docu-icon2"></Link>
                  <LogoutButton/>
                  </div>
                </div>
 
              </div>
            </nav>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }

export default function Menu({NameSecProf}){
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
      <ToggleBar SectionName={NameSecProf} />
    </div>
 
  </div>
</div>
</nav>
</>
);

}
