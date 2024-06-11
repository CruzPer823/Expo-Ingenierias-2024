import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar'
import ContentCard from '../../Components/ContentCard/ContentCard';
import TextInput from '../../Components/TextInput/TextInput';
import Loader from '../../Components/Loader/Loader';
import DropdownMenuB from '../../Components/DropdownMenu/DropdownMenuB';
import Popup from '../../Components/Popup/Popup';
import DisplayAnnounce from '../../Components/Display/DisplayAnnounce';
import UploadFile from '../../Components/UploadFile/UploadFile';

function EditAnnouncePage() {
    const { anunciosId } = useParams(); // Retrieve the userId from the URL parameters
    const [anuncio, setAnuncio] = useState({ title: '', description: '', multimedia:'',audience:'' }); // Include enrollment in state
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [oldFile, setOldFile] = useState(null);
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

    const handleOptionSelect = (option) => {
        setAnuncio(prevState => ({ ...prevState, audience: option }));
      };
    const handleFileSelect = (file) => {
        setOldFile(anuncio.multimedia);
        setSelectedFile(file);
        setAnuncio(prevState => ({ ...prevState, multimedia: file.name }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (selectedFile) {
            const formData = new FormData();
            formData.append('image', selectedFile);

            try {
                const response = await fetch('http://localhost:8000/Admin/uploadAnnounceImage', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    setType(true);
                    setContent('Fallo al subir la imagen.');
                    setShowModal(true);
                    return;
                }
            } catch (error) {
                console.error('Error subiendo la imagen:', error);
                setType(true);
                setContent('Un error ocurrió al subir la imagen.');
                setShowModal(true);
                return;
            }
        }
        await fetch(`http://localhost:8000/Admin/deleteImage/${oldFile}`,{
            method:`DELETE`,
        });
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
            console.error('Error actualizando al anuncio:', error);
            alert('Un error ocurrió, inténtelo después otra vez.');
        });
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
                                        {selectedFile? <><p style={{fontWeight:700,marginTop:'1vh'}}>Imagen cargada!!</p></>: <DisplayAnnounce label={"Multimedia"} src={anuncio.multimedia} alt={"Anuncio"}/>}
                                         
                                         <UploadFile onFileSelect={handleFileSelect}/>

                                          <TextInput
                                            label="Descripción"
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
