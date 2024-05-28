import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function JudgeRow({ user }) {
    const { projectId } = useParams(); // Use react-router-dom to get the projectId from the URL
    const [assigned, setAssigned] = useState(false);
    const [alert, setAlert] = useState({ type: '', message: '', visible: false });

    const assignJudge = () => {
        axios.post(`http://localhost:8000/Admin/assignProjectJudge`, {
            judgeId: user.id, // Using the user.id for the judgeId
            projectId: projectId // Using the projectId from the URL
        })
        .then(response => {
            // Handle successful assignment
            setAssigned(true);
            setAlert({ type: 'success', message: 'Juez asignado de forma exitosa!', visible: true });
        })
        .catch(error => {
            console.error('El juez no pudo ser asignado', error);
            setAlert({ type: 'danger', message: 'Error assigning judge. Please try again.', visible: true });
        });
    };

    const removeJudge = () => {
        axios.delete(`http://localhost:8000/Admin/remove/projects/${projectId}/judges/${user.id}`)
        .then(response => {
            // Handle successful removal
            setAssigned(false);
            setAlert({ type: 'success', message: 'Juez eliminado de forma exitosa!', visible: true });
        })
        .catch(error => {
            console.error('There was an error removing the judge', error);
            setAlert({ type: 'danger', message: 'El juez no puede ser eliminado', visible: true });
        });
    };

    useEffect(() => {
        if (projectId) {
            axios.get(`http://localhost:8000/Admin/getProjectJudges`, {
                params: { projectId }
            })
            .then(response => {
                // Assuming response.data contains the list of judge IDs as strings
                const judgeIds = response.data;
                if (judgeIds.includes(user.id)) {
                    setAssigned(true);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the project judges:', error);
            });
        }
    }, [projectId, user.id]);

    return (
        <>
            {alert.visible && (
                <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                    {alert.message}
                    <button type="button" className="btn-close" onClick={() => setAlert({ ...alert, visible: false })}></button>
                </div>
            )}
            <tr key={user.id}>
                {/* First column */}
                <td className="text-center">
                    {user.name}
                </td>
            
                {/* Second column - Conditionally render button based on assigned */}
                <td className="text-center">
                    {assigned ? (
                        <button className="btn btn-danger" onClick={removeJudge}>Eliminar</button>
                    ) : (
                        <button className="btn btn-primary custom-primary-btn" onClick={assignJudge}>Asignar</button>
                    )}
                </td>
            </tr>
        </>
    );
}

export default JudgeRow;
