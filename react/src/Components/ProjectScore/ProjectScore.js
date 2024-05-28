import React from 'react';
import './ProjectScore.css'; // Import CSS file

const ProjectScore = ({ score, allProjects, isDisqualified }) => {
  if (isDisqualified) {
    return (
      <div className="project-score">
        <p className="score">NA</p>
        <p className="ranking">El proyecto ha sido descalificado</p>
      </div>
    );
  }

  const validProjects = allProjects.filter((project) => !project.isDisqualified);
  const ranking = validProjects.filter((project) => project.score > score).length + 1;

  return (
    <div className="project-score">
      <p className="score">{score}</p>
      <p className="ranking">El proyecto está en el top #{ranking}</p>
    </div>
  );
};

export default ProjectScore;
