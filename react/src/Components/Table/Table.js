import React, { useState } from 'react';
import axios from 'axios'; // Import Axios if you're using it

import "./Table.css";
import UserRow from './UserRow';
import JudgeRow from './JudgeRow';
import RubricRow from './RubricRow';
import Popup from '../Popup/Popup';

import AdminDeleteUserPopUp from '../Popup/AdminDeleteUserPopUp';
import { Prev } from 'react-bootstrap/esm/PageItem';

function Table({ data, searchQuery = "", selectedRole = "", judgeTable = false, rubricTable = false }) {
    const [tableData, setTableData] = useState(data);
    const [modifiedRows, setModifiedRows] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [content, setContent] = useState(null);
    const [showModalCriteria, setShowModalCriteria] = useState(false);
    const [type, setType] = useState(false);

    // Filter data based on search query and selected role
    React.useEffect(() => {
        let filteredData = data;

        if (searchQuery !== "") {
            filteredData = filteredData.filter((row) => row.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        if (selectedRole !== "") {
            filteredData = filteredData.filter((row) => row.roles.includes(selectedRole));
        }

        setTableData(filteredData);
    }, [searchQuery, selectedRole, data]);

    const handleDelete = (id) => {
        setDeleteUserId(id);
        setModalContent("¿Estas seguro que quires eliminar al usuario? Esta accion no puede deshacerse");
        setShowModal(true);
    };

    const confirmDelete = () => {
        const updatedData = tableData.filter(row => row.id !== deleteUserId);
        setTableData(updatedData);
        axios.patch(`https://140.84.165.119/api/users/toggleActiveStatus/${deleteUserId}`)
            .then(response => {
                console.log("User status toggled successfully:", response.data);
            })
            .catch(error => {
                console.error("Error toggling user status:", error);
            });
        setShowModal(false);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleCriteriaChange = (id, field, value) => {
        setModifiedRows(prevState => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                [field]: value
            }
        }));

        setTableData(prevData =>
            prevData.map(row=>
            row.id === id? {...row,[field]: value} : row)
        );
    };

    const handleSave= () => {
        const totalWeight = tableData.reduce((sum, row) => {
            const modifiedRow = modifiedRows[row.id];
            const weight = modifiedRow ? parseInt(modifiedRow.weight, 10) : row.weight;
            return sum + weight;
        }, 0);

        // Check if total weight exceeds 100
        if (totalWeight > 100) {
            setType(true);
            setContent("La suma de los pesos no puede exceder 100.");
            setShowModalCriteria(true);
            return;
        }

        const requests = Object.keys(modifiedRows).map(id => {
           const updatedCriteria={
                description:modifiedRows[id].description,
                weight:parseInt(modifiedRows[id].weight)
            };
        return axios.put(`https://140.84.165.119/api/Admin/updateCriteria/${id}`, updatedCriteria).then(response=>{
            console.log("Criteria updated successfully:", response.data);
            setType(false);
            setContent("La rúbrica ha sido correctamente actualizada");
           setShowModalCriteria(true);
        }).catch(err => {
            setType(true);
            setContent(err.response.data.message);
            setShowModalCriteria(true);
        });
       });

       
       Promise.all(requests)
       .then(() => {
           setModifiedRows({});
       });
};

    

    const handleRoleChange = (id, role) => {
        // Find the index of the target user in the tableData array
        const userIndex = tableData.findIndex((user) => user.id === id);
        
        // If the user with the given id is not found, return early
        if (userIndex === -1) return;
    
        // Get the target user object
        const targetUser = tableData[userIndex];
    
        // Prevent changes for "Administrador" role
        if (targetUser.roles.includes("Administrador")) return;
    
        // Prevent changes for "Alumno" role or to "Alumno" role
        if (targetUser.roles.includes("Alumno") || role === "Alumno") return;
    
        // Handle role changes between "Profesor" and "Juez" only
        if (role === "Profesor" || role === "Juez") {
            if (targetUser.roles.includes(role)) {
                // Only remove the role if user has more than one role
                if (targetUser.roles.length > 1) {
                    // Create a new user object with the role removed
                    const updatedUser = {
                        ...targetUser,
                        roles: targetUser.roles.filter((r) => r !== role)
                    };
                    // Update the tableData array with the updated user object
                    setTableData([
                        ...tableData.slice(0, userIndex),
                        updatedUser,
                        ...tableData.slice(userIndex + 1)
                    ]);
    
                    // Make the API call after updating roles
                    axios.put(`https://140.84.165.119/api/users/${id}/updateRole`, {
                        roles: updatedUser.roles // Assuming updatedUser is the modified user object
                    })
                    .then(response => {
                        console.log("Roles updated successfully:", response.data);
                    })
                    .catch(error => {
                        console.error("Error updating roles:", error);
                    });
                }
            } else {
                // Add the new role to the user's roles array
                const updatedUser = {
                    ...targetUser,
                    roles: [...targetUser.roles, role]
                };
                // Update the tableData array with the updated user object
                setTableData([
                    ...tableData.slice(0, userIndex),
                    updatedUser,
                    ...tableData.slice(userIndex + 1)
                ]);
    
                // Make the API call after updating roles
                axios.put(`https://140.84.165.119/api/users/${id}/updateRole`, {
                    roles: updatedUser.roles // Assuming updatedUser is the modified user object
                })
                .then(response => {
                    console.log("Roles updated successfully:", response.data);
                })
                .catch(error => {
                    console.error("Error updating roles:", error);
                });
            }
        }
    };
    
    
    

    return (
        <>
        <div className={rubricTable?"table-container rubricTable":"table-container"}>
            {rubricTable?<div className='rubricTitle'>
                <h1>Actualizar Rúbrica</h1>
            </div>:null}
            <table className="table">
            <thead>
                    <tr>
                        {/* Headers */}
                        {judgeTable ? (
                            <>
                                <th className="text-center">Jueces</th>
                                <th className="text-center">Administrar</th>
                            </>
                        ) : rubricTable ? (
                            <>
                                <th className="text-center">Criterios</th>
                                <th className="text-center">Ponderación</th>
                            </>
                        ) : (
                            <>
                                <th className="text-center">Usuarios</th>
                                <th className="text-center">Roles</th>
                                <th className="text-center">Administrar</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {/* Rows */}
                    {judgeTable ? (
                        tableData.map((user) => (
                            <JudgeRow 
                                key={user.id} 
                                user={user} 
                            />
                        ))
                    ) : rubricTable ? (
                        tableData.map((criteria) => (
                            
                            <RubricRow 
                                key={criteria.id} 
                                criteria={criteria} 
                                onCriteriaChange={handleCriteriaChange}
                            />
                        ))
                    ) : (
                        tableData
                            .filter(user => user.isActive !== 0) // Filter out rows where isActive is explicitly 0
                            .map((user) => (
                                <UserRow 
                                    key={user.id} 
                                    user={user} 
                                    onDelete={handleDelete} 
                                    onRoleChange={(role) => handleRoleChange(user.id, role)} 
                                />
                            ))
                    )}
                </tbody>
            </table>
            {showModalCriteria && <Popup content={content} 
            onClose={()=>setShowModalCriteria(false)} error={type} />}
            {showModal && (
                <AdminDeleteUserPopUp 
                    content={modalContent} 
                    onClose={closeModal} 
                    onConfirm={confirmDelete} 
                />
            )}
        </div>
        {rubricTable? 
            <div className='rubricButton'>
            <button className="btn btn-primary" onClick={handleSave}>Guardar</button>
            </div>:null}
        </>
    );
    
}

export default Table;
