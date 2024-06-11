import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../TextInput/TextInput';
import { Prev } from 'react-bootstrap/esm/PageItem';

function RubricRow({ criteria, onCriteriaChange }) {


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onCriteriaChange(criteria.id, name, value);  
    };


    return (
        <>
            <tr>
                {/* First column */}
                <td className="text-center" style={{fontWeight:700}}>
                    <TextInput
                    name="description" 
                    value={criteria.description}
                    onChange={handleInputChange}
                    />
                    
                </td>
            
                {/* Second column - criteria weight */}
                <td className="text-center" style={{fontWeight:400}}>
                   <TextInput
                    name="weight"
                    value={criteria.weight}
                    onChange={handleInputChange}
                   />
                </td>

            </tr>
        </>
    );
}

export default RubricRow;
