import './togglebar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import logo from '../../img/logo.svg';
import logo2 from '../../img/logo2.svg';

import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';


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
            </i><Link to='/perfil-profesor/auth0|6653d38ae957844eac7c9f99' className='Titulo-toggle'> Rosa Paredes</Link></center>
          </div>
        </div>
      </div>
      <hr />
            <nav>
              <div className='container'>
                <div className='row m-2'>
                  <div className ='col-md-auto '>
                    <Link to='/principal-profesor' onClick={() => { handleClose();  }} class="bi bi-book-fill docu-icon2"></Link>
                    <Link to='/principal-profesor' className ="TextoValid2" onClick={() => { handleClose(); }}>Resumen</Link> 
                  </div>  
                </div>
  
                <div className='row m-2'>
                  <div className ='col-md-auto '>
                    <Link to='/constancia-profesor/auth0|6653d38ae957844eac7c9f99' onClick={() => { handleClose(); }} class="bi bi-trophy-fill docu-icon2"></Link>
                    <Link to='/constancia-profesor/auth0|6653d38ae957844eac7c9f99' className ="TextoValid2" onClick={() => { handleClose();  }}>Constancia</Link> 
                  </div>  
                </div>
  
                <div className='row m-2'>
                  <div className ='col-md-auto '>
                    <Link to='/anuncios-profesors' onClick={() => { handleClose(); }} class="bi bi-megaphone-fill docu-icon2"></Link>
                    <Link to='/anuncios-profesor' className ="TextoValid2" onClick={() => { handleClose(); }}>Anuncios</Link> 
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
