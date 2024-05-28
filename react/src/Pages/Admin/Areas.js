import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar'
import AreasCardList from '../../Components/AreaCard/AreaCard';
import AddCard from '../../Components/AddCard/AddCard';
import Loader from '../../Components/Loader/Loader';
import '../../Components/AreaCard/AreaCard.css';

const AREAS_API = 'http://localhost:8000/Admin/Areas/';


function Areas(){
    
    const [areas, setAreas] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
    
        try {
            const response = await axios.get(AREAS_API);
            setAreas(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching areas:", error);
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchProjects();
    }, []);

    return(
        <>
            <NavigationBar NameSection={"Áreas"}/>
            <div className='contenedor'>
                {loading? (
                    <Loader/>
                ) : (
                    <>
                    <AreasCardList data={areas}/>
                    </>
                )
                }
            </div>
            
        </>
    );
}

export default Areas;