import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar'
import ContentCard from '../../Components/ContentCard/ContentCard';
import TextInput from '../../Components/TextInput/TextInput';
import Popup from '../../Components/Popup/Popup';
import DropdownMenuB from '../../Components/DropdownMenu/DropdownMenuB';
import DisplayAnnounce from '../../Components/Display/DisplayAnnounce';
import UploadFile from '../../Components/UploadFile/UploadFile';
import axios from 'axios';

function CreateAnnouncePage() {
    const [announce, setAnnounce] = useState({ title: '', description: '', multimedia:'',audience:'all' }); // Inicializa el estado con valores vacíos
    const [content, setContent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false); // Estado de carga

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnnounce(prevState => ({ ...prevState, [name]: value }));
    };

    const handleOptionSelect = (option) => {
        setAnnounce(prevState => ({ ...prevState, audience: option }));
      };

    const handleFileSelect = (file) => {
        setSelectedFile(file);
        setAnnounce(prevState => ({ ...prevState, multimedia: file.name }));
    };
    

    const fetchEmails = async (audience) => {
        let emails = [];
        try {
            if (audience === 'students' || audience === 'all') {
                const studentResponse = await axios.get('http://localhost:8000/students');
                emails = emails.concat(studentResponse.data.map(student => `${student.enrollment}@tec.mx`));
            }
            if (audience === 'teachers' || audience === 'all') {
                const teacherResponse = await axios.get('http://localhost:8000/person');
                emails = emails.concat(teacherResponse.data.map(person => person.email));
            }
            if (audience === 'judges') {
                const judgeResponse = await axios.get('http://localhost:8000/person');
                emails = emails.concat(judgeResponse.data.filter(person => person.isJudge).map(person => person.email));
            }
        } catch (error) {
            console.error('Error fetching emails:', error);
        }
        return emails;
    };


    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true); // Inicia el estado de carga

        const emails = await fetchEmails(announce.audience);

        

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
                setType(false);
                setContent('Anuncio creado correctamente!');
                setShowModal(true); // Redirige a la lista de áreas

                // Enviar correos electrónicos
                sendAnnouncementEmails(emails, announce, selectedFile);

            } else {
                setType(true);
                setContent('Fallo al crear el anuncio.');
                setShowModal(true);
            }
        })
        .catch(error => {
            console.error('Error al crear el Anuncio:', error);
            setLoading(false); // Termina el estado de carga
            setType(true);
            setContent('Un error ocurrió, inténtelo después otra vez.');
            setShowModal(true);
        });

        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        const sendAnnouncementEmails = async (emails, announce, selectedFile) => {

            

            const getAudienceLabel = (audience) => {
                switch (audience) {
                    case 'students':
                        return 'Estudiante';
                    case 'teachers':
                        return 'Docente';
                    case 'judges':
                        return 'Juez';
                    default:
                        return 'Participante';
                }
            };
    
            const audienceLabel = getAudienceLabel(announce.audience);

            for (const email of emails) {
            
                const delayTime = Math.floor(Math.random() * 10) + 1;
                await delay(delayTime * 1000);
                
                const templateParams = {
                    audienceType: audienceLabel,
                    announcement: announce.description,
                    studentEmail: email,
                };
    
                
                    try {
                        await axios.post('http://localhost:8000/send-email', {
                            templateName: 'ad',
                            templateParams, 
                        });
                    } catch (error) {
                        console.error(`Error al enviar el correo a ${email}:`, error);
                    }
                
            }
        };
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
                                    <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                                    <h2 className="text-input-label" >Multimedia:</h2>
                                    </div>
                                    {selectedFile?<><p style={{fontWeight:700,marginTop:'1vh'}}>Imagen cargada!!</p> <UploadFile onFileSelect={handleFileSelect}/></>:<UploadFile onFileSelect={handleFileSelect}/>}
                                    <DropdownMenuB
                                            title={"Audiencia"}
                                            onSelect={handleOptionSelect}
                                            value={announce.audience}
                                            
                                        />
                                </>
                            } />
                            <div className="d-flex justify-content-center mt-3">
                                <button type="submit" className="btn btn-primary custom-primary-btn">
                                    {loading ? 'Creando...' : 'Crear Anuncio'}
                                </button>
                                {showModal && <Popup content={content} onClose={()=>setShowModal(false)} error={type} ruta={'/Admin/anuncios'}/>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateAnnouncePage;
