import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar'
import AnnounceCardList from '../../Components/AnnounceCard/AnnounceCard';
import Loader from '../../Components/Loader/Loader';
import '../../Components/AreaCard/AreaCard.css';

const Announ_API='http://localhost:8000/Admin/Announces/';

function Announces(){

    const [announce, setAnnounce] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAnnounce = async () => {
    
        try {
            const response = await axios.get(Announ_API);
            setAnnounce(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching areas:", error);
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchAnnounce();
    }, []);


    return(
        <>
            <NavigationBar NameSection={"Anuncios"}/>
            <div className='contenedor'>
                {loading? (
                    <Loader/>
                ) : (
                    <>
                    <AnnounceCardList data={announce}/>
                    </>
                )
                }
            </div>
        </>
    );
}

export default Announces;