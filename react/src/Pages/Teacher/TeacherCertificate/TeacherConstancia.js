import '../../Student/ProjectSelection/Juez.css';
import '../../Student/ProjectSelection/Badge.css';
import { jsPDF } from "jspdf";
import { useAuth0 } from '@auth0/auth0-react';
import React, { useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import './TeacherConstancia.css';
import logo from '../../../img/logo-certificado.png';
import ToggleBar from '../../../Components/Togglebar/togglebar.js';
import firma from '../../../img/firma-ejemplo.jpg';

function tieneInformacion(variable) {
    if (variable === null || variable === undefined || Object.keys(variable).length === 0 ) {
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

function CardCalif() {
    const [user_bs, setUser_bs] = useState({
        id: "",
        name: "",
        lastName: "",
        email: "",
    })
    const {id_user} = useParams();
    useEffect(() => {
        //nuevodescr120T
        //http://localhost:8000/projects/responsable/${user.sub}
        fetch(`http://localhost:8000/person/resume/auth0|6653d38ae957844eac7c9f99`)
          .then((res) => res.json())
          .then((data)=>setUser_bs(data))
        
        },[id_user])
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
        doc.text(user_bs.name, 20, 95);
        doc.setFontSize(14);
        doc.setFont('times', 'normal');
        doc.text(`por su destacada participación y valioso aporte como Profesor Encargado en el`, 20, 110);
        doc.text('evento Expoingeniería - Edición Junio 2024.Durante el evento, celebrado en el',20,120);
        doc.text('mes de junio de 2024, su liderazgo, dedicación y compromiso fueron fundamentales',20,130);
        doc.text('para el desarrollo exitoso del proyecto. Su capacidad para guiar y motivar al ',20,140)
        doc.text('equipo de estudiantes ha dejado una huella imborrable en sus carreras académicas', 20,150);
        doc.text('y profesionales. Su habilidad para fomentar un ambiente de aprendizaje colaborativo ',20,160);
        doc.text('y su constante disposición para compartir su sabiduría han sido clave para el ',20,170);
        doc.text('logro de los objetivos planteados.',20,180);
        doc.text('Dado en Puebla, el 17 de junio de 2024.', 20, 190);
        doc.text('Jose Manuel Medina Pozos',20,260);
        const img = new Image();
        img.src = logo;
        const img1 = new Image();
        img1.src = firma;
        img.onload = function() {
            doc.addImage(img, 'PNG', 70, 10, 70, 50); // x, y, width, height
            doc.addImage(img1,'JPG',20,220,30,30);
            doc.save(`${user_bs.name}-certificate.pdf`);
        }
        img.onerror = function() {
            console.error('Error loading image');
          };
        

      }
      

    return (
        <>
            {!tieneInformacion(user_bs) && (
                <div className='container-fluid p-3'>
                    <center>
                        <div className='row p-3 m-3 NoProjContainer'>
                            <div className='col p-3'>
                                <p className='mb-0 fw-bold'>Aún no puedes visualizar o descargar las constancias que hayas adquirido durante el evento. Espera a que acabe el evento y vuelve a esta pestaña para descargar tus constancias.</p>
                            </div>
                        </div>
                    </center>
                </div>        
            )}

            {tieneInformacion(user_bs) && (
                <div className='col-auto p-3'>

                    <div className="card cardconst mb-1 me-0">
                        <div className="imag ConstanciaCardPhoto">
                                    
                        </div>

                        <div className="text constanciastextsirveporfa">
                            <center><span className='fw-bolder'>Esta constancia es valida para:</span></center>
                            <center><p>{user_bs.name + " " +user_bs.lastName}</p></center>
                            <button className="btn23" onClick={handleOnClick}>Descargar Constancia</button>    
                        </div>
                    </div>
                </div>        
            )}                          
        </>
    );
  }
  


export default function ProjSelection({ConstCheck}){
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

                {ConstCheck === "False" && (
                    <>
                        <div className='container-fluid  p-3'>
                            <center>
                                <div className='row p-3 m-3 NoProjContainer'>
                                    <div className='col p-3'>
                                        <p className='mb-0 fw-bold'>Aun no puedes visualizar o descargar las constancias que hayas adquirido durante el evento. Espera a que acabe el evento y vuelve a esta pestaña para descargar tus constancias.</p>
                                    </div>
                                </div>
                            </center>

                        </div>
                    </>

                )}

                {ConstCheck === "True" && (

                    <div className='row d-flex flex-col justify-content-evenly'>
                        <CardCalif/>
                    </div>       

                )}
            </div>        
        </>

    );
}