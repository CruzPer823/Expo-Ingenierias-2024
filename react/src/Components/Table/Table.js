import React, { useState } from 'react';
import axios from 'axios'; // Import Axios if you're using it

import "./Table.css";
import UserRow from './UserRow';
import JudgeRow from './JudgeRow';
import RubricRow from './RubricRow';

import AdminDeleteUserPopUp from '../Popup/AdminDeleteUserPopUp';

function Table({ data, searchQuery = "", selectedRole = "", judgeTable = false, rubricTable = false }) {
    const [tableData, setTableData] = useState(data);

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [deleteUserId, setDeleteUserId] = useState(null);

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
        axios.patch(`http://localhost:8000/users/toggleActiveStatus/${deleteUserId}`)
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
                    axios.put(`http://localhost:8000/users/${id}/updateRole`, {
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
                axios.put(`http://localhost:8000/users/${id}/updateRole`, {
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
        <div className="table-container">
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
                                <th className="text-center">Administrar</th>
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
            {showModal && (
                <AdminDeleteUserPopUp 
                    content={modalContent} 
                    onClose={closeModal} 
                    onConfirm={confirmDelete} 
                />
            )}
        </div>
    );
    
}

export default Table;
