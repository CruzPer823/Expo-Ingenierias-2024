import './Actual.css';
import Menu from '../../../Components/Menu/menu.js';
import { useState,useEffect } from 'react';

import CardConcept from '../../../img/CardConcept.png';
import CardProto from '../../../img/CardProto.png';
import CardFinish from '../../../img/CardFinish.png';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Modal from 'react-bootstrap/Modal';

const URL = 'http://localhost:8000/projects/catalogue';

function MemberCont({NombreMiembro}){
    return(
      <li className="Texto text-wrap mb-0">{NombreMiembro}</li>
    );
  }

function MyVerticallyCenteredModal({ TitleDetailed, DescriptionDetailed, StudentDetailed,TeacherDetailed, MembersDetailed, AssesorsDetailed, DriveLink, YoutubeLink,members, ...props }) {
const { CategoCheckModal } = props;

return (
    <Modal
    {...props}
    size="xl"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className='Titulo123'>
            {TitleDetailed}
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <div className='container-fluid scroll-container1'>
            <div className='row'>
                {CategoCheckModal === "Concepto" && (
                    <div className='col p-3 m-2 ConceptDetailedImage'>

                    </div>
                )}

                {CategoCheckModal === "Prototipo" && (
                    <div className='col p-3 m-2 ProtoDetailedImage'>

                    </div>
                )}

                {CategoCheckModal === "Prototipo finalizado" && (
                    <div className='col p-3 m-2 FinishDetailedImage'>

                    </div>
                )}

                <div className='col-3 p-3 m-2 ContDetails'>
                    <div className='container-fluid'>
                        < div className='row'>
                            <div className='col'>
                                <p className='Titulo123'>Lider del equipo: </p> <span>{StudentDetailed}</span>
                            </div>
                        </div>
                        < div className='row mt-3'>
                            <div className='col'>
                                <p className='Titulo123'>Miembros del equipo: </p> <span>
                                {MembersDetailed.map((item,index) => (
                                    <MemberCont NombreMiembro={item.name + " " + item.lastName} />
                                ))}
                                    </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-3 p-3 m-2 ContDetails'>
                <div className='container-fluid'>
                        < div className='row'>
                            <div className='col'>
                                <p className='Titulo123'>Profesor lider: </p> <span>{TeacherDetailed}</span>
                            </div>
                        </div>
                        < div className='row mt-3'>
                            <div className='col'>
                                <p className='Titulo123'>Profesores asesores: </p> <span>
                                    {AssesorsDetailed.map((item,index) => (
                                        <MemberCont NombreMiembro={item.name + " " + item.lastName} />
                                    ))}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='row p-2'>
                <div className='col p-4 ContDetails'>
                    <div className='container-fluid'>

                        <div className='row'>
                            <div className='col'>
                                <h4 className='Titulo123'>Descripción del proyecto</h4>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col'>
                                <span className='TextoCardWrap'>{DescriptionDetailed}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row p-2'>
                <div className='col p-2 ContDetails'>
                    <div className='container-fluid '>
                        <div className='row'>
                            <div className='col p-1 m-2 '>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col text-center'>
                                            <a href={DriveLink}><i className='bi bi-filetype-pdf ModalIconsCurrent'></i></a>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col text-center'>
                                            <span className='Subtitulo'>Ver el cartel del proyecto</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='col p-1 m-2'>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col text-center'>
                                            <a href={YoutubeLink}><i className='bi bi-youtube ModalIconsCurrent'></i></a>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col text-center'>
                                            <span className='Subtitulo'>Ver el video explicativo del video</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Modal.Body>
    <Modal.Footer>
        <Button onClick={props.onHide} className='ButtonColors123'>Cerrar</Button>
    </Modal.Footer>
    </Modal>
);
}

function ButtonModal({ CategoCheckButton, TitleDetailed, DescriptionDetailed, Student, Members,Teacher, Assesors }) {
    const [modalShow, setModalShow] = useState(false);
  
    return (
      <>
        <Button className='ButtonColors' onClick={() => setModalShow(true)}>
          Ver proyecto
        </Button>
  
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          CategoCheckModal={CategoCheckButton}
          TitleDetailed={TitleDetailed}
          StudentDetailed={Student.name + " " + Student.lastName}
          DescriptionDetailed={DescriptionDetailed}
          TeacherDetailed={Teacher.name + " " + Teacher.lastName}

          MembersDetailed={Members}

          AssesorsDetailed={Assesors}

          DriveLink={'http://google.com'}
          YoutubeLink={'http://youtube.com'}
        />
      </>
    );
  }
  


function CardProj({ CategoCheck, Title, Description, Student,Members,Teacher, Assesors }) {
    const truncatedText = (text, limit) => {
        if (!text || typeof text !== 'string' || text.length <= limit) {
          return text;
        }
        return text.slice(0, limit) + '...';
      };
    
    
    return (
    <div className='col p-3'>
        {CategoCheck === "Concepto" && (
            <Card style={{ width: '18rem', height: '100%' }} className='CardsInfoContainer'>
                <Card.Img variant="top" src={CardConcept} className='FotoCard' />
                <Card.Body>
                <Card.Title className='Titulo123 text-wrap'>{Title}</Card.Title>
                <Card.Text className='TextoCardWrap'>{truncatedText(Description,125)}</Card.Text>
                <center>
                    <ButtonModal CategoCheckButton={CategoCheck} TitleDetailed={Title} DescriptionDetailed={Description} Student={Student} Members={Members} Teacher={Teacher} Assesors={Assesors}>Ver proyecto</ButtonModal>
                </center>
                </Card.Body>
            </Card>
        )}

        {CategoCheck === "Prototipo" && (
            <Card style={{ width: '18rem' , height: '100%' }} className='CardsInfoContainer'>
                <Card.Img variant="top" src={CardProto} className='FotoCard' />
                <Card.Body>
                <Card.Title className='Titulo123 text-wrap'>{Title}</Card.Title>
                <Card.Text className='TextoCardWrap'>{truncatedText(Description,125)}</Card.Text>
                <center>
                    <ButtonModal CategoCheckButton={CategoCheck} TitleDetailed={Title} DescriptionDetailed={Description} Student={Student} Members={Members} Teacher={Teacher} Assesors={Assesors}>Ver proyecto</ButtonModal>
                </center>
                </Card.Body>
            </Card>
        )}

        {CategoCheck === "Prototipo finalizado" && (
            <Card style={{ width: '18rem', height: '100%' }} className='CardsInfoContainer'>
                <Card.Img variant="top" src={CardFinish} className='FotoCard' />
                <Card.Body>
                <Card.Title className='Titulo123 text-wrap'>{Title}</Card.Title>
                <Card.Text className='TextoCardWrap'>{truncatedText(Description,125)}</Card.Text>
                
                <center>
                    <ButtonModal CategoCheckButton={CategoCheck} TitleDetailed={Title} DescriptionDetailed={Description} Student={Student} Members={Members} Teacher={Teacher} Assesors={Assesors}>Ver proyecto</ButtonModal>
                </center>
                </Card.Body>
            </Card>
        )}


    </div>  
    );
}

export default function Actual() {

    const [nexusProjects, setNexusProjects] = useState([]);
    const [nanoProjects, setNanoProjects] = useState([]);
    const [bioProjects, setBioProjects] = useState([]);
    const [cyberProjects, setCyberProjects] = useState([]);

    
    
      useEffect(()=>{
        fetch(URL)
        .then((res)=> res.json())
        .then((data) => {

            //Nexus
            const nexusArea = data.find((area) => area.name === 'Nexus');
            const projectsNexus = nexusArea ? nexusArea.projects : [];
            setNexusProjects(projectsNexus);

            //Nano
            const nanoArea = data.find((area) => area.name === 'Nano');
            const projectsNano = nanoArea ? nanoArea.projects : [];
            setNanoProjects(projectsNano);

            //Bio
            const bioArea = data.find((area) => area.name === 'Bio');
            const projectsBio = bioArea ? bioArea.projects : [];
            setBioProjects(projectsBio);

            //Cyber
            const cyberArea = data.find((area) => area.name === 'Cyber');
            const projectsCyber = cyberArea ? cyberArea.projects : [];
            setCyberProjects(projectsCyber);



        })
      },[])
    

    return (
      <>
        <Menu />
        <div className='container-fluid'>
            <div className='row m-4 p-3 CardsContainer'>
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <h3 className='Titulo123'>Bienvenido a los proyectos actuales</h3>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <p className='Texto'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec purus ut nunc molestie rhoncus. Quisque et facilisis elit. Aliquam in ante rhoncus, fermentum diam vel, efficitur neque. Nam sapien nulla, sodales et massa sed, luctus tincidunt mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent eget egestas nibh, vel rhoncus mi. Mauris volutpat eu nisi nec molestie. Etiam non leo tortor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla dolor augue, faucibus in ex a, vehicula rutrum tortor. Aenean tempus ligula eget sem tempus finibus. Duis sit amet velit interdum, vulputate sem et, vestibulum magna. Nullam suscipit enim sapien, at accumsan tellus gravida nec. Proin lectus dui, faucibus finibus metus quis, pulvinar dapibus mauris. Donec vehicula nisi vel viverra malesuada.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row m-4 p-3 CardsContainer'>

                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col'>
                            <h3 className='Titulo123'>Nano</h3>
                        </div>
                    </div>

                    <div className='row scroll-container'>
                        <div className='col'>
                            <div className="d-flex flex-nowrap">
                                {nanoProjects.map((item,index) => (
                                    <CardProj CategoCheck={item.category.title} Title={item.title} Description={item.description} Student={item.student} Members={item.team.students}  Teacher={item.Lider} Assesors={item.Asesores}/>
                                ))}
                            </div>                  
                        </div>
                    </div>
                </div>

            </div>
  
            <div className='row m-4 p-3 CardsContainer'>

                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col'>
                            <h3 className='Titulo123'>Nexus</h3>
                        </div>
                    </div>

                    <div className='row scroll-container'>
                        <div className='col'>
                            <div className="d-flex flex-nowrap">
                                {nexusProjects.map((item,index) => (
                                    <CardProj CategoCheck={item.category.title} Title={item.title} Description={item.description} Student={item.student} Members={item.team.students} Teacher={item.Lider} Assesors={item.Asesores}/>
                                ))}
                            </div>                  
                        </div>
                    </div>
                </div>

            </div>
  
            <div className='row m-4 p-3 CardsContainer'>

                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col'>
                            <h3 className='Titulo123'>Bio</h3>
                        </div>
                    </div>

                    <div className='row scroll-container'>
                        <div className='col'>
                            <div className="d-flex flex-nowrap">
                                {bioProjects.map((item,index) => (
                                    <CardProj CategoCheck={item.category.title} Title={item.title} Description={item.description} Student={item.student}  Members={item.team.students}  Teacher={item.Lider} Assesors={item.Asesores}/>
                                ))}
                            </div>                  
                        </div>
                    </div>
                </div>

            </div>

            <div className='row m-4 p-3 CardsContainer'>

                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col'>
                            <h3 className='Titulo123'>Cyber</h3>
                        </div>
                    </div>

                    <div className='row scroll-container'>
                        <div className='col'>
                            <div className="d-flex flex-nowrap">
                                {cyberProjects.map((item,index) => (
                                    <CardProj CategoCheck={item.category.title} Title={item.title} Description={item.description} Student={item.student} Members={item.team.students}  Teacher={item.Lider} Assesors={item.Asesores} />
                                ))}
                            </div>                  
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </>
    );
  }