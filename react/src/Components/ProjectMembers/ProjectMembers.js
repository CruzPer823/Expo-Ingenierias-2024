import React from "react";
import "./ProjectMembers.css";

const ProjectMembers = ({ project }) => {
  const { leader, members, teachers } = project;
  
  if (!members || !Array.isArray(members)) {
    return <p>No hay miembros en este proyecto.</p>;
  }
  return (
    <div className="project-members-container">
      <div className="project-leader-container">
        <div className="member-container">
          <p className="member-name">{leader}</p>
          <img
            src={`${process.env.PUBLIC_URL}/user.png`}
            alt={leader}
            className="member-img"
          />
        </div>
        <div className="project-members-list">
          {members.map((member, index) => (
            <div key={index} className="member-container">
              <p className="member-name">{member}</p>
              {/* Assuming all members have the same profile image */}
              <img
                src={`${process.env.PUBLIC_URL}/user.png`}
                alt={member}
                className="member-img"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="project-teachers-list">
        {teachers.map((teacher, index) => (
          <div key={index} className="teacher-container">
            <p className="member-name">{teacher}</p>
            {/* Assuming all teachers have the same profile image */}
            <img
              src={`${process.env.PUBLIC_URL}/user.png`}
              alt={teacher}
              className="member-img"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectMembers;
