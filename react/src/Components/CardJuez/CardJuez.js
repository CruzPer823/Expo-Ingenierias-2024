import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Juez.css';
import Badge from '../Badge/Badge.js';


function CardCalif({ title, image, description, ubicacion, categoria, nivelDesarrollo, status }) {
  const truncateText = (text, limit) => {
    if (text.length <= limit) {
      return text;
    }
    return text.slice(0, limit) + '...';
  };

  const badgeClassName = status === "No calificado" ? "badge2" : "badge3";
  const btnClassName = status === "No calificado" ? "btncalif" : "btncalifdisable";
  const btnText = status === "No calificado" ? "Calificar" : "Calificado";
  const btnAction = status === "No calificado" ? "/Calificar/:projectId" : null;
  const alreadyCalifiedMessage = "Este proyecto ya ha sido calificado.";

  return (
    <div className="card">
      <div className="imag">
        <img src={require("../../Assets/"+image)} alt={title}/>
      </div>

      <div className="text">
        <p className="h3">{truncateText(title, 50)}</p>
        <p className="p">{truncateText(description, 100)}</p>

        <div className="badge-container">
          <Badge data={categoria} className="badge" />
          <Badge data={nivelDesarrollo} className="badge" />
          <Badge data={status} className={badgeClassName} />
        </div>

        <Link to="/ProyectoJuez/:projectId" className="btn23">Ver Proyecto</Link>
        
        {btnAction ? (
          <Link to={btnAction} className={btnClassName}>{btnText}</Link>
        ) : (
          <span className={btnClassName}>{btnText}</span>
        )}
      </div>
    </div>
  );
}

export function Cardlist({ posts }) {
  const list = posts.map(post => 
    <CardCalif
      title={post.title}
      image={post.image}
      description={post.description}
      ubicacion={post.ubicacion}
      categoria={post.categoria}
      nivelDesarrollo={post.nivelDesarrollo}
      status={post.status}
      key={post.id}
    />
  )

  return (
    <>
      {list}
    </>
  );
}
