import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CardConcept from '../../../img/CardConcept.png';
import CardProto from '../../../img/CardProto.png';
import CardFinish from '../../../img/CardFinish.png';
import './TeacherProjectResumen.css';
import ToggleBar from '../../../Components/Togglebar/togglebar.js';
import Usure from '../../../Components/BotonConfirmacion/ConfBot';
import Placeholder from 'react-bootstrap/Placeholder';
import Spinner from 'react-bootstrap/Spinner';



function MemberCont({ NombreMiembro }) {
    return (
        <li className="Texto text-wrap ps-3 mb-0">{NombreMiembro}</li>
    );
}

function InfoProj({ lead, members, status, IsLoaded }) {
    const diccionario = {
        "aprobado": "bi bi-check-circle aceptado1 p-2",
        "rechazado": "bi bi-x-circle rechazado1 p-2",
        "en revision": "bi bi-hourglass-split espera1 p-2"
    };
    return (
        <div className='col-md-3'>
            <div className="Info m-4 p-4">
                <h1 className="Titulo text-break">Información del proyecto</h1>
                <div className='container-fluid p-1'>
                    <div className="row pb-3">
                        <div className='col-md-auto pe-0'>
                            <span className="Subtitulo">Líder:</span>
                        </div>
                        <div className='row-md-auto ps-0'>
                            <span className="Texto text-break">{IsLoaded ? lead : (<Placeholder animation="glow" className="w-100"><Placeholder xs={12} bg="Dark" size="lg" /></Placeholder>)}</span>
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className='col-md-auto pe-0'>
                            <span className="Subtitulo">Integrantes del equipo:</span>
                        </div>
                        {!IsLoaded && (
                            <div className='row-md ps-4'>
                                <p>
                                    <Placeholder animation="glow" className="w-100">
                                        <Placeholder xs={12} bg="Dark" size="lg" />
                                    </Placeholder>
                                </p>
                            </div>
                        )}
                        {IsLoaded && (
                            <div className='col-md-auto ps-0'>
                                {members.map((student, index) => (
                                    <MemberCont key={index} NombreMiembro={student.name + " " + student.lastName} />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="row justify-content-between d-flex align-items-center">
                        <div className="col-md-1"></div>
                        {IsLoaded ? (
                            <div className="col-md-auto">
                                <i className={diccionario[status]}> {status}</i>
                            </div>
                        ) : (
                            <div className="col-md-auto">
                                <Spinner animation="grow" size="xl" />
                            </div>
                        )}
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProjResume({ type, area, title, IsLoaded }) {
    const imagenes = {
        "Concepto": CardConcept,
        "Prototipo": CardProto,
        "Prototipo finalizado": CardFinish
    };
    return (
        <div className='col-12 col-md-7 pt-4 ps-4 pe-4 '>
            {!IsLoaded ? (
                <div className="container-fluid BGResumeTeacherPlaceHolder w-100">
                    <div className="row p-2 BGBar">
                        <div className="col proj-sub-bold text-start"><span className='gemelo'>Tipo de proyecto: <Placeholder animation="glow" className="w-100"><Placeholder xs={6} bg="light" className="mb-2" /></Placeholder></span></div>
                        <div className="col proj-sub-bold text-end"><span className='gemelo'><Placeholder animation="glow" className="w-100"><Placeholder xs={6} bg="light" className="mb-2" /></Placeholder></span></div>
                    </div>
                    <div className='me-4 ms-4 mb-4 pb-3 pe-3 ps-3 mt-4'>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xxl-12 proj-tit d-flex align-items-center justify-content-center mt-2 wrap"><span className='text-break'><Spinner animation="grow" className='BolitaProfesorResumenCarga' /></span></div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container-fluid BGResumeTeacher w-100" style={{ backgroundImage: `url(${imagenes[type]})` }}>
                    <div className="row p-2 BGBar">
                        <div className="col proj-sub-bold text-start"><span className='gemelo'>Tipo de proyecto: {type}</span></div>
                        <div className="col proj-sub-bold text-end"><span className='gemelo'>{area}</span></div>
                    </div>
                    <div className='me-4 ms-4 mb-4 pb-3 pe-3 ps-3 mt-4'>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xxl-12 proj-tit wrap"><span className='text-break'>{title}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ProjResumeCont() {
  const [project, setProject] = useState({
    id_project: 0,
    title: "",
    description: "",
    linkVideo: "",
    linkPoster: "",
    statusGeneral: "",
    statusPoster: "",
    statusVideo: "",
    area: "",
    category: "",
    Lider: "",
    student: "",
    team: {students: []},
    comment: "",
    criterias: [
      { id: 1, description: "", weight: 0 },
      { id: 2, description: "", weight: 0 },
      { id: 3, description: "", weight: 0 },
      { id: 4, description: "", weight: 0 },
      { id: 5, description: "", weight: 0 }
    ]
  });
  const { id_person, id_project } = useParams();
  const [IsLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [comment, setComment] = useState({ comment: '' });
  const [switchPdf, setSwitchPdf] = useState(false);
  const [switchVideo, setSwitchVideo] = useState(false);
  const [showFullText, setShowFullText] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(false);
      try {
        const res = await fetch(`http://localhost:8000/projects/resume/${id_project}`);
        const data = await res.json();
        setProject(data);
        setComment(data?.comment?.comment || ''); // Usa el operador de encadenamiento opcional y un valor predeterminado.
      } catch (error) {
        console.error('Error fetching project data:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchData();
  }, [id_project]);
  console.log(comment);

  const handleComment = async () => {
      try {
          await axios.post(`http://localhost:8000/comments/responsable/${id_person}/${id_project}`, {
              id_person,
              id_project,
              comment
          });
      } catch (error) {
          console.error('Full error object:', error);
          const errorMessage = error.response ? error.response.data.message : error.message;
          throw new Error(`An error has occurred: ${errorMessage}`);
      }
  };

  const handleUpdate = async () => {
      try {
          const dynamicURI = `http://localhost:8000/projects/update/${id_project}`;
          const statusPosterValue = switchPdf ? 'aprobado' : 'rechazado';
          const statusVideoValue = switchVideo ? 'aprobado' : 'rechazado';
          const statusTotal = (switchPdf && switchVideo) ? 'aprobado' : 'rechazado';
          await axios.put(dynamicURI, {
              statusPoster: statusPosterValue,
              statusVideo: statusVideoValue,
              statusGeneral: statusTotal
          });
          navigate('/principal-profesor');
      } catch (error) {
          console.error('Error al actualizar:', error);
      }
  };

  const handleSubmit = (event) => {
      if (event) {
          event.preventDefault();
      }

      const form = event ? event.target : null;
      if (form && form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
      } else {
          handleComment();
          handleUpdate();
      }
      setValidated(true);
  };

  const toggleShowFullText = () => {
      setShowFullText(!showFullText);
  };

  const truncatedText = (text, limit) => {
      if (!text || typeof text !== 'string' || text.length <= limit) {
          return text;
      }
      return text.slice(0, limit) + '...';
  };

  return (
      <>
          <ToggleBar />
          <div className='container-fluid'>
              <div className='row'>
                  <div className="col-md-1"></div>
                  <ProjResume type={project.category.title} area={project.area.name} title={project.title} IsLoaded={IsLoaded}></ProjResume>
                  <InfoProj lead={project.student.name + " " + project.student.lastName} members={project.team.students} IsLoaded={IsLoaded} status={project.statusGeneral}></InfoProj>
                  <div className="col-md-1"></div>
              </div>

              <Form noValidate validated={validated}>
                  <div className='row m-2 align-items-center'>
                      <div className="col-md-1"></div>
                      <div className='col-12 col-md-10'>
                          <div className="Infologo m-auto p-4">
                              <div className='row'>
                                  <div className='col-12 col-md-8'>
                                      <div className="row d-flex">
                                          <h1 className="Titulologo text-break">Archivos del proyecto</h1>
                                      </div>
                                      <div className='container-fluid'>
                                          <div className="row d-flex">
                                              <div className='col-12 col-md-6 justify-content-center align-items-center'>
                                                  {IsLoaded && (
                                                      <a href={project.linkPoster} className="file"><i className="bi bi-filetype-pdf icono" id="logo"></i></a>
                                                  )}
                                                  {!IsLoaded && (
                                                      <div className='d-flex align-items-center justify-content-center'>
                                                          <Spinner animation="grow" size="xl" className='BolitasIconos' />
                                                      </div>
                                                  )}
                                                  <div className='row d-flex m-2 check mt-5'>
                                                      <div className='col-md-6'>
                                                          <center>
                                                              <Form.Group as={Col} md="12" controlId="validationCustom06" className='ChecksPosition'>
                                                                  <center>
                                                                      <Form.Check type="switch" id='switchExternos1' label={switchPdf ? "Aceptado" : "Rechazado"} onChange={() => setSwitchPdf(!switchPdf)}></Form.Check>
                                                                  </center>
                                                              </Form.Group>
                                                          </center>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className='col-12 col-md-6 justify-content-center align-items-center'>
                                                  {IsLoaded && (
                                                      <a href={project.linkVideo} className="file"><i className="bi bi-youtube icono" id="logo"></i></a>
                                                  )}
                                                  {!IsLoaded && (
                                                      <div className='d-flex align-items-center justify-content-center'>
                                                          <Spinner animation="grow" size="xl" className='BolitasIconos' />
                                                      </div>
                                                  )}
                                                  <div className='row d-flex m-2 check mt-5 '>
                                                      <div className='col-6  col-md-6 justify-content-center'>
                                                          <center>
                                                              <Form.Group as={Col} md="12" controlId="validationCustom04" className='ChecksPosition'>
                                                                  <center>
                                                                      <Form.Check type="switch" id='switchExternos2' label={switchVideo ? "Aceptado" : "Rechazado"} onChange={() => setSwitchVideo(!switchVideo)}></Form.Check>
                                                                  </center>
                                                              </Form.Group>
                                                          </center>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <div className='col-12 col-md-4'>
                                      <div className="row d-flex">
                                          <h1 className="Titulologo text-break">Descripcion del proyecto</h1>
                                      </div>
                                      <div className="row d-flex contenedorDecripcionprofesor">
                                          {IsLoaded ? (
                                              <span onClick={toggleShowFullText} className=''>
                                                  {showFullText ? project.description : truncatedText(project.description, 368)}
                                              </span>
                                          ) : (
                                              <Placeholder animation="glow" className="w-100">
                                                  <Placeholder xs={12} size="xs" />
                                                  <Placeholder xs={12} size="xs" />
                                                  <Placeholder xs={12} size="xs" />
                                                  <Placeholder xs={12} size="xs" />
                                                  <Placeholder xs={12} size="xs" />
                                                  <Placeholder xs={12} size="xs" />
                                                  <Placeholder xs={12} size="xs" />
                                                  <Placeholder xs={12} size="xs" />
                                              </Placeholder>
                                          )}
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="col-md-1"></div>
                  </div>
                  <div className='row m-2 justify-content-between'>
                      <div className="col-md-1"></div>
                      <div className='col-12 col-md-10'>
                          <div className="Infologo m-auto p-4">
                              <div className='container-fluid'>
                                  <div className='row align-items-center'>
                                      <div className="col-md-12">
                                          <h1 className="Titulo text-break">Comentarios del profesor </h1>
                                          <div className='container-fluid p-1'>
                                              <Form.Control as="textarea" rows="5" id="comentarioProfe" value={comment} onChange={(e) => setComment(e.target.value)} />
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="col-md-1"></div>
                  </div>
                  <div className='row m-3 justify-content-between'>
                      <div className='col-md-4'></div>
                      <div className="col-md-2 centered-container2">
                          <Usure Path={'/principal-profesor'} className={"custom-btn"} Texto={"Guardar"}
                              MensajeTitle={'¿Estás seguro que quieres confirmar la autorización del proyecto?'}
                              BotonA={'Cancelar'}
                              BotonB={'Aceptar'}
                              onConfirm={handleSubmit} />
                      </div>
                      <div className='col-md-4'></div>
                  </div>
              </Form>
          </div>
      </>
  );
}