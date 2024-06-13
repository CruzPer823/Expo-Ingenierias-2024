import React, { useState, useEffect } from 'react';
import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar';
import ContentCard from '../../Components/ContentCard/ContentCard';
import Popup from '../../Components/Popup/Popup';
import DisplayAnnounce from '../../Components/Display/DisplayAnnounce';
import UploadFile from '../../Components/UploadFile/UploadFile';
import axios from 'axios';

function AdminMap() {
    const idMap=1;
    const [mapa, setMapa] = useState({ map_image:'' });
    const [content, setContent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [oldFile, setOldFile] = useState(null);

    useEffect(() => {
        setLoading(true);

        fetch("https://140.84.165.119/api/map/get/map/1")
        .then(response => response.json())
            .then(data => {
                setMapa({ map_image: data[0].map_image });
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al obtener el Mapa:', error);
                setLoading(false);
            });
    }, []); // Empty array to run the effect only once

    const handleFileSelect = (file) => {
        setOldFile(mapa.map_image);
        setSelectedFile(file);
        setMapa(prevState => ({ ...prevState, map_image: file.name }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedFile) {
            const formData = new FormData();
            formData.append('image', selectedFile);

            try {
                const response = await fetch('https://140.84.165.119/api/Admin/uploadAnnounceImage', {
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

        if (oldFile) {
            try {
                await fetch(`https://140.84.165.119/api/Admin/deleteImage/${oldFile}`, {
                    method: 'DELETE',
                });
            } catch (error) {
                console.error('Error deleting the old image:', error);
            }
        }

        fetch(`https://140.84.165.119/api/map/updateMap/1`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mapa),
        })
            .then(response => {
                if (response.ok) {
                    setType(false);
                    setContent('El mapa fue correctamente actualizado!');
                    setShowModal(true);
                } else {
                    setType(true);
                    setContent('Fallo al actualizar el mapa.');
                    setShowModal(true);
                }
            })
            .catch(error => {
                console.error('Error actualizando el mapa:', error);
                alert('Un error ocurrió, inténtelo después otra vez.');
            });
    };

    return (
        <>
            <NavigationBar NameSection={"Subir Mapa"} />
            <div className="container">
                <div className="row justify-content-center mt-3">
                    <div className="col-md-12">
                        <form onSubmit={handleSubmit}>
                            <ContentCard title="Subir Mapa" content={
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        
                                    </div>
                                    {selectedFile ? null : <DisplayAnnounce label={"Multimedia"} src={mapa.map_image} alt={"Mapa"} />}
                                    {selectedFile ?
                                        <>
                                            <p style={{ fontWeight: 700, marginTop: '1vh' }}>El mapa se ha cargado!</p>
                                            <UploadFile onFileSelect={handleFileSelect} />
                                        </> :
                                        <UploadFile onFileSelect={handleFileSelect} />
                                    }
                                </>
                            } />
                            <div className="d-flex justify-content-center mt-3">
                                <button type="submit" className="btn btn-primary custom-primary-btn">
                                    {loading ? 'Actualizando...' : 'Actualizar Mapa'}
                                </button>
                                {showModal && <Popup content={content} onClose={() => setShowModal(false)} error={type} ruta={'/Admin'} />}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminMap;
