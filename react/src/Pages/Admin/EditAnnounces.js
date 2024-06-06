import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar'
import ContentCard from '../../Components/ContentCard/ContentCard';
import TextInput from '../../Components/TextInput/TextInput';
import Loader from '../../Components/Loader/Loader';
import Widget from '../../Components/Widget/Widget';
import VideoCard from '../../Components/VideoCard/VideoCard';
import DropdownMenuB from '../../Components/DropdownMenu/DropdownMenuB';
import Popup from '../../Components/Popup/Popup';


function EditAnnouncePage() {

    const { anunciosId } = useParams(); // Retrieve the userId from the URL parameters
    const [anuncio, setAnuncio] = useState({ title: '', description: '', multimedia:'',audience:'' }); // Include enrollment in state
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
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
                setType(false);
                setContent('Anuncio correctamente actualizado!');
                setShowModal(true); // Redirect to home or users list page
            } else {
                setType(true);
                setContent('Fallo al actualizar el anuncio.');
                setShowModal(true);
            }
        })
        .catch(error => {
            console.error('Error actualizando al usuario:', error);
            alert('Un error ocurrió, inténtelo después otra vez.');
        });
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
      };

    if (loading) {
        return (
        <>
        <NavigationBar NameSection={"Modificar Anuncio"}/>
        <div style={{display:'flex', justifyContent:'center'}}>
        <Loader/>
        </div>
        </>);
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
                                        <Widget title={"Anuncio"} centered={true} content={`${process.env.PUBLIC_URL}/${'poster.jpg'}`} />
                                       <TextInput
                                            label="Multimedia"
                                            name="multimedia"
                                            value={anuncio.multimedia}
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
                                        <DropdownMenuB
                                            title={"Audiencia"}
                                            onSelect={handleOptionSelect}
                                            value={anuncio.audience}
                                        />
                                    </> 
                                } />
                              <div className="d-flex justify-content-center mt-3">
                                <button type="submit" className="btn btn-primary custom-primaty-btn">Actualizar Anuncio</button>
                                {showModal && <Popup content={content} onClose={()=>setShowModal(false)} error={type} ruta={'/Admin/anuncios'}/>}
                              </div>
                            </form>
                        </div>
                    </div>    
                </div>
        </>
    );
}

export default EditAnnouncePage;
