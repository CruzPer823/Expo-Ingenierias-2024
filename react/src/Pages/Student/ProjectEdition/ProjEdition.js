
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

import { Link } from 'react-router-dom';

import Usure from '../../../Components/BotonConfirmacion/ConfBot'

import "./ProjEdition.css"

import ToggleBarStudent from '../../../Components/TogglebarStudent/togglebarStudent.js';

import Popup from '../../../Components/Popup/Popup.js';

const URI = 'http://localhost:8000/projects/editionProject/'



export default function ProjRegisterCont(){
    return (
        <>
        <ToggleBarStudent NameSection={"Edición de proyecto"} />
        <div className='container w-50 mt-4 mb-4 bg-white ContenedorForm'>
            <div className='row p-2'>
                <div className='col p-4'>
                    <FormExample />
                </div>
            </div>
        </div>
        </>
    );
}

function FormExample() {
    const [validated, setValidated] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [linkPoster, setLinkPoster] = useState("");
    const [linkVideo, setLinkVideo] = useState("")

    const {id_project} = useParams();

    const [content, setContent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState(false);

  
    const handleSubmit = async (event) => {
        if (event) {
          event.preventDefault(); // Evita que el formulario se envíe automáticamente
        }
        
        const form = event ? event.target : null;
        if (form && form.checkValidity() === false) {
          event.stopPropagation();
        } else {
          console.log(title, description, linkPoster, linkVideo);
          try {
            setType(false);
            setContent("El proyecto ha sido actualizado correctamente");
            setShowModal(true);
            await axios.put(URI + id_project, {
              title: title,
              description: description,
              linkVideo: linkVideo,
              linkPoster: linkPoster
            });

        // Obtener el proyecto actualizado y enviar correo al profesor responsable
             const projectResponse = await axios.get(URI + id_project);
             const projectData = projectResponse.data;
 
             const professorResponse = await fetch(`http://localhost:8000/person/resume/${projectData.id_responsable}`);
             const professorData = await professorResponse.json();
             const professor = { name: professorData.name, lastName: professorData.lastName };

             const templateParams = {
               nombreProfesor: `${professor.name} ${professor.lastName}`,
               tituloProyecto: title,
               studentEmail: professorData.email,
             };
 
             await axios.post('http://localhost:8000/send-email', {
               templateName: 'change',
               templateParams
             });  


          } catch (e) {
            console.log(e);
            setType(true);
            setContent("El proyecto no se he podido actualizar");
            setShowModal(true);
          }
        }
        
        setValidated(true);
      };
      
      
   
    useEffect(()=>{
        //fetch('http://localhost:8000/projects/'+id_post)
        fetch(URI+id_project)
        .then((res)=> res.json())
        .then((data)=>{
            setTitle(data.title);
            setDescription(data.description);
            setLinkPoster(data.linkPoster);
            setLinkVideo(data.linkVideo);   
        })
    },[id_project])
    


    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>

                <Row className="mb-3  ">

                    <Form.Group as={Col} md="12" controlId="validationCustom06">

                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col'>
                                <Form.Label className='Titulo ps-2'>Titulo del proyecto</Form.Label>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col'>
                                    <Form.Control
                                        required
                                        value={title}
                                        onChange={(e)=> setTitle(e.target.value)}
                                        type="text"
                                        placeholder="Ingresa un titulo para tu proyecto"
                                        className='InputFormat'
                                    />
                                </div>
                            </div>
                        </div> 
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group  controlId="exampleForm.ControlTextarea1">
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col p-0'>
                                    <Form.Label className='Titulo'>Descripción del proyecto</Form.Label>

                                </div>
                            </div>

                            <div className='row '>
                                <div className='col '>
                                    <Form.Control as="textarea" className='InputDescrFormat' rows={5} required 
                                    value={description}
                                    onChange={(e)=> setDescription(e.target.value)} />
                                </div>
                            </div>
                        </div>

                    </Form.Group>
                </Row>

                <Row className="mb-3">

                    <Form.Group as={Col} md="12" controlId="validationCustom06">

                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col'>
                                    <Form.Label className='Titulo ps-2'>Poster(PDF)</Form.Label>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col'>
                                    <Form.Control
                                    required
                                    value={linkPoster}
                                    onChange={(e)=> setLinkPoster(e.target.value)}
                                    type="text"
                                    placeholder="Link de tu carpeta de drive"
                                    className='InputFormat'
                                    />            
                                </div>
                            </div>
                        </div>

                    </Form.Group>
                </Row>

                <Row className="mb-3  ">

                    <Form.Group as={Col} md="12" controlId="validationCustom06">

                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col'>
                                    <Form.Label className='Titulo ps-2'>Link video</Form.Label>
                                </div>
                            </div>


                            <div className='row'>
                                <div className='col'>
                                    <Form.Control
                                    required
                                    value={linkVideo}
                                    onChange={(e)=> setLinkVideo(e.target.value)}
                                    type="text"
                                    placeholder="Link de youtube"
                                    className='InputFormat'
                                    />                
                                </div>
                            </div>            
                        </div>
                    </Form.Group>
                </Row>


                <center><Usure MensajeTitle={"¿Estas de acuerdo con los cambios?"} BotonA={"Regresar"} BotonB={"Aceptar cambios"} className={"ButtonRegister mt-3 btn-lg"} Path={'/resumen-proyecto-estudiante/' + id_project} Texto={"Aceptar cambios"} onConfirm={handleSubmit}/></center>

                {/*<center><Button type="submit" className='mt-4 btn-lg ButtonRegister'>Registrar proyecto</Button></center> */}

            </Form> 
            
            <div className='container-fluid mb-4'>
                    <div className='row'>
                        <div className='col'>
                            <Link to={'/resumen-proyecto-estudiante/' + id_project} className='bi bi-arrow-left-circle IconBack'> Regresar</Link>
                        </div>
                    </div>
            </div>

            {showModal && <Popup content={content} onClose={()=>setShowModal(false)} error={type} ruta={'/resumen-proyecto-estudiante/' + id_project}/>}      

        </>
    );
}
