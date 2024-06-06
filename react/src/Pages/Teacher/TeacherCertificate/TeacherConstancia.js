import '../../Student/ProjectSelection/Badge.css';
import { jsPDF } from "jspdf";
import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from "react";
import ToggleBar from '../../../Components/Togglebar/togglebar.js';
import logo from '../../../img/logo-certificado.png';
import firma from '../../../img/firma-ejemplo.jpg';
import './TeacherConstancia.css';

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

function CardCalif({ name, namecomplete }) {
    const doc = new jsPDF();
    const handleOnClick = async () => {
        doc.setFontSize(22);
        doc.setFont('times', 'bold');
        doc.text('Certificado de Participación en Expoingenieria', 20, 70);
        doc.setFontSize(16);
        doc.setFont('times', 'normal');
        doc.text(`Se otorga el presente certificado a`, 20, 80);
        doc.setFontSize(20);
        doc.setFont('times', 'bold');
        doc.text(namecomplete, 20, 95);
        doc.setFontSize(14);
        doc.setFont('times', 'normal');
        doc.text(`por su destacada participación y valioso aporte como Profesor Encargado en el`, 20, 110);
        doc.text('evento Expoingeniería - Edición Junio 2024. Durante el evento, celebrado en el', 20, 120);
        doc.text('mes de junio de 2024, su liderazgo, dedicación y compromiso fueron fundamentales', 20, 130);
        doc.text('para el desarrollo exitoso del proyecto. Su capacidad para guiar y motivar al ', 20, 140);
        doc.text('equipo de estudiantes ha dejado una huella imborrable en sus carreras académicas', 20, 150);
        doc.text('y profesionales. Su habilidad para fomentar un ambiente de aprendizaje colaborativo ', 20, 160);
        doc.text('y su constante disposición para compartir su sabiduría han sido clave para el ', 20, 170);
        doc.text('logro de los objetivos planteados.', 20, 180);
        doc.text('Dado en Puebla, el 17 de junio de 2024.', 20, 190);
        doc.text('Jose Manuel Medina Pozos', 20, 260);
        const img = new Image();
        img.src = logo;
        const img1 = new Image();
        img1.src = firma;
        img.onload = function () {
            doc.addImage(img, 'PNG', 60, 10, 90, 50); // x, y, width, height
            doc.addImage(img1, 'JPG', 20, 220, 30, 30);
            doc.save(`${name}-certificate.pdf`);
        }
        img.onerror = function () {
            console.error('Error loading image');
        };
    }

    return (
        <div className='col-auto p-3'>
            <div className="card cardconst mb-1 me-0">
                <div className="imagConstancias ConstanciaCardPhoto"></div>
                <div className="text constanciastextsirveporfa">
                    <center><span className='fw-bolder'>Esta constancia es valida para:</span></center>
                    <center><p>{namecomplete}</p></center>
                    <button className="btn23" onClick={handleOnClick}>Descargar Constancia</button>
                </div>
            </div>
        </div>
    );
}

function CardJuez({ name, namecomplete }) {
    const doc = new jsPDF();
    const handleOnClick = async () => {
        doc.setFontSize(22);
        doc.setFont('times', 'bold');
        doc.text('Certificado de Evaluación en Expoingenieria', 20, 70);
        doc.setFontSize(16);
        doc.setFont('times', 'normal');
        doc.text(`Se otorga el presente certificado a`, 20, 80);
        doc.setFontSize(20);
        doc.setFont('times', 'bold');
        doc.text(namecomplete, 20, 95);
        doc.setFontSize(14);
        doc.setFont('times', 'normal');
        doc.text(`por su valiosa participación y dedicación como Juez Evaluador en el`, 20, 110);
        doc.text('evento Expoingeniería - Edición Junio 2024. Durante el evento, celebrado en el', 20, 120);
        doc.text('mes de junio de 2024, su experiencia y criterio han sido fundamentales para la', 20, 130);
        doc.text('evaluación y selección de los mejores proyectos. Su compromiso y', 20, 140);
        doc.text('profesionalismo han contribuido significativamente al éxito del evento.', 20, 150);
        doc.text('Dado en Puebla, el 17 de junio de 2024.', 20, 190);
        doc.text('Jose Manuel Medina Pozos', 20, 260);
        const img = new Image();
        img.src = logo;
        const img1 = new Image();
        img1.src = firma;
        img.onload = function () {
            doc.addImage(img, 'PNG', 60, 10, 90, 50); // x, y, width, height
            doc.addImage(img1, 'JPG', 20, 220, 30, 30);
            doc.save(`${name}-certificate.pdf`);
        }
        img.onerror = function () {
            console.error('Error loading image');
        };
    }

    return (
        <div className='col-auto p-3'>
            <div className="card cardconst mb-1 me-0">
                <div className="imagConstancias ConstanciaCardPhoto"></div>
                <div className="text constanciastextsirveporfa">
                    <center><span className='fw-bolder'>Esta constancia de Juez es valida para: </span></center>
                    <center><p>{namecomplete}</p></center>
                    <button className="btn23" onClick={handleOnClick}>Descargar Constancia</button>
                </div>
            </div>
        </div>
    );
}export default function ProjSelection(){
    const [ConstCheck, setConstCheck] = useState(true);
    const [user_bs, setUser_bs] = useState({
        id: "",
        name: "",
        lastName: "",
        email: "",
    })
    const [projects,setProjects] = useState([]);
    const [commentsCount, setCommentsCount] = useState(0);
    const [judgeProjectsCount, setJudgeProjectsCount] = useState(0);
    const { user } = useAuth0();
    console.log(user.sub);
    useEffect(() => {
        if (user && user.sub) {
            async function fetchData() {
                try {
                    const [projectsResponse, userResponse, judgeProjectsResponse, commentsResponse] = await Promise.all([
                        fetch(`http://localhost:8000/projects/responsable/${user.sub}`).then(res => res.json()),
                        fetch(`http://localhost:8000/person/resume/${user.sub}`).then(res => res.json()),
                        fetch(`http://localhost:8000/judgeProjects/fetchJudgeProject/${user.sub}`).then(res => res.json()),
                        fetch(`http://localhost:8000/jcomments/fetchComment/${user.sub}`).then(res => res.json())
                    ]);
                    setProjects(projectsResponse);
                    setUser_bs(userResponse);
                    setJudgeProjectsCount(judgeProjectsResponse.length);
                    setCommentsCount(commentsResponse.length);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    // Manejar el error aquí si es necesario
                }
            }
            fetchData();
        }
    }, [user]);
    
    useEffect(() => {
        let hasRevision = projects.some(project => project.statusGeneral === "en revision");
        setConstCheck(!hasRevision);
    }, [projects]);
    return(
        <>
            <ToggleBar NameSecProf={"Constancias"}></ToggleBar>
            <div className='container-fluid centered-containerProjSelc'>
                <div className='row m-4 p-3 TitleSelectContainer'>
                    <div className='col '>
                        <h1 className='TituloProjSEL text-center'>Constancias recibidas</h1>
                    </div>
                </div>
            </div>

            <div className='container-fluid'>
                {!ConstCheck && (
                    <div className='container-fluid  p-3'>
                        <center>
                            <div className='row p-3 m-3 NoProjContainer'>
                                <div className='col p-3'>
                                    <p className='mb-0 fw-bold'>Aun no puedes visualizar o descargar las constancias que hayas adquirido durante el evento. Espera a que acabe el evento y vuelve a esta pestaña para descargar tus constancias.</p>
                                </div>
                            </div>
                        </center>
                    </div>
                )}

                {ConstCheck && (
                    <div className='row d-flex flex-col justify-content-evenly'>
                        <CardCalif name={user_bs.name} namecomplete={user_bs.name + ' ' + user_bs.lastName} />
                    </div>       
                )}
                {judgeProjectsCount === commentsCount && (
                    <div className='row d-flex flex-col justify-content-evenly'>
                            <CardJuez name={user_bs.name} namecomplete={user_bs.name + ' ' + user_bs.lastName} />
                    </div>
                )}
            </div>        
        </>
    );
}
