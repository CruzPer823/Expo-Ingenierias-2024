import React from 'react';

function RoleCheckbox({ id, role, checked, onChange }) {
    return (
        <>
            <input 
                type="checkbox" 
                className="btn-check" 
                id={`btncheck-${id}-${role}`} 
                autoComplete="off"
                checked={checked}
                onChange={() => onChange(role)}
            />
            <label 
                className="btn btn-outline-primary" 
                htmlFor={`btncheck-${id}-${role}`}
            >
                {role}
            </label>
        </>
    );
}

export default RoleCheckbox;
