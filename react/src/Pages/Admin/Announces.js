import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar'
import AnnounceCardList from '../../Components/AnnounceCard/AnnounceCard';
import Loader from '../../Components/Loader/Loader';
import SearchBar from '../../Components/SearchBar/SearchBar';
import RoleFilterAnnounces from '../../Components/RoleFilter/RoleFilterAnnounces';
import '../../Components/AreaCard/AreaCard.css';

const Announ_API='https://140.84.165.119/api/Admin/Announces/';

function Announces(){

    const [announce, setAnnounce] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
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

    const handleSearch = (term) => {
        setSearchTerm(term);
    };
    
    const handleFilter = (role) => {
        setSelectedOption(role);
    };

    return(
        <>
            <NavigationBar NameSection={"Anuncios"}/>
            <div className="contenedorSuperior" style={{marginTop:'4vh'}}>
                    <SearchBar onSearch={handleSearch}/>
                    <RoleFilterAnnounces
                    onRoleFilter={handleFilter}
                    />
                </div>
            <div className='contenedor'>
                {loading? (
                    <Loader/>
                ) : (
                    <>
                    <AnnounceCardList data={announce} filter={selectedOption} searchTerm={searchTerm}/>
                    </>
                )
                }
            </div>
        </>
    );
}

export default Announces;