import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Loader from '../../Components/Loader/Loader';
import Widget from '../../Components/Widget/Widget';
import VideoCard from '../../Components/VideoCard/VideoCard';
import AssignJudge from '../../Components/AssignJudge/AssignJudge';
import ProjectScore from '../../Components/ProjectScore/ProjectScore';
import ProjectMembers from '../../Components/ProjectMembers/ProjectMembers';
import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar';
import CustomModal from '../../Components/CustomModal/CustomModal';

function ProjectPage({ setPageTitle }) {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const adminId = 'Auth013'; // Replace this with the actual admin ID from your authentication logic

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/projects/resume/${projectId}`);
        setProject(response.data);
        setPageTitle(response.data.title);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId, setPageTitle]);

  const handleDescalify = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSuccess = (message) => {
    alert(message); // Show success message to the user
    navigate('/proyectos'); // Redirect to the projects page after the alert
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

  const { poster, video, description } = project;

  return (
    <>
      <NavigationBar NameSection={project.title}/>
      <div className="container-fluid mt-3">
        <div className="row">
          {/* Your existing code for displaying project information */}

          <div className="col-lg-6">
            <Widget title={"Póster"} centered={true} content={<img style={{height:"625px"}} src={`${process.env.PUBLIC_URL}/${poster}`} alt="Project Image" />} />
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-12">
                <Widget title={"Video"} centered={true} content={<VideoCard url={video} />} />
              </div>
              <div className="col-lg-12">
                <Widget title={"Descripción del proyecto"} centered={true} content={<p style={{marginLeft:"10px", marginRight:"10px"}}>{description}</p>} />
              </div>
            </div>
          </div>
        </div>
        {/* Your existing code for displaying project information */}

        <div className="row">

          <div className="col-lg-3">
            <Widget title={"Asignar Jueces"} centered={true} content={<AssignJudge area={project.id_area} project={project.id}/>} />
          </div>

          <div className="col-lg-6">
            <Widget title={"Equipo"} centered={true} content={<ProjectMembers project={project} />} />
          </div>
          {/* <div className="col-lg-3">
            <Widget title={"Calificación"} centered={true} content={<ProjectScore score={project.score} isDisqualified={project.isDisqualified} allProjects={mockProjects} />} />
          </div> */}
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
