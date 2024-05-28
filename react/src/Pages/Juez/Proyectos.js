import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import NavigationBar from '../../Components/NavigationBar/Judge/NavigationBar';
import Loader from '../../Components/Loader/Loader';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import { Cardlist } from '../../Components/CardJuez/CardGeneral'; // Importa el componente Cardlist desde el nuevo archivo de General

function PageJuez() {
  const { idpersona } = useParams();
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(true);  // Estado de carga

  useEffect(() => {
    // Realizar la llamada al servidor para obtener los proyectos asignados al juez
    fetch(`http://localhost:8000/api/judgeProjects/${idpersona}`)
      .then(response => response.json())
      .then(projectIds => {
        // Realizar la segunda llamada al servidor para obtener todos los proyectos
        fetch('http://localhost:8000/api/projects')
          .then(response => response.json())
          .then(allProjects => {
            // Filtrar proyectos con los IDs obtenidos del primer fetch
            const filteredProjects = allProjects.filter(project => projectIds.includes(project.id));
            setLoading(false);  // Desactivar el estado de carga
          })
          .catch(error => {
            console.error('Error al obtener los proyectos:', error);
            setLoading(false);  // Desactivar el estado de carga en caso de error
          });
      })
      .catch(error => {
        console.error('Error al obtener los proyectos asignados al juez:', error);
        setLoading(false);  // Desactivar el estado de carga en caso de error
      });
  }, [idpersona]);

  function handleChange(e) {
    setFilterText(e.target.value);
  }

  return (
    <>
      <NavigationBar NameSection={"Proyectos"} />
      <div className="container-fluid">
        <div className="centered-content">
          <input
            placeholder="Buscar proyecto por nombre"
            type="text"
            name="text"
            className="input"
            value={filterText}
            onChange={handleChange}
          />
        </div>
        <div className="proyectos">
          {loading ? (
            <div style={{display:"flex",justifyContent:"center"}}>
            <Loader />  
            </div>
          ) : (
            <>
              <Cardlist />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default PageJuez;
