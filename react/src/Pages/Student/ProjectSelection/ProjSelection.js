import { Link } from 'react-router-dom';
import Badge from './Badge';
import './ProjSelectionJuez.css';
import './Badge.css';
import './ProjSelection.css';
import StudentToggle from '../../../Components/TogglebarStudent/togglebarStudent.js';
import BotonElim from '../../../Components/BotonConfirmacion/ConfBot.js';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAuth0 } from '@auth0/auth0-react';
import Popup from '../../../Components/Popup/PopUpElim.js';

const URL = 'http://localhost:8000/projects/resumeProject/';

function MenuProyectos({ id_path, setShowModal, setContent, setType }) {
    const icono = <i className='bi bi-trash-fill'> Eliminar proyecto</i>;

    const [validated, setValidated] = useState(false);
    

    const handleSubmit = async (event, id) => {
        if (event) {
            event.preventDefault();
        }

        const form = event ? event.target : null;
        if (form && form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            try {
                await axios.delete(URL + id);
                setType(false);
                setContent("El proyecto se ha borrado exitosamente");
                setShowModal(true);
            } catch (e) {
                console.log(e);
                setType(true);
                setContent("El proyecto no se ha podido borrar");
                setShowModal(true);
            }
        }
        setValidated(true);
    };

    return (
        <>
            <Dropdown data-bs-theme="dark">
                <Dropdown.Toggle className='BotonDropDownSelect fw-bolder' id="dropdown-basic">
                    Opciones
                </Dropdown.Toggle>

                <Dropdown.Menu className='MenuDropPersonali'>
                    <Dropdown.Item href="#/action-1" className='m-2'>
                        <BotonElim
                            MensajeTitle={"¿Deseas eliminar este proyecto?"}
                            BotonA={'Cancelar'}
                            BotonB={'Eliminar'}
                            className={"ButtonEliminar"}
                            Texto={icono}
                            onConfirm={(event) => handleSubmit(event, id_path)}
                        ></BotonElim>
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2" className='m-2'>
                        <Link to={'/extramaterial/' + id_path} className='ButtonAddMaterial bi-wrench-adjustable-circle'>
                            Actualizar lista de materiales
                        </Link>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
}

function CardCalif({ projects, isLoading, setShowModal, setContent, setType }) {
    const truncateText = (text, limit) => {
        if (!text || typeof text !== 'string' || text.length <= limit) {
            return text;
        }
        return text.slice(0, limit) + '...';
    };

    if (isLoading) {
        return (
            <div className='col-12 mt-5 d-flex align-items-center justify-content-center'>
                <div className="semicircle">
                    <div>
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <div>
                                            <div>
                                                <div>
                                                    <div></div>
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
        );
    }

    return (
        <div className='col-12 d-flex flex-wrap align-items-center justify-content-evenly'>
            {projects.map((item) => (
                <div to={"/resumen-proyecto-estudiante/" + item.id} className="cardSelect card-container m-4 NoselecctionCard" key={item.id}>
                    {item.category.title === 'Concepto' && (
                        <Link to={"/resumen-proyecto-estudiante/" + item.id} className="imag algoimagConcept"></Link>
                    )}
                    {item.category.title === 'Prototipo' && (
                        <Link to={"/resumen-proyecto-estudiante/" + item.id} className="imag algoimagProto"></Link>
                    )}
                    {item.category.title === 'Prototipo finalizado' && (
                        <Link to={"/resumen-proyecto-estudiante/" + item.id} className="imag algoimagFinish"></Link>
                    )}
                    <Link to={"/resumen-proyecto-estudiante/" + item.id} className="text NoDecorateCard">
                        <p className="TituloProjSELCARD text-wrap mb-0">{truncateText(item.title, 55)}</p>
                        <p className="TextoTarjeta">{truncateText(item.description, 160)}</p>
                        <div className="badge-container w-100">
                            <Badge data={item.area.name} className="badgeselect d-flex text-wrap" />
                            <Badge data={item.id} className="badgeselect d-flex" />
                            {item.statusGeneral === "en revision" && (
                                <div className="badge-container">
                                    <div className="badgeselect d-flex">En revisión</div>
                                </div>
                            )}
                            {item.statusGeneral === "rechazado" && (
                                <div className="badge-container">
                                    <div className="badgeselect2">Rechazado</div>
                                </div>
                            )}
                            {item.statusGeneral === "aprobado" && (
                                <div className="badge-container">
                                    <div className="badgeselect3">Aceptado</div>
                                </div>
                            )}
                        </div>
                        <Link to={"/resumen-proyecto-estudiante/" + item.id} className="btn23">Ver Proyecto</Link>
                    </Link>
                    <div className="button-container">
                        <MenuProyectos
                            id_path={item.id}
                            setShowModal={setShowModal}
                            setContent={setContent}
                            setType={setType}
                        ></MenuProyectos>
                    </div>
                </div>
            ))}
        </div>
    );
}

function tieneInformacion(variable) {
    if (variable === null || variable === undefined || Object.keys(variable).length === 0) {
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

export default function ProjSelection() {
    const [isLoading, setIsLoading] = useState(true);
    const { isAuthenticated, isLoadingAuth, error, user } = useAuth0();
    const [projects, setProjects] = useState([]);
    const { id_student } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [content, setContent] = useState("");
    const [type, setType] = useState(false);

    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

    useEffect(() => {
        setIsLoading(true);
        fetch(URL + user.sub)
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching projects:", error);
                setIsLoading(false);
            });
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [id_student, user.sub]);

    return (
        <>
            <StudentToggle NameSection={"Mis proyectos"} />
            <div className='container-fluid '>
                {isLoading && (
                    <div className='col-12 mt-5 d-flex align-items-center justify-content-center'>
                        <div className="semicircle">
                            <div>
                                <div>
                                    <div>
                                        <div>
                                            <div>
                                                <div>
                                                    <div>
                                                        <div></div>
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
                {!isLoading && !tieneInformacion(projects) && (
                    <>
                        <div className='container-fluid centered-containerProjSelc'>
                            <div className='row m-4 p-3 TitleSelectContainer'>
                                <div className='col'>
                                    <h1 className='TituloProjSEL text-center'>Proyectos en los que participas</h1>
                                </div>
                            </div>
                        </div>
                        <div className='container-fluid p-3'>
                            <center>
                                <div className='row p-3 m-3 NoProjContainer'>
                                    <div className='col p-3'>
                                        <p className='mb-0'>
                                            Parece ser que aun no te encuentras registrado en ningun proyecto, puedes registrar un proyecto y así ser lider equipo o esperar a que el lider de tu equipo registre el proyecto.
                                        </p>
                                    </div>
                                </div>
                            </center>
                            <center>
                                <div className='row p-3 m-3 NoProjContainer'>
                                    <Link to={'/registro-proyecto'} className='col BotonRegistrar p-3'>
                                        Registra un proyecto nuevo
                                    </Link>
                                </div>
                            </center>
                        </div>
                    </>
                )}
                {!isLoading && tieneInformacion(projects) && (
                    <>
                        <div className='container-fluid'>
                            {isLargeScreen ? (
                                <div className='row'>
                                    <div className='col-2 mt-2 p-3'>
                                        <Link to={'/registro-proyecto'} className='bi bi-plus-square-fill NuevoRegister'></Link>
                                    </div>
                                    <div className='col-10 '>
                                        <center>
                                            <h1 className='TituloProjSEL p-3 mt-4 text-center TitleSelectContainerVF'>
                                                Proyectos en los que participas
                                            </h1>
                                        </center>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className='row'>
                                        <div className='col-12 '>
                                            <center>
                                                <h1 className='TituloProjSEL p-3 text-center TitleSelectContainerVF'>
                                                    Proyectos en los que participas
                                                </h1>
                                            </center>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className='row d-flex flex-col justify-content-evenly'>
                            <CardCalif 
                                projects={projects} 
                                isLoading={isLoading} 
                                setShowModal={setShowModal} 
                                setContent={setContent} 
                                setType={setType} 
                            />
                        </div>
                    </>
                )}
            </div>
            {showModal && <Popup content={content} onClose={() => setShowModal(false)} error={type} />}
        </>
    );
}
