import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import convocatoria from '../../../img/convocatoria.jpg';

import Menu from '../../../Components/Menu/menu.js';
import carrusel1 from '../../../img/carruselexp2.jpg';
import carrusel2 from '../../../img/carruselexp3.jpg';
import carrusel3 from '../../../img/carruselexp4.jpg';
import CardConcept from '../../../img/CardConcept.png';
import CardProto from '../../../img/CardProto.png';
import CardFinish from '../../../img/CardFinish.png';
import './main.css';

import { useAuth0 } from '@auth0/auth0-react';
import Callback from '../../../auth0/callback.js';
import '../../../auth0/callback.css';
import LoadingSpinner from '../../../auth0/loading.js';

export default function Main() {
  const { isAuthenticated, isLoading } = useAuth0();

  const Ref = useRef(null);
  
// The state for our timer
const [timer, setTimer] = useState('00:00:00');


const getTimeRemaining = (endTime) => {
  const countdownDateTime = new Date(endTime).getTime();
  const currentTime = new Date().getTime();
  const remainingDayTime = countdownDateTime - currentTime;
  
  const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
  const totalHours = Math.floor((remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const totalMinutes = Math.floor((remainingDayTime % (1000 * 60 * 60)) / (1000 * 60));
  const totalSeconds = Math.floor((remainingDayTime % (1000 * 60)) / 1000);

  return {
    totalDays, totalHours, totalMinutes, totalSeconds
  };
}

const startTimer = (endTime) => {
  const { totalDays, totalHours, totalMinutes, totalSeconds } = getTimeRemaining(endTime);

  // update the timer
  setTimer(
    (totalDays > 9 ? totalDays : '0' + totalDays) + ':' +
    (totalHours > 9 ? totalHours : '0' + totalHours) + ':' +
    (totalMinutes > 9 ? totalMinutes : '0' + totalMinutes) + ':' +
    (totalSeconds > 9 ? totalSeconds : '0' + totalSeconds)
  );
}

const clearTimer = (endTime) => {
  setTimer('00:00:00');
  if (Ref.current) clearInterval(Ref.current);
  const id = setInterval(() => {
    startTimer(endTime);
  }, 1000);
  Ref.current = id;
}

useEffect(() => {
  const endTime = new Date("2024-06-17T00:00:00");
  clearTimer(endTime);
}, []);
  

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Menu />
      <div className='container-fluid portadaimg p-5'></div>
      <div className='container-fluid conocenos'>

        <div className='row pt-5'>
          <div className='col-12 col-md-12'>
            <h2 className='titulo p-1'>¿Qué es expoingenieria?</h2>
          </div>
        </div>

        <div className='row p-1'>
          <span className='col-12 col-md-12 pe-5 ps-5 pt-2 m-1 texto-conocenos text-center text-md-start'>
            Evento organizado por el Tecnologico de Monterrey, el cual expone los mejores proyectos
            de ingeniería de cada campus al final semestre. No importa de que semestre o ingeniería sea, se evalúan respecto a una
            categoria en especifico. Las categorias son:
          </span>
        </div>
        <div className='row p-1 d-flex justify-content-center'>
          <div className='col-12 col-md-3 m-5'>
            <div className='card categoria'>
              <img src={CardConcept} alt='' className='ImagMain' />
              <div className='card-body'>
                <h6 className='card-title text-center'>Concepto</h6>
                <span>Este tipo de proyecto se encuentra en una fase inicial, donde las ideas están tomando forma. Aún no hay un producto tangible, pero se están explorando conceptos y posibilidades.</span>
              </div>
            </div>
          </div>
          <div className='col-12 col-md-3 m-5'>
            <div className='card'>
              <img src={CardProto} alt='' className='ImagMain' />
              <div className='card-body'>
                <h6 className='card-title text-center'>Prototipo</h6>
                <span>Los proyectos en esta etapa han avanzado más allá del concepto y ahora cuentan con un prototipo tangible. Aunque el producto no está finalizado, existen modelos físicos o virtuales que representan la idea principal.</span>
              </div>
            </div>
          </div>
          <div className='col-12 col-md-3 m-5'>
            <div className='card'>
              <img src={CardFinish} alt='' className='ImagMain' />
              <div className='card-body'>
                <h6 className='card-title text-center'>Prototipo finalizado</h6>
                <span>El proyecto ha alcanzado un nivel avanzado de desarrollo, con un prototipo funcional que refleja la visión original. Después de pruebas exhaustivas y ajustes, está listo para su presentación y posible implementación a mayor escala.</span>
              </div>
            </div>
          </div>
        </div>
        <div className='row p-1 pb-5'>
          <span className='col-12 col-md-12 pe-5 ps-5 pt-2 m-1 texto-conocenos text-center text-md-start'>
            Para su evaluación más adecuada, se le dá una área a cada proyecto, independiente de su categoria, para que los 3
            jueces que lo evaluen, sean expertos en el tema. Los jueces son profesores de la universidad, se cuida que no haya
            conflictos de interes respecto al proyecto. Las áreas son: Nano, Nexua, Bio, Cyber.
          </span>
        </div>
      </div>
      <div className='container-fluid participar d-flex'>
        <div className='row align-items-center'>
          <div className='col-md-6'>
            <div className='container-fluid texto-participar pb-5'>
              <h2 className='mb-1 p-2'>¿Cómo participar?</h2>
              <div className='row indicaciones'>
                <div className='col-md-11'>
                  <ol className='ms-3'>
                    <li>Registrarse el lider de equipo</li>
                    <li>Registrar el proyecto antes de la fecha limite. Debe tener un profesor encargado</li>
                    <li>Ya registrado el proyecto, el profesor encargado te autorizará o hará correcciones</li>
                    <li>Ya autorizado. Esperar las indicacionespara ese día y Listo ! </li>
                  </ol>
                </div>
              </div>
              <div className='row m-1 mt-2'>
                <div className='col-md-12'>
                  <h2 className='fecha'>Fecha: 17 de Junio de 2024</h2>
                </div>
              </div>
              <center>
                <div className='row m-1 mt-2 timer w-75'>
                  <div className='col-md-12'>
                    <h4 className='p-1 text-timer'>Días antes del evento: </h4>
                    <h5 className="text-timer">{timer}</h5>
                  </div>
                </div>
              </center>
            </div>
          </div>
          <div className='col-md-6 convocatoria-foto'>
            <img src={convocatoria} className='img-fluid' alt='' />
          </div>
        </div>
      </div>


      <div className='container-fluid carrusel-main'>
        <div className='row justify-content-center align-items-center'>
          <div className='col-md-8 ps-0'>
            <Carousel fade>
              <Carousel.Item>
                <img src={carrusel1} alt='' />
                <Carousel.Caption className='carrusel-text'>
                  <h3>Ediciones Pasadas</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src={carrusel2} alt='' />
                <Carousel.Caption className='carrusel-text'>
                  <h3>Ediciones Pasadas</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src={carrusel3} alt='' />
                <Carousel.Caption className='carrusel-text'>
                  <h3>Ediciones Pasadas</h3>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
          <div className='col-md-4 coment'>
            <div className='container-fluid d-flex flex-column'>
              <div className='row'>
                <div className='col-md-10 mt-3 mb-3 text-conoce'>
                  <h6>¿Quieres conocer a ganadores, así como proyecto de ediciones pasadas?</h6>
                </div>
              </div>
              <div className='row '>
                <div className='col-md-12 boton-container'>
                  <Link to="/Ediciones-pasadas" className='boton-carrusel'>Conoce Más</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
