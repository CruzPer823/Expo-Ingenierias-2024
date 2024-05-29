import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar'
import ContentCard from '../../Components/ContentCard/ContentCard';
import TextInput from '../../Components/TextInput/TextInput';
import Loader from '../../Components/Loader/Loader';

function EditCategoryPage() {
    const { categoriaId } = useParams(); // Retrieve the userId from the URL parameters
    const [categoria, setCategory] = useState({ title: '', description: '' }); // Include enrollment in state
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch existing user data
    useEffect(() => {
        fetch(`http://localhost:8000/Admin/Categories/${categoriaId}`)
            .then(response => response.json())
            .then(data => {
                setCategory({ title: data.title, description: data.description});
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al obtener la categoria:', error);
                setLoading(false);
            });
    }, [categoriaId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8000/Admin/Categories/update/${categoriaId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoria),
        })
        .then(response => {
            if (response.ok) {
                alert('Categoria correctamente actualizada!');
                navigate('/categorias'); // Redirect to home or users list page
            } else {
                alert('Fallo al actualizar el área.');
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
            <NavigationBar NameSection={"Modificar Categoría"}/>
                <div className="container"> 
                    <div className="row justify-content-center mt-3">
                        <div className="col-md-12">
                            <form onSubmit={handleSubmit}>
                                <ContentCard title="Modificar Categoría" content={  
                                    <>
                                        <TextInput
                                            label="name"
                                            name="title"
                                            value={categoria.title}
                                            onChange={handleChange}
                                            required
                                        />
                                        <TextInput
                                            label="description"
                                            name="description"
                                            value={categoria.description}
                                            onChange={handleChange}
                                            required
                                        />
                                       
                                        
                                    </> 
                                } />
                              <div className="d-flex justify-content-center mt-3">
                                <button type="submit" className="btn btn-primary custom-primaty-btn">Actualizar categoría</button>
                              </div>
                            </form>
                        </div>
                    </div>    
                </div>
        </>
    );
}

export default EditCategoryPage;
