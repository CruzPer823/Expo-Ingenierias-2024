import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Placeholder from 'react-bootstrap/Placeholder';
import Spinner from 'react-bootstrap/Spinner';
import ToggleBar from '../../../Components/Togglebar/togglebar.js';
import CardConcept from '../../../img/CardConcept.png';
import CardProto from '../../../img/CardProto.png';
import CardFinish from '../../../img/CardFinish.png';

import Badges from '../../Student/ProjectSelection/Badge.js';
import { useAuth0 } from '@auth0/auth0-react';

import './TeacherHome.css';

function tieneInformacion(variable) {
    if (variable === null || variable === undefined) {
        return false;
    }

    if (typeof variable === 'string' && variable.trim() === '') {
        return false;
    }

    if (Array.isArray(variable) && variable.length === 0) {
        return false;
    }

    if (typeof variable === 'number' && isNaN(variable)) {
        return false;
    }

    return true;
}

function HorizontalSlider({ data, IsLoaded }) {
    const imagenes = {
        "Concepto": CardConcept,
        "Prototipo": CardProto,
        "Prototipo finalizado": CardFinish
    };
    return (
        <>
            {!IsLoaded && (
                <div className="containerPlaceholderTeach d-flex alig-items-center justify-content-center">
                    <div className="semicircleteacher mb-5">
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <div>
                                            <div>
                                                <div>
                                                    <div>
                                                        <div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {IsLoaded && (
                <>
                    {!tieneInformacion(data) && (
                      <div className="container pb-1">
                          <div className='row '>
                            <div className='col-12 d-flex align-items-center justify-content-center'>
                              <i className='bi bi-binoculars-fill IconoNohyProjectsProfe'></i>
                            </div>
                            <div className='col-12 d-flex align-items-center justify-content-center'>
                              <h3 className='ColorNohayProyectoprofe'>Parece ser que aun no tienes proyectos</h3>
                            </div>
                          </div>
                      </div>

                    )}

                    {tieneInformacion(data) && (
                      <div className="slider-container p-1">
                          {data.map((item) => (
                              <div className='slider-item cardProf card m-3' key={item.id}>
                                  <img src={imagenes[item.category]} alt={item.id} className='card-img-top ImagProfe' />
                                  <div className='card-body'>
                                      <h5 className=' card-title m-2'>{item.id}</h5>
                                      <div className='container-fluid'>
                                          <div className='row d-flex justify-content-evenly mb-4'>
                                              <div className='badge-container mb-3'>
                                                  <Badges className={"badge p-2"} data={item.area}></Badges>

                                                  <Badges className={"badge p-2 text-wrap"} data={item.category}></Badges>

                                                  {item.statusGeneral === "rechazado" && (
                                                      <div className="badge-container">
                                                          <div className="badge2 p-2">{item.statusGeneral}</div>
                                                      </div>
                                                  )}

                                                  {item.statusGeneral === "aprobado" && (
                                                      <div className="badge-container">
                                                          <div className="badge3 p-2">{item.statusGeneral}</div>
                                                      </div>
                                                  )}

                                                  {item.statusGeneral === "en revision" && (
                                                      <div className="badge-container">
                                                          <div className="badge p-2">{item.statusGeneral}</div>
                                                      </div>
                                                  )}
                                              </div>
                                          </div>
                                      </div>
                                      <Link to={`/profesor/auth0|6653d38ae957844eac7c9f99/${item.id}`} className='custom-btn3 mb-5'>Ver Proyecto</Link>
                                  </div>
                              </div>
                          ))}
                      </div>

                    )}

                </>
            )}
        </>
    );
};

function Resumeteacher({ Total, revisados, faltantes, progreso, IsLoaded }) {
    return (
        <div className='col-md-3'>
            <div className="Info m-4 p-4">
                <h1 className="Titulo text-break">Control de revisión</h1>
                <div className='container-fluid p-1'>
                    <div className="row pb-3">
                        <div className='col-md-auto pe-0'>
                            <span className="Subtitulo">Proyectos Faltantes:</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className='col-md-auto pe-0'>
                            {!IsLoaded && (
                                <Spinner animation="grow" className='BolitaProfesorCarga' />
                            )}
                            {IsLoaded && (
                                <h6 className="Texto text-break Titulo1">{faltantes}/{Total}</h6>
                            )}
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className='col-md-auto pe-0 '>
                            <h6 className="Subtitulo">Proyectos revisados:</h6>
                        </div>
                    </div>
                    <div className="row ">
                        <div className='col-md-auto pe-0'>
                            {!IsLoaded && (
                                <Spinner animation="grow" className='BolitaProfesorCarga' />
                            )}
                            {IsLoaded && (
                                <h6 className="Texto text-break Titulo1">{revisados}/{Total}</h6>
                            )}
                        </div>
                    </div>
                    <div className="row justify-content-between d-flex align-items-center">
                        <div className="col-md-1"></div>
                        <div className="col-md-auto">
                            <span className="Subtitulo">{!IsLoaded && (<Spinner animation="grow" className='BolitaProfesorCarga' />)}{IsLoaded && (<h6 className="Texto text-break fw-bolder mt-3">Progreso: {progreso}</h6>)}</span>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProjResume({ horas, profesor, IsLoaded }) {
    return (
        <div className='col-md-7 pt-4 ps-4 pe-4'>
            <div className="container-fluid BGResume-profesor w-100 ">
                <div className="row p-2 BGBar">
                    <div className="col-md-12"><span style={{ display: 'inline-block', width: '100%', height: 0 }}></span></div>
                </div>
                <div className='m-4 p-0'>
                    <div className="container-fluid welcomeContent">
                        <div className="row">
                            <div className="col-md proj-sub text-start"><h3 className='text-break prof-titulo-h3-1'>Cierre de Registro:</h3></div>
                        </div>
                        <div className="row">
                            <div className="col-md proj-sub text-start"><center><h3 className='text-break prof-titulo-h3-2'>{IsLoaded && (horas)} {!IsLoaded && (<Placeholder animation="glow" className="w-100"><Placeholder xs={9} bg="light" className="mb-2" /></Placeholder>)}</h3></center></div>
                        </div>

                        <hr className='divisor'></hr>

                        <div className="row">
                            <div className="col-md proj-sub text-start"><h1 className='text-break prof-titulo-h1'>{IsLoaded && ("Bienvenido " + profesor)} {IsLoaded === "True" && (<Placeholder animation="glow" className="w-100"><Placeholder xs={12} bg="light" className="mb-2" /></Placeholder>)}</h1></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Hometeacher() {
    const [projects, setProjects] = useState([]);
    const { id_responsable } = useParams(); // Asumiendo que este es el parámetro que obtienes desde la URL
    const { isAuthenticated, isLoading, error, user } = useAuth0();
    console.log(user.sub);
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
    const [IsLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        //nuevodescr120T
        //http://localhost:8000/projects/responsable/${user.sub}
        fetch(`http://localhost:8000/projects/responsable/auth0|6653d38ae957844eac7c9f99`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => { setProjects(data); setIsLoaded(true); })
            .catch((error) => { console.error('Error al obtener los proyectos:', error); setIsLoaded(true); });
        const endTime = new Date("2024-06-10T00:00:00");
        clearTimer(endTime);

    }, [id_responsable]);

    console.log(projects);
    const falt = projects.filter(project => project.statusGeneral === "en revision");
    const rev = projects.filter(project => project.statusGeneral === "rechazado" || project.statusGeneral === "aprobado");
    const porcentaje = (rev.length * 100) / projects.length;

    return (
        <>
            <ToggleBar NameSecProf={"Inicio"} />
            <div className='container-fluid centered-container'>
                <div className='container-fluid'>
                    <div className='row d-flex justify-content-between'>
                        <div className="col-md-1"></div>
                        <ProjResume IsLoaded={IsLoaded} horas={timer} profesor={"Sarai Santiago"}></ProjResume>
                        <Resumeteacher IsLoaded={IsLoaded} Total={projects.length} revisados={rev.length} faltantes={falt.length} progreso={porcentaje + '%'}></Resumeteacher>
                        <div className="col-md-1"></div>
                        <div className='row d-flex justify-content-between align-items-center'>
                            <div className="col-md-1"></div>
                            <div className="col-md-10 ">
                                <div className='container-fluid' id="imgfondo">
                                    <h3 className="Titulo ps-3 pb-0 pt-3 mb-0">Proyectos Que faltan de revisar</h3>
                                    <HorizontalSlider data={falt} IsLoaded={IsLoaded} />
                                </div>
                            </div>
                            <div className="col-md-1"></div>
                        </div>
                        <div className='row d-flex justify-content-between align-items-center'>
                            <div className="col-md-1"></div>
                            <div className="col-md-10 ">
                                <div className='container-fluid mb-3' id="imgfondo">
                                    <h3 className="Titulo ps-3 pb-0 mb-0">Proyectos Revisados</h3>
                                    <HorizontalSlider data={rev} IsLoaded={IsLoaded} />
                                </div>
                            </div>
                            <div className="col-md-1"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}