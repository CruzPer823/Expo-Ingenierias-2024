import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importar el JavaScript de Bootstrap
import '../Juez.css';
import Badge from './Badge'; // Importa el componente Badge

function Card({ title, image, description }) {
  const truncateText = (text, limit) => {
    if (text.length <= limit) {
      return text;
    }
    return text.slice(0, limit) + '...';
  };

  return (
    <div className="card">
      <div className="imag">
        <img src={require("../img/"+image)} alt={title}/>
      </div>

      <div className="text">
        <p className="h3">{truncateText(title, 50)}</p>
        <p className="p">{truncateText(description, 100)}</p>

        <Link to="/inicio" className="btn">Ver Proyecto</Link>
      </div>
    </div>
  );
}

function CardCalif({ title, image, description, ubicacion, categoria, nivelDesarrollo, status }) {
  const truncateText = (text, limit) => {
    if (text.length <= limit) {
      return text;
    }
    return text.slice(0, limit) + '...';
  };

  // Determinar el classname según el valor de status
  const badgeClassName = status === "No calificado" ? "badge2" : "badge";

  return (
    <div className="card">
      <div className="imag">
        <img src={require("../img/"+image)} alt={title}/>
      </div>

      <div className="text">
        <p className="h3">{truncateText(title, 50)}</p>
        <p className="p">{truncateText(description, 100)}</p>

        {/* Agrega badges para ubicación, categoría, nivel de desarrollo y estado */}
        <div className="badges">
          <Badge data={ubicacion} className={badgeClassName} />
          <Badge data={categoria} className={badgeClassName} />
          <Badge data={nivelDesarrollo} className={badgeClassName} />
          <Badge data={status} className={badgeClassName} />
        </div>

        <Link to="/inicio" className="btn">Ver Proyecto</Link>
        <Link to="/rubrica" className="btncalif">Calificar</Link>
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
