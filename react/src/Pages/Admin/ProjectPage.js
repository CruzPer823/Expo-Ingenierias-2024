import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Loader from '../../Components/Loader/Loader';
import Widget from '../../Components/Widget/Widget';
import VideoCard from '../../Components/VideoCard/VideoCard';
import CustomCarousel from '../../Components/CustomCarousel/CustomCarousel';
import AssignJudge from '../../Components/AssignJudge/AssignJudge';
import ProjectScore from '../../Components/ProjectScore/ProjectScore';
import ProjectMembers from '../../Components/ProjectMembers/ProjectMembers';
import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar';
import Checklist from '../../Components/Checklist/Checklist';
import CustomModal from '../../Components/CustomModal/CustomModal';

const useFetchData = (url, isChecklist = false) => {
  const [data, setData] = useState(isChecklist ? [] : { labels: [], data: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(url)
      .then(response => {
        const responseData = response.data;
        if (isChecklist) {
          setData(responseData);
        } else {
          setData({
            labels: responseData.labels,
            data: responseData.data
          });
        }
        setLoading(false);
      })
      .catch(error => {
        console.error(`Error fetching data from ${url}:`, error);
        setError('Error fetching data');
        setLoading(false);
      });
  }, [url, isChecklist]);

  return { data, loading, error };
};

function ProjectPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const adminId = '66539b1ce539b35aea94e74d'; // Replace this with the actual admin ID from your authentication logic

  const checklistApiUrl = `http://localhost:8000/Admin/projects/${projectId}/material-checklist`;
  const { data: checklistData } = useFetchData(checklistApiUrl, true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/projects/resumen/${projectId}`);
        setProject(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8000/Admin/projects/');
        setAllProjects(response.data);
      } catch (err) {
        console.error("Error fetching all projects:", err.message);
      }
    };

    fetchAllProjects();
  }, []);

  const handleDescalify = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSuccess = (message) => {
    alert(message); // Show success message to the user
    navigate('/Admin/proyectos'); // Redirect to the projects page after the alert
  };

  if (loading) {
    return (
    <>
      <NavigationBar NameSection={"Proyecto"} />
      <div style={{display:'flex', justifyContent:'center'}}>
      <Loader/>
      </div>
      </>
    );
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  if (!project) {
    return <h1>Project with ID "{projectId}" not found!</h1>;
  }

  return (
    <>
      <NavigationBar NameSection={project.title}/>
      <div className="container-fluid mt-3">
        <div className="row">
          

          <div className="col-lg-6">
            <Widget title={"Póster"} centered={true} content={<img style={{height:"625px"}} src={`${process.env.PUBLIC_URL}/${project.poster}`} alt="Project Image" />} />
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-12">
                <Widget title={"Video"} centered={true} content={<VideoCard url={project.video} />} />
              </div>
              <div className="col-lg-12">
                <Widget title={"Descripción del proyecto"} centered={true} content={<p style={{marginLeft:"10px", marginRight:"10px"}}>{project.description}</p>} />
              </div>
            </div>
          </div>
        </div>
        

        <div className="row">

        <div className="col-lg-3">
          <Widget
            title="Asignar Jueces"
            centered={true}
            content={
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <CustomCarousel projectId={projectId} />
                <AssignJudge area={project.id_area} project={project.id} />
                </div>
            }
          />
        </div>


          <div className="col-lg-6">
            <Widget title={"Equipo"} centered={true} content={<ProjectMembers project={project} />} />
          </div>
          <div className="col-lg-3">
            <Widget title={"Calificación"} centered={true} content={<ProjectScore score={project.score} isDisqualified={project.isDisqualified} allProjects={allProjects} />} />
            <Widget title={"Material Solicitado"} content={<Checklist initialItems={checklistData} />} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-lg-12 d-flex justify-content-center mt-3">
            <button className="btn btn-lg btn-primary mx-2 custom-primaty-btn">Calificar</button>
            <button className="btn btn-lg btn-danger mx-2" onClick={handleDescalify}>Descalificar</button>
          </div>
        </div>
      </div>

      {/* Use CustomModal component */}
      <CustomModal
        show={showModal}
        handleClose={handleCloseModal}
        projectId={projectId}
        adminId={adminId}
        handleSuccess={handleSuccess}
      />
    </>
  );
}

export default ProjectPage;
