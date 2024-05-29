import React from 'react';
import { useNavigate } from 'react-router-dom';
import RoleCheckbox from './RoleCheckbox.js'; // Changed import path

function UserRow({ user, onDelete, onRoleChange }) {
    const navigate = useNavigate();

    const handleEditClick = () => {
        // Redirect to EditUserPage and pass the userId as a URL parameter
        navigate(`/usuarios/${user.id}`);
    };

    return (
        <tr key={user.id}>
            {/* First column */}
            <td className="text-center">
                {user.name}
                <br />
                <span className="text-muted">
                    {user.roles.includes("Alumno") ? user.enrollment : user.email}
                </span>
            </td>
            {/* Second column - Bootstrap button */}
            <td className="text-center">
                <div className="btn-group role-btn-group" role="group" aria-label="Basic checkbox toggle button group">
                    <RoleCheckbox
                        id={user.id}
                        role="Alumno"
                        checked={user.roles.includes("Alumno")}
                        onChange={onRoleChange}
                    />
                    <RoleCheckbox
                        id={user.id}
                        role="Profesor"
                        checked={user.roles.includes("Profesor")}
                        onChange={onRoleChange}
                    />
                    <RoleCheckbox
                        id={user.id}
                        role="Juez"
                        checked={user.roles.includes("Juez")}
                        onChange={onRoleChange}
                    />
                    <RoleCheckbox
                        id={user.id}
                        role="Administrador"
                        checked={user.roles.includes("Administrador")}
                        onChange={onRoleChange}
                    />
                </div>
            </td>
            {/* Third column - Bootstrap buttons */}
            <td className="text-center">
                <button className="btn btn-primary btn-separator" onClick={handleEditClick}>Editar</button>
                <button className="btn btn-danger" onClick={() => onDelete(user.id)}>Inhabilitar</button>
            </td>
        </tr>
    );
}

export default UserRow;
