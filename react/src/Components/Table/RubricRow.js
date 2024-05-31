import React from 'react';
import { useNavigate } from 'react-router-dom';

function RubricRow({ criteria }) {

    const navigate = useNavigate();

    const handleEditClick = () => {
        // Redirect to EditCriteriaPage and pass the criteriaId as a URL parameter
        navigate(`/rubrica/${criteria.id}`);
    };

    return (
        <>
            <tr key={criteria.id}>
                {/* First column */}
                <td className="text-center">
                    {criteria.description}
                </td>
            
                {/* Second column - criteria weight */}
                <td className="text-center">
                    {criteria.weight}
                </td>

                {/* Third column - Administration */}
                <td className="text-center">
                    <button className="btn btn-primary btn-separator" onClick={handleEditClick}>Editar</button>
                </td>
            </tr>
        </>
    );
}

export default RubricRow;
