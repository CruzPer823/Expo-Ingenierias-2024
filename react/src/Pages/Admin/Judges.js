import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios'; // Import axios
import Table from '../../Components/Table/Table';
import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar';

function Judges() {
    const { projectId } = useParams(); // Retrieve projectId from URL params
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/Admin/getAllJudges?projectId=${projectId}`);
                setData(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [projectId]); // Add projectId to dependency array

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <NavigationBar NameSection={"Jueces"} />
            <div className="container-fluid mt-3">
                <div className="row mt-3">
                    <Table data={data} judgeTable={true} />
                </div>
            </div>
        </>
    );
}

export default Judges;
