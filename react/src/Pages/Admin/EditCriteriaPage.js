import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar';
import ContentCard from '../../Components/ContentCard/ContentCard';
import TextInput from '../../Components/TextInput/TextInput';

function EditCriteriaPage() {
    const { criteriaId } = useParams(); // Retrieve the criteriaId from the URL parameters
    const [criteria, setCriteria] = useState({ description: '', weight: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Access the navigate function

    useEffect(() => {
        // Fetch the criteria data from the API
        const fetchCriteria = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/Admin/getCriteria/${criteriaId}`);
                setCriteria(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
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
            window.alert("Criteria updated successfully");
            navigate('/Admin/rubrica'); // Navigate to the desired page after the alert
        } catch (err) {
            window.alert(`Error updating criteria`);
            navigate('/Admin/rubrica'); // Navigate to the desired page after the alert
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <NavigationBar NameSection={"Modificar Usuarios"} />
            <div className="container">
                <div className="row justify-content-center mt-3">
                    <div className="col-md-12">
                        <form onSubmit={handleSubmit}>
                            <ContentCard 
                                title="Modificar Criterio" 
                                content={
                                    <>
                                        <TextInput
                                            label="Description"
                                            name="description"
                                            value={criteria.description}
                                            onChange={handleChange}
                                            required
                                        />
                                        <TextInput
                                            label="Weight"
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
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditCriteriaPage;
