import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

import "./AssignJudge.css";

const AssignJudge = ({ area, project }) => {
  const [judges, setJudges] = useState([]);
  const [alert, setAlert] = useState({ type: '', message: '', visible: false });

  const handleAssignJudgeClick = async () => {
    try {
      // Fetch judges
      const response = await axios.get(`http://localhost:8000/Admin/getJudges/${area}?projectId=${project}`);
      if (response.data.length === 0) {
        setJudges([]);
        setAlert({ type: 'danger', message: 'No se encontraron jueces disponibles', visible: true });
      } else {
        setJudges(response.data);
        // Select judge with lowest projectCount
        const sortedJudges = response.data.sort((a, b) => a.projectCount - b.projectCount);
        const selectedJudge = sortedJudges[0];

        // Check if the selected judge's projectCount is 5 or higher
        if (selectedJudge.projectCount >= 5) {
          setAlert({ type: 'danger', message: 'No se encontraron jueces disponibles', visible: true });
        } else {
          // Assign the selected judge
          await axios.post(`http://localhost:8000/Admin/assignProjectJudge`, {
            judgeId: selectedJudge.id,
            projectId: project
          });
          setAlert({ type: 'success', message: `Juez ${selectedJudge.name} asignad@ de forma exitosa!`, visible: true });
          // <------------- Refresh the page --------->
          setTimeout(() => {
            window.location.reload();
          }, 2000); // delay to allow the user to see the success message
        }
      }
    } catch (error) {
      console.error('Error fetching or assigning judge:', error);
      setAlert({ type: 'danger', message: 'Error asignando juez!', visible: true });
    }
  };

  return (
    <div className="judge-container">
      {alert.visible && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
      <div className="assign-judge-button-container">
        <button className="btn btn-primary custom-primary-btn" onClick={handleAssignJudgeClick}>
          Automatico
        </button>
        <Link to={`/Admin/usuarios/jueces/${project}`} className="btn btn-primary">
          Manual
        </Link>
      </div>
    </div>
  );
};

export default AssignJudge;
