import React, { useState, useEffect } from 'react';
//import { useParams } from 'react-router-dom';
import { Cardlist } from '../../Components/CardJuez/CardJuez';
import Loader from '../../Components/Loader/Loader';
import ToggleBar from '../../Components/Togglebar/togglebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import { useAuth0 } from '@auth0/auth0-react';

function PageJuez() {
  //const { idpersona } = useParams();
  const [filterText, setFilterText] = useState("");
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState({});
  const [areas, setAreas] = useState({});
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, isLoading, error, user } = useAuth0();

  useEffect(() => {
    fetch(`http://localhost:8000/Juez/fetchJudgeProject/${user.sub}`)
      .then(response => response.json())
      .then(projectIds => {
        fetch('http://localhost:8000/Juez/fetchProjects')
          .then(response => response.json())
          .then(allProjects => {
            const filteredProjects = allProjects.filter(project => projectIds.includes(project.id));
            setProjects(filteredProjects);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error al obtener los proyectos:', error);
            setLoading(false);
          });
      })
      .catch(error => {
        console.error('Error al obtener los proyectos asignados al juez:', error);
        setLoading(false);
      });

    fetch('http://localhost:8000/Juez/getCategories')
      .then(response => response.json())
      .then(data => {
        const categoryMap = {};
        data.forEach(category => {
          categoryMap[category.id] = category.title;
        });
        setCategories(categoryMap);
      })
      .catch(error => console.error('Error al obtener las categorías:', error));

    fetch('http://localhost:8000/Juez/getAreas')
      .then(response => response.json())
      .then(data => {
        const areaMap = {};
        data.forEach(area => {
          areaMap[area.id] = area.name;
        });
        setAreas(areaMap);
      })
      .catch(error => console.error('Error al obtener las áreas:', error));
  }, [user]);

  function handleChange(e) {
  const searchText = e.target.value.toLowerCase();
  setFilterText(searchText);
}

const filteredProjects = projects.filter(project =>
  filterText === "" || new RegExp(filterText.toLowerCase()).test(project.title.toLowerCase())
);

  return (
    <>
      <ToggleBar />
      <div className="container-fluid">
        {loading ? (
          <div style={{display:"flex",justifyContent:"center"}}>
          <Loader />  
          </div>
        ) : (
          <>
            <div className="centered-content">
              {/*
              <input
                placeholder="Buscar proyecto por nombre"
                type="text"
                name="text"
                className="input"
                value={filterText}
                onChange={handleChange}
        />*/}
            </div>
            <div className="proyectos">
              {filteredProjects.length > 0 ? (
                <Cardlist
                  projects={filteredProjects}
                  categories={categories}
                  areas={areas}
                />
              ) : (
                <div className="custom-alert">
                  <p>No tienes proyectos para calificar</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default PageJuez;
