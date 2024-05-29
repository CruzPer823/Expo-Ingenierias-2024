import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar'
import ContentCard from '../../Components/ContentCard/ContentCard';
import TextInput from '../../Components/TextInput/TextInput';

function CreateAreaPage() {
    const [area, setArea] = useState({ name: '', description: '',IsActive:1 }); // Inicializa el estado con valores vacíos
    const [loading, setLoading] = useState(false); // Estado de carga
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArea(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Inicia el estado de carga

        fetch('http://localhost:8000/Admin/Areas/create', {
            method: 'POST', // Cambia a POST para crear un nuevo registro
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(area),
        })
        .then(response => {
            setLoading(false); // Termina el estado de carga
            if (response.ok) {
                alert('Área creada correctamente!');
                navigate('/areas'); // Redirige a la lista de áreas
            } else {
                alert('Fallo al crear el área.');
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
            <NavigationBar NameSection={"Crear Área"} />
            <div className="container">
                <div className="row justify-content-center mt-3">
                    <div className="col-md-12">
                        <form onSubmit={handleSubmit}>
                            <ContentCard title="Crear Nueva Área" content={
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
                                <button type="submit" className="btn btn-primary custom-primary-btn">
                                    {loading ? 'Creando...' : 'Crear Área'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateAreaPage;