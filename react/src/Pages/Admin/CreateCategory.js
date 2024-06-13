import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar'
import ContentCard from '../../Components/ContentCard/ContentCard';
import TextInput from '../../Components/TextInput/TextInput';
import Popup from '../../Components/Popup/Popup';

function CreateCategoryPage() {
    const [category, setCategory] = useState({ title: '', description: '',isActive:1 }); // Inicializa el estado con valores vacíos
    const [loading, setLoading] = useState(false); // Estado de carga
    const [content, setContent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Inicia el estado de carga

        fetch('https://140.84.165.119/api/Admin/Categories/create', {
            method: 'POST', // Cambia a POST para crear un nuevo registro
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category),
        })
        .then(response => {
            setLoading(false); // Termina el estado de carga
            if (response.ok) {
                setType(false);
                setContent('Categoría creada correctamente!');
                setShowModal(true);
            } else {
                setType(true);
                setContent('Fallo al crear la categoría.');
                setShowModal(true);
            }
        })
        .catch(error => {
            console.error('Error al crear la categoría:', error);
            setLoading(false); // Termina el estado de carga
            alert('Un error ocurrió, inténtelo después otra vez.');
        });
    };

    return (
        <>
            <NavigationBar NameSection={"Crear Categoría"} />
            <div className="container">
                <div className="row justify-content-center mt-3">
                    <div className="col-md-12">
                        <form onSubmit={handleSubmit}>
                            <ContentCard title="Crear Nueva Categoría" content={
                                <>
                                    <TextInput
                                        label="Titulo"
                                        name="title"
                                        value={category.title}
                                        onChange={handleChange}
                                        required
                                    />
                                    <TextInput
                                        label="Descripción"
                                        name="description"
                                        value={category.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </>
                            } />
                            <div className="d-flex justify-content-center mt-3">
                                <button type="submit" className="btn btn-primary custom-primary-btn">
                                    {loading ? 'Creando...' : 'Crear Categoría'}
                                </button>
                                {showModal && <Popup content={content} onClose={()=>setShowModal(false)} error={type} ruta={'/Admin/categorias'}/>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateCategoryPage;