import React from 'react';
import './ProjectCard.css';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';

function ProjectCard({ project }) {
    const { id, title, img, categories, review, isDisqualified } = project; // Destructure project object
    const statusClassName = review ? 'review-true' : 'review-false'; // Determine class based on review status
    const StatusIcon = review ? AiOutlineCheckCircle : AiOutlineCloseCircle; // Choose icon based on review status
    const disqualifiedClass = isDisqualified ? 'disqualified' : ''; // Determine disqualified class
    return (
      <div className={` card  ${disqualifiedClass}`} style={{width:"40vw",height:"60vh"}}>
        <div className={`project-card-status ${statusClassName}`}>
          <StatusIcon /> {/* Render dynamic icon */}
        </div>
        <img src={`${process.env.PUBLIC_URL}/${img}`} className="card-img-top" alt="Project Image" />
        <div className="card-body project-card-content">
          <h5 className="card-title">{title}</h5>
          <div className="category-container">
            {categories.map((category, index) => (
              <span key={index} className="badge">{category}</span>
            ))}
          </div>
          <Link to={`/Admin/proyectos/${id}`} className="btn btn-primary custom-primaty-btn btnPrin">Abrir</Link>
        </div>
      </div>
    );
}

export default function ProjectCardsList({ data, filter, searchTerm }) {
  let filteredProjects = data;

  // Apply filter based on selected edition
  if (filter) {
    filteredProjects = filteredProjects.filter(project => project.edition === filter);
  }

  // Apply search filter
  if (searchTerm) {
    filteredProjects = filteredProjects.filter(project =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
      <div className="contenedor row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
        {filteredProjects.map(project => (
          <div key={project.id} className="tarjeta">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
  );
}
