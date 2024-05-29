import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

import "./AssignJudge.css";

const AssignJudge = ({ area, project }) => {
  const [judges, setJudges] = useState([]);
  const [randomJudge, setRandomJudge] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchJudges = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/Admin/getJudges/${area}?projectId=${project}`);
      if (response.data.length === 0) {
        setErrorMessage("No se encontraron jueces disponibles");
        setJudges([]);
        setRandomJudge(null);
      } else {
        setJudges(response.data);
        setErrorMessage("");
        getRandomJudge(response.data);
      }
    } catch (error) {
      console.error("Error fetching judges:", error);
      setErrorMessage("Error fetching judges");
      setJudges([]);
      setRandomJudge(null);
    }
  };

  const getRandomJudge = (judgesList) => {
    if (judgesList && judgesList.length > 0) {
      const newRandomJudge = judgesList[Math.floor(Math.random() * judgesList.length)];
      setRandomJudge(newRandomJudge);
    }
  };

  const handleAssignJudgeClick = () => {
    fetchJudges();
  };

  return (
    <div className="judge-container">
      {errorMessage ? (
        <p className="error-message">{errorMessage}</p>
      ) : randomJudge ? (
        <div className="judge-info">
          <h3>{randomJudge.name}</h3>
          <img
            src={`/${randomJudge.profileImg}`}
            alt={randomJudge.name}
            className="judge-image"
          />
        </div>
      ) : (
        <p className="not-assign-judge">No hay un juez asignado</p>
      )}
      <div className="button-container">
        <button className="btn btn-primary custom-primary-btn" onClick={handleAssignJudgeClick}>
          Automatico
        </button>

        <Link to={`/usuarios/jueces/${project}`} className="btn btn-primary">
          Manual
        </Link>
      </div>
    </div>
  );
};

export default AssignJudge;
