import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar'
import ContentCard from '../../Components/ContentCard/ContentCard';
import TextInput from '../../Components/TextInput/TextInput';
import Loader from '../../Components/Loader/Loader';
import Popup from '../../Components/Popup/Popup';

function EditAreaPage() {
    const { areaId } = useParams(); // Retrieve the userId from the URL parameters
    const [area, setArea] = useState({ name: '', description: '' }); // Include enrollment in state
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState(false);

    // Fetch existing user data
    useEffect(() => {
        fetch(`http://localhost:8000/Admin/Areas/${areaId}`)
            .then(response => response.json())
            .then(data => {
                setArea({ name: data.name, description: data.description});
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al obtener el Area:', error);
                setLoading(false);
            });
    }, [areaId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArea(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8000/Admin/Areas/update/${areaId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(area),
        })
        .then(response => {
            if (response.ok) {
                setType(false);
                setContent('Area correctamente actualizada!');
                setShowModal(true);
            } else {
                setType(true);
                setContent('Fallo al actualizar el área.');
                setShowModal(true);
            }
        })
        .catch(error => {
            console.error('Error actualizando al usuario:', error);
            alert('Un error ocurrió, inténtelo después otra vez.');
        });
    };

    if (loading) {
        return (
        <>
            <NavigationBar NameSection={"Editar Área"}/>
            <div style={{display:'flex', justifyContent:'center'}}>
            <Loader/>
            </div>
        </>
        );
    }

    return (

        <>
            <NavigationBar NameSection={"Modificar Área"}/>
                <div className="container"> 
                    <div className="row justify-content-center mt-3">
                        <div className="col-md-12">
                            <form onSubmit={handleSubmit}>
                                <ContentCard title="Modificar Área" content={  
                                    <>
                                        <TextInput
                                            label="Nombre"
                                            name="name"
                                            value={area.name}
                                            onChange={handleChange}
                                            required
                                        />
                                        <TextInput
                                            label="Descripción"
                                            name="description"
                                            value={area.description}
                                            onChange={handleChange}
                                            required
                                        />
                                       
                                        
                                    </> 
                                } />
                              <div className="d-flex justify-content-center mt-3">
                                <button type="submit" className="btn btn-primary custom-primaty-btn">Actualizar área</button>
                                {showModal && <Popup content={content} onClose={()=>setShowModal(false)} error={type} ruta={'/Admin/areas'}/>}
                              </div>
                            </form>
                        </div>
                    </div>    
                </div>
        </>
    );
}

export default EditAreaPage;
