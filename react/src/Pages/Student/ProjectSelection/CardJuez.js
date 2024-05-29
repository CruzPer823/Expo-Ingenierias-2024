import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Juez.css';
import Badge from './Badge';

function CardCalif({ title, description, categoria, nivelDesarrollo, status }) {
  const truncateText = (text, limit) => {
    if (text <= limit) {
      return text;
    }
    return text.slice(0, limit) + '...';
  };

  const badgeClassName = status === "No calificado" ? "badge2" : "badge";
  const btnClassName = status === "No calificado" ? "btncalif" : "btncalifdisable";
  const btnText = status === "No calificado" ? "Calificar" : "Calificado";
  const btnAction = status === "No calificado" ? "/rubrica" : null;


  return (
    <div className="card">
      <div className="imag algoimag">

      </div>

      <div className="text">
        <p className="h3">{truncateText(title, 50)}</p>
        <p className="p">{truncateText(description, 100)}</p>

        <div className="badge-container">
          <Badge data={categoria} className="badge" />
          <Badge data={nivelDesarrollo} className="badge" />
          <Badge data={status} className={badgeClassName} />
        </div>

        <Link to="/inicio" className="btn23">Ver Proyecto</Link>
        
        {btnAction ? (
          <Link to={btnAction} className={btnClassName}>{btnText}</Link>
        ) : (
          <span className={btnClassName}>{btnText}</span>
        )}
      </div>
    </div>
  );
}
