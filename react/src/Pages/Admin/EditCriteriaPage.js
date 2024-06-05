import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Loader from '../../Components/Loader/Loader';
import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar';
import ContentCard from '../../Components/ContentCard/ContentCard';
import TextInput from '../../Components/TextInput/TextInput';
import Loader from '../../Components/Loader/Loader';
import Popup from '../../Components/Popup/Popup';

function EditCriteriaPage() {
    const { criteriaId } = useParams(); // Retrieve the criteriaId from the URL parameters
    const [criteria, setCriteria] = useState({ description: '', weight: '' });
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState(false);

    useEffect(() => {
        // Fetch the criteria data from the API
        const fetchCriteria = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/Admin/getCriteria/${criteriaId}`);
                setCriteria(response.data);
                setLoading(false);
            } catch (err) {
                setContent(err.message);
                setLoading(false);
            }
        };

        fetchCriteria();
    }, [criteriaId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCriteria((prevCriteria) => ({
            ...prevCriteria,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedCriteria = {
                description: criteria.description,
                weight: parseInt(criteria.weight) // Ensure weight is sent as a number
            };
            await axios.put(`http://localhost:8000/Admin/updateCriteria/${criteriaId}`, updatedCriteria, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setType(false);
            setContent("El criterio ha sido actualizado correctamente");
           setShowModal(true); // Navigate to the desired page after the alert
        } catch (err) {
            setType(true);
            setContent(err.response.data.message);
            setShowModal(true);
            //navigate('/Admin/rubrica'); // Navigate to the desired page after the alert
        }
    };

    if (loading) return (
        <>
        <NavigationBar NameSection={"Modificar Criterios"} />
        <div style={{display:'flex', justifyContent:'center'}}>
                <Loader/>
                </div>
        </>
    );

     return (
        <>
            <NavigationBar NameSection={"Modificar Criterios"} />
            <div className="container">
                <div className="row justify-content-center mt-3">
                    <div className="col-md-12">
                        <form onSubmit={handleSubmit}>
                            <ContentCard 
                            
                                title="Modificar Criterio" 
                                content={
                                    
                                    <>
                                        <TextInput
                                            label="Descripción"
                                            name="description"
                                            value={criteria.description}
                                            onChange={handleChange}
                                            required
                                        />
                                        <TextInput
                                            label="Valor(%)"
                                            name="weight"
                                            value={criteria.weight}
                                            onChange={handleChange}
                                            required
                                        />
                                    </>
                                } 
                            />

                            <div className="d-flex justify-content-center mt-3">
                                <button type="submit" className="btn btn-primary custom-primaty-btn">
                                    Actualizar Criterio
                                </button>
                            {showModal && <Popup content={content} onClose={()=>setShowModal(false)} error={type} ruta={'/Admin/rubrica'}/>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditCriteriaPage;
