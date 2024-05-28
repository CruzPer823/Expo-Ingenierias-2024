import React from 'react';
import './RoleFilter.css';

function RoleFilter({ onRoleFilter }) {
    const handleRoleChange = (role) => {
        onRoleFilter(role);
    };

    return (
        <div className="col-md-4">
            {/* Group of Buttons */}
            <div className="btn-group" role="group" aria-label="Basic radio toggle button group" style={{ backgroundColor: "#fff" }}>
                <input 
                    type="radio" 
                    className="btn-check" 
                    name="btnradio" 
                    id="btnradio1" 
                    autoComplete="off"
                    onChange={() => handleRoleChange("")} // All roles
                />
                <label className="btn btn-outline-primary" htmlFor="btnradio1">Todos</label>

                <input 
                    type="radio" 
                    className="btn-check" 
                    name="btnradio" 
                    id="btnradio2" 
                    autoComplete="off"
                    onChange={() => handleRoleChange("Alumno")}
                />
                <label className="btn btn-outline-primary" htmlFor="btnradio2">Alumnos</label>

                <input 
                    type="radio" 
                    className="btn-check" 
                    name="btnradio" 
                    id="btnradio3" 
                    autoComplete="off"
                    onChange={() => handleRoleChange("Profesor")}
                />
                <label className="btn btn-outline-primary" htmlFor="btnradio3">Profesores</label>

                <input 
                    type="radio" 
                    className="btn-check" 
                    name="btnradio" 
                    id="btnradio4" 
                    autoComplete="off"
                    onChange={() => handleRoleChange("Juez")}
                />
                <label className="btn btn-outline-primary" htmlFor="btnradio4">Jueces</label>

                <input 
                    type="radio" 
                    className="btn-check" 
                    name="btnradio" 
                    id="btnradio5" 
                    autoComplete="off"
                    onChange={() => handleRoleChange("Administrador")}
                />
                <label className="btn btn-outline-primary" htmlFor="btnradio5">Administradores</label>
            </div>
        </div>
    );
}

export default RoleFilter;
