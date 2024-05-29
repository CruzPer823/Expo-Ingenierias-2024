import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar'
import ContentCard from '../../Components/ContentCard/ContentCard';
import TextInput from '../../Components/TextInput/TextInput';

function CreateAnnouncePage() {
    const [announce, setAnnounce] = useState({ nametitle: '', description: '', multimedia:'',audience:'all' }); // Inicializa el estado con valores vacíos
    const [loading, setLoading] = useState(false); // Estado de carga
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnnounce(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Inicia el estado de carga

        fetch('http://localhost:8000/Admin/Announce/create', {
            method: 'POST', // Cambia a POST para crear un nuevo registro
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(announce),
        })
        .then(response => {
            setLoading(false); // Termina el estado de carga
            if (response.ok) {
                alert('Anuncio creado correctamente!');
                navigate('/anuncios'); // Redirige a la lista de áreas
            } else {
                alert('Fallo al crear el anuncio.');
            }
        })
        .catch(error => {
            console.error('Error al crear el área:', error);
            setLoading(false); // Termina el estado de carga
            alert('Un error ocurrió, inténtelo después otra vez.');
        });
    };

    return (
        <>
            <NavigationBar NameSection={"Crear Anuncio"} />
            <div className="container">
                <div className="row justify-content-center mt-3">
                    <div className="col-md-12">
                        <form onSubmit={handleSubmit}>
                            <ContentCard title="Crear Nuevo Anuncio" content={
                                <>
                                    <TextInput
                                        label="Nombre"
                                        name="title"
                                        value={announce.title}
                                        onChange={handleChange}
                                        required
                                    />
                                    <TextInput
                                        label="Descripción"
                                        name="description"
                                        value={announce.description}
                                        onChange={handleChange}
                                        required
                                    />
                                    <TextInput
                                            label="Multimedia"
                                            name="multimedia"
                                            value={announce.multimedia}
                                            onChange={handleChange}
                                            required
                                        />
                                </>
                            } />
                            <div className="d-flex justify-content-center mt-3">
                                <button type="submit" className="btn btn-primary custom-primary-btn">
                                    {loading ? 'Creando...' : 'Crear Anuncio'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateAnnouncePage;