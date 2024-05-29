import React, { useState } from "react";
import { judges } from "../../MockData/MockData";
import "./AsignJudge.css"

const AssignJudge = ({ categories }) => {
  const [randomJudge, setRandomJudge] = useState(null);

  const getRandomJudge = () => {
    // Filter judges based on the categories
    const filteredJudges = judges.filter(judge =>
      judge.interests.some(interest => categories.includes(interest))
    );

    // Select a random judge from filtered judges
    const newRandomJudge =
      filteredJudges[Math.floor(Math.random() * filteredJudges.length)];

    setRandomJudge(newRandomJudge);
  };

  return (
    <div className="judge-container">
      {randomJudge ? (
        <div className="judge-info">
          <h3>{randomJudge.name}</h3>
          <img
            src={`/${randomJudge.profileImg}`}
            alt={randomJudge.name}
            className="judge-image"
          />
        </div>
      ) : (
        <p className="not-asign-judge">No hay un juez asignado</p>
      )}
      <button className="btn btn-primary custom-primaty-btn" onClick={getRandomJudge}>
        Asignar Juez
      </button>
    </div>
  );
};

export default AssignJudge;
