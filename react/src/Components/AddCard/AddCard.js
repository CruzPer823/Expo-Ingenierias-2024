import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../AreaCard/AreaCard.css';
import imagen from './new.png';

export default function AddCard({name}){
    
    const navigate = useNavigate();

    

    const handleEditClick = () => {
        // Redirect to EditUserPage and pass the userId as a URL parameter
        navigate(`/${name}/nuevo`);
    };
    return (
        <div className='tarj'>
           <button className='addNew' onClick={handleEditClick}><img src={imagen} className="addImg" alt="Project Image"/></button>       
       </div>
    );
}