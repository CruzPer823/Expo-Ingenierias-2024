import './togglebarStudent.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import logo from '../../img/logo.svg';
import logo2 from '../../img/logo2.svg';

import { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Link} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { useParams } from "react-router-dom";

const URL = 'http://localhost:8000/students/'


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



function ToggleBarStudent({SectionName}) {
    const [show, setShow] = useState(false);
    const { isAuthenticated, isLoading, error, user } = useAuth0();
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [student, setStudent] = useState({
      id_student: 0,
      name: "",
      lastName: "",
      enrollment: "",
    });

    const { id_student } = useParams();
  
    useEffect(() => {
      //fetch(URL+id_student)
      fetch(URL+user.sub)
        .then((res) => res.json())
        .then((data) => {
          setStudent(data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, [id_student]);
  
    
  
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
                <center><Link to='/student-profile'><i className='bi bi-person-circle docu-icon2'>
                  </i></Link><Link to={'/student-profile/'} className='Titulo-toggle'> {student.name + " " + student.lastName} </Link></center>
                </div>
              </div>
            </div>
          <hr />
      <nav>
            <div className='container'>
              <div className='row m-2'>
                <div className ='col-md-auto '>
                  <Link to='/principal-estudiante' onClick={() => { handleClose();}} class="bi bi-boxes docu-icon2"></Link>
                  <Link to='/principal-estudiante' className ="TextoValid2" onClick={() => { handleClose(); }}>Mis Proyectos</Link> 
                </div>  
              </div>

              <div className='row m-2'>
                <div className ='col-md-auto '>
                  <Link to='/constancia-estudiante' onClick={() => { handleClose(); }} class="bi bi-trophy-fill docu-icon2"></Link>
                  <Link to='/constancia-estudiante' className ="TextoValid2" onClick={() => { handleClose();  }}>Constancia</Link> 
                </div>  
              </div>

              <div className='row m-2'>
                <div className ='col-md-auto '>
                  <Link to='/anuncio-estudiante' onClick={() => { handleClose();}} class="bi bi-megaphone-fill docu-icon2"></Link>
                  <Link to='/anuncio-estudiante' className ="TextoValid2" onClick={() => { handleClose();}}>Anuncios</Link> 
                </div>  
              </div>

              <div className='row m-2'>
                <div className ='col-md-auto '>
                  <Link to='/mapa' onClick={() => { handleClose(); }} class="bi bi-map-fill docu-icon2"></Link>
                  <Link to='/mapa' className ="TextoValid2" onClick={() => { handleClose();}}>Mapa</Link> 
                </div>  
              </div>


              <div className='row m-2 mt-5'>
                <div className ='col-md-auto mt-5'>
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