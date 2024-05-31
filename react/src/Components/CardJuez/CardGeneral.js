//CardGeneral.js
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './Juez.css'; // Importa el archivo CSS con estilos personalizados

function CardCalif({ projectId, title, nivelDesarrollo, description, categoria, idpersona}) {
  const truncateText = (text, limit) => {
    if (text.length <= limit) {
      return text;
    }
    return text.slice(0, limit) + '...';
  };

  return (
    <div className="card">
      <div className="imag">
        <img src={require("../../Assets/CardProto.png")} alt={title} />
      </div>

      <div className="text">
        <p className="h3">{truncateText(title, 50)}</p>
        <p className="p">{truncateText(description, 100)}</p>

        <div className="badge-container">
          <span className="badge">{categoria}</span>
          <span className="badge">{nivelDesarrollo}</span>
        </div>

        <Link to={`/Juez/General/${idpersona}/Proyectos/${projectId}`} className="btn23">Ver Proyecto</Link> 

      </div>
    </div>
  );
}

export function Cardlist() {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState({});
  const [areas, setAreas] = useState({});
  const { idpersona } = useParams();

  useEffect(() => {
    // Realizar la llamada al servidor para obtener todos los proyectos
    fetch('http://localhost:8000/Juez/fetchProjects')
      .then(response => response.json())
      .then(allProjects => {
        setProjects(allProjects);
      })
      .catch(error => console.error('Error al obtener los proyectos:', error));

    // Realizar la llamada al servidor para obtener las categorías
    fetch('http://localhost:8000/Juez/getCategories')
      .then(response => response.json())
      .then(data => {
        // Organizar las categorías en un objeto por id para facilitar la búsqueda
        const categoryMap = {};
        data.forEach(category => {
          categoryMap[category.id] = category.title;
        });
        setCategories(categoryMap);
      })
      .catch(error => console.error('Error al obtener las categorías:', error));

    // Realizar la llamada al servidor para obtener las áreas
    fetch('http://localhost:8000/Juez/getAreas')
      .then(response => response.json())
      .then(data => {
        // Organizar las áreas en un objeto por id para facilitar la búsqueda
        const areaMap = {};
        data.forEach(area => {
          areaMap[area.id] = area.name;
        });
        setAreas(areaMap);
      })
      .catch(error => console.error('Error al obtener las áreas:', error));
  }, [idpersona]);

  return (
    <>
      {projects.map(project =>
        <CardCalif
          projectId={project.id}
          title={project.title}
          description={project.description}
          categoria={categories[project.id_category]}
          nivelDesarrollo={areas[project.id_area]}
          idpersona={idpersona}
          key={project.id}
        />
      )}
    </>
  );
}
