import React from 'react';
import './RoleFilter.css';

function RoleFilterAnnounces({ onRoleFilter }) {
    const handleRoleChange = (role) => {
        onRoleFilter(role);
    };

    return (
        <div className="col-md-4">
            {/* Group of Buttons */}
            <div className="btn-group" role="group" aria-label="Basic radio toggle button group" style={{ backgroundColor: "#e6e6e6" }}>
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
                    onChange={() => handleRoleChange("students")}
                />
                <label className="btn btn-outline-primary" htmlFor="btnradio2">Alumnos</label>

                <input 
                    type="radio" 
                    className="btn-check" 
                    name="btnradio" 
                    id="btnradio3" 
                    autoComplete="off"
                    onChange={() => handleRoleChange("teachers")}
                />
                <label className="btn btn-outline-primary" htmlFor="btnradio3">Profesores</label>

                <input 
                    type="radio" 
                    className="btn-check" 
                    name="btnradio" 
                    id="btnradio4" 
                    autoComplete="off"
                    onChange={() => handleRoleChange("judges")}
                />
                <label className="btn btn-outline-primary" htmlFor="btnradio4">Jueces</label>
            </div>
        </div>
    );
}

export default RoleFilterAnnounces;
