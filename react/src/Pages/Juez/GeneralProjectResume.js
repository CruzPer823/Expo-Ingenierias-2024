import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import { Link, useParams } from 'react-router-dom';
import ToggleBar from '../../Components/Togglebar/togglebar';
import './Page.css';
import './Resume.css';
import React, { useState, useEffect } from 'react';
import Loader from '../../Components/Loader/Loader';
import { useAuth0 } from '@auth0/auth0-react';

function InfoProj({ lead, profLead, memeber }) {
  return (
    <div className='col-md-3 '>
      <div className="Info m-2 p-4">
        <h1 className="Titulo text-wrap ps-0">Información del proyecto</h1>
        <div className='container-fluid p-1'>
          <div className="row mb-1">
            <div className='col-md pe-0'>
              <span className="Subtitulo">Líder:</span>
              <p className="Texto text-wrap ps-3">{lead}</p>
            </div>
          </div>
          <div className="row mb-1">
            <div className='col-md pe-0'>
              <span className="Subtitulo">Profesor líder:</span>
              <p className="Texto text-wrap ps-3">{profLead}</p>
            </div>
          </div>
          <div className="row mb-1">
            <div className='col-md pe-0'>
              <span className="Subtitulo">Miembros del proyecto:</span>
              <p className="Texto text-wrap ps-3">{memeber}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjResume({ type, area, descr, title }) {
  const truncateText = (text, limit) => {
    if (!text || typeof text !== 'string' || text.length <= limit) {
      return text;
    }
    return text.slice(0, limit) + '...';
  };

  return (
    <div className='col-md-6 ps-4 pe-4 '>
      <div className="container-fluid BGResume  w-100 ">
        <div className="row p-1 BGBar">
          <div className="col proj-sub-bold text-start"><span className='gemelo'>Nivel de Desarrollo: {type}</span></div>
          <div className="col proj-sub-bold text-end"><span className='gemelo'>{area}</span></div>
        </div>
        <div className='m-4 p-0'>
          <div className="container-fluid">
            <div className="row">
              <div className="col-xxl-5 proj-sub text-start"><p className='text-break'>{truncateText(descr, 207)}</p></div>
              <div className="col-xxl-7 proj-tit text-end'wrap "><p className='text-break'>{title}</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjVal() {
  const params = useParams()

  return (
    <div className='col-md-3'>
      <div className="Info2 m-2 p-4">
        <div className="row pb-3 mt-3">
          <Link to={`/Juez/General`} className="btn5">Regresar al Catalogo</Link>
        </div>
      </div>
    </div>
  );
}

function JuezContComment({ comment, judgeName, createdAt }) {
  const formattedDate = new Date(createdAt).toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div className='container-fluid p-3 mt-3 mb-3 ContCommentIndiJudge'>
      <div className="row align-items-center">
        <div className='col-md-auto'>
          <p className='text-wrap fw-bold'>Comentario del juez {judgeName}:</p>
          <p className='text-wrap'>Fecha del comentario: {formattedDate}</p>
        </div>
      </div>
      <div className="row pb-3 align-items-center">
        <div className='col-md-auto '>
          <p className='text-break ComentariosCOntenidoWrap'>{comment}</p>
        </div>
      </div>
    </div>
  );
}

function CommentCont({ role, comments }) {
  const [judgeNames, setJudgeNames] = useState({});

  useEffect(() => {
    const fetchJudgeNames = async () => {
      if (!Array.isArray(comments)) return;

      const names = await Promise.all(
        comments.map(comment =>
          fetch(`http://localhost:8000/Juez/fetchPerson/${comment.id_person}`)
            .then(response => response.json())
            .then(data => ({ id: comment.id_person, name: `${data.name} ${data.lastName}` }))
            .catch(error => {
              console.error(`Error fetching name for judge ${comment.id_person}:`, error);
              return { id: comment.id_person, name: "Desconocido" }; // Valor por defecto en caso de error
            })
        )
      );

      const namesMap = {};
      names.forEach(({ id, name }) => {
        namesMap[id] = name;
      });
      setJudgeNames(namesMap);
    };

    fetchJudgeNames();
  }, [comments]);

  return (
    <>
      {role === 'Juez' && (
        <div className="col-xxl-3 SilderCont">
          <h1 className="Titulo ps-0">Comentarios de {role}</h1>
          {Array.isArray(comments) && comments.length > 0 ? (
            comments.map((comment, index) => (
              <JuezContComment 
                key={index} 
                comment={comment.comment} 
                judgeName={judgeNames[comment.id_person]} 
                createdAt={comment.createdAt} 
              />
            ))
          ) : (
            <p>Sin comentarios por el momento</p>
          )}
        </div>
      )}
    </>
  );
}

function Multimedia({ Video, Poster }) {
  const openURL = (url) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      window.open(url, '_blank');
    } else {
      window.open('http://' + url, '_blank');
    }
  };

  return (
    <div className='col-xxl-3 h-50'>
      <h1 className="Titulo text-break text-center">Multimedia</h1>
      <div className='container-fluid p-1 d-flex justify-content-center align-items-center'>
        <div className="row pb-3 align-items-center w-100">
          <div className='col-md-auto ContFinalRes text-center p-3 mx-auto'>
            <button className="btn4" onClick={() => openURL(Video)}>Ver Video</button>
            <button className="btn4" onClick={() => openURL(Poster)}>Ver Póster</button>
          </div>
        </div>
      </div>
    </div>
  );
}


// Componente ProjResumeCont

export default function ProjResumeCont() {
  const { projectId } = useParams();
  const [projectInfo, setProjectInfo] = useState(null);
  const [categories, setCategories] = useState({});
  const [areas, setAreas] = useState({});
  const [studentInfo, setStudentInfo] = useState(null);
  const [professorInfo, setProfessorInfo] = useState(null);
  const [commentStatus, setCommentStatus] = useState("No Calificado");
  //const [comments, setComments] = useState(["", "", "", "", ""]);
  const [judgeComments, setJudgeComments] = useState([]);
  const [loading, setLoading] = useState(true);  // Estado de carga
  const [members, setMembers] = useState([]);  // Variable para almacenar los id_member
  const [memberNames, setMemberNames] = useState([]);  // Variable para almacenar los nombres de los miembros
  const { isAuthenticated, isLoading, error, user } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener la información del proyecto
        const projectResponse = await fetch(`http://localhost:8000/Juez/fetchProject/${projectId}`);
        const projectData = await projectResponse.json();
        setProjectInfo(projectData);
        if (projectData && projectData.id_responsable) {
          const professorResponse = await fetch(`http://localhost:8000/Juez/fetchPerson/${projectData.id_responsable}`);
          const professorData = await professorResponse.json();
          setProfessorInfo(professorData);
        }
        if (projectData && projectData.id_lider) {
          const teamsResponse = await fetch(`http://localhost:8000/Juez/fetchTeam/leader/${projectData.id_lider}`);
          const teamsData = await teamsResponse.json();
          if (teamsData.length > 0) {
            const teamId = teamsData[0].id; // Utilizar el id del primer equipo
            const membersResponse = await fetch(`http://localhost:8000/Juez/getMembers/team/${teamId}`);
            const membersData = await membersResponse.json();
            setMembers(membersData.map(member => member.id_member)); // Obtener solo los id_member
            // Obtener los nombres de los miembros
            const names = await Promise.all(membersData.map(async member => {
              const studentResponse = await fetch(`http://localhost:8000/Juez/fetchStudent/${member.id_member}`);
              const studentData = await studentResponse.json();
              return studentData.name + " " + studentData.lastName;
            }));
            setMemberNames(names);
          }
          const studentResponse = await fetch(`http://localhost:8000/Juez/fetchStudent/${projectData.id_lider}`);
          const studentData = await studentResponse.json();
          setStudentInfo(studentData);
        }
        // Verificar si hay comentarios para este proyecto
        const commentsResponse = await fetch(`http://localhost:8000/Juez/fetchComment/${user.sub}/${projectId}`);
        if (commentsResponse.ok) {
          setCommentStatus("Calificado");
        } else {
          setCommentStatus("No Calificado");
        }

        // Obtener las categorías
        const categoriesResponse = await fetch('http://localhost:8000/Juez/getCategories');
        const categoriesData = await categoriesResponse.json();
        const categoryMap = {};
        categoriesData.forEach(category => {
          categoryMap[category.id] = category.title;
        });
        setCategories(categoryMap);

        // Obtener las áreas
        const areasResponse = await fetch('http://localhost:8000/Juez/getAreas');
        const areasData = await areasResponse.json();
        const areaMap = {};
        areasData.forEach(area => {
          areaMap[area.id] = area.name;
        });
        setAreas(areaMap);

        // Obtener comentarios del juez
        const judgeCommentsResponse = await fetch(`http://localhost:8000/Juez/fetchComments/project/${projectId}`);
        const judgeCommentsData = await judgeCommentsResponse.json();
        setJudgeComments(judgeCommentsData);

        setLoading(false); // Desactivar el estado de carga después de terminar todas las solicitudes
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Desactivar el estado de carga en caso de error
      }
    };

    fetchData();
  }, [projectId, user]);

  return (
    <>
      <ToggleBar />
      <div className='container-fluid centered-container mt-3 '>
        <div className='container-fluid'>
          <div className='row justify-content-between d-flex align-items-center'>
            {loading ? (
              <div style={{display:"flex",justifyContent:"center"}}>
              <Loader />  
              </div>
            ) : (
              <>
                {studentInfo && professorInfo && (
                  <InfoProj lead={`${studentInfo.name} ${studentInfo.lastName}`} profLead={`${professorInfo.name} ${professorInfo.lastName}`} memeber={memberNames.join(', ')}/>
                )}
                {projectInfo && (
                  <ProjResume
                    type={categories[projectInfo.id_category]}
                    area={areas[projectInfo.id_area]}
                    descr={projectInfo.description}
                    title={projectInfo.title}
                    profesor={projectInfo.id_responsable}
                  />
                )}
                {projectInfo && (
                  <ProjVal />
                )}
              </>
            )}
          </div>
          {!loading && (
            <div className='row m-2 justify-content-between d-flex align-items-center w-100 mb-4'>
              <div className='Info col-md-12'>
                <div className="m-auto p-4">
                  <div className='container-fluid'>
                    <div className='row justify-content-between d-flex align-items-center'>
                      <div className='row'>
                        <CommentCont role={"Juez"} comments={judgeComments} />
                        <Multimedia Video= {projectInfo.linkVideo} Poster= {projectInfo.linkPoster}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}