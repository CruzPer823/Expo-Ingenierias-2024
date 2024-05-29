import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar'
import ContentCard from '../../Components/ContentCard/ContentCard';
import TextInput from '../../Components/TextInput/TextInput';
import Loader from '../../Components/Loader/Loader';
import { Dropdown } from 'react-bootstrap';

function EditAnnouncePage() {
    const { anunciosId } = useParams(); // Retrieve the userId from the URL parameters
    const [anuncio, setAnuncio] = useState({ title: '', description: '', multimedia:'',audience:'' }); // Include enrollment in state
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch existing user data
    useEffect(() => {
        fetch(`http://localhost:8000/Admin/Announces/${anunciosId}`)
            .then(response => response.json())
            .then(data => {
                setAnuncio({ title: data.title, description: data.description, audience: data.audience,multimedia:data.multimedia});
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al obtener el Anuncio:', error);
                setLoading(false);
            });
    }, [anunciosId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnuncio(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8000/Admin/Announce/update/${anunciosId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(anuncio),
        })
        .then(response => {
            if (response.ok) {
                alert('Anuncio correctamente actualizado!');
                navigate('/anuncios'); // Redirect to home or users list page
            } else {
                alert('Fallo al actualizar el anuncio.');
            }
        })
        .catch(error => {
            console.error('Error actualizando al usuario:', error);
            alert('Un error ocurrió, inténtelo después otra vez.');
        });
    };

    if (loading) {
        return <div style={{display:'flex', justifyContent:'center'}}>
        <Loader/>
        </div>;
    }

    return (

        <>
            <NavigationBar NameSection={"Modificar Anuncio"}/>
                <div className="container"> 
                    <div className="row justify-content-center mt-3">
                        <div className="col-md-12">
                            <form onSubmit={handleSubmit}>
                                <ContentCard title="Modificar Anuncio" content={  
                                    <>
                                        <TextInput
                                            label="Titulo"
                                            name="title"
                                            value={anuncio.title}
                                            onChange={handleChange}
                                            required
                                        />
                                        <TextInput
                                            label="Descripcion"
                                            name="description"
                                            value={anuncio.description}
                                            onChange={handleChange}
                                            required
                                        />
                                       <TextInput
                                            label="Multimedia"
                                            name="multimedia"
                                            value={anuncio.multimedia}
                                            onChange={handleChange}
                                            required
                                        />
                                            
                                        
                                    </> 
                                } />
                              <div className="d-flex justify-content-center mt-3">
                                <button type="submit" className="btn btn-primary custom-primaty-btn">Actualizar Anuncio</button>
                              </div>
                            </form>
                        </div>
                    </div>    
                </div>
        </>
    );
}

export default EditAnnouncePage;
