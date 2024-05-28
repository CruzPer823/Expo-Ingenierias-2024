import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCardsList from '../../Components/ProjectCard/ProjectCard';
import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar';
import SearchBar from '../../Components/SearchBar/SearchBar';
import DropdownMenu from '../../Components/DropdownMenu/DropdownMenu'; // Import DropdownMenu component
import Loader from '../../Components/Loader/Loader';
import '../../Components/ProjectCard/ProjectCard.css';

const URI = 'http://localhost:8000/Ediciones/';
const PROJECTS_API = 'http://localhost:8000/projects/';

function Projects() {
    const [projects, setProjects] = useState([]);
    const [selectedEdition, setSelectedEdition] = useState(null); // State to track selected edition
    const [searchTerm, setSearchTerm] = useState(""); // State to track search term
    const [loading, setLoading] = useState(true); // State to track loading status

    // Function to fetch projects from API using Axios
    const fetchProjects = async () => {
        try {
            const response = await axios.get(PROJECTS_API);
            setProjects(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching projects:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <>  
            <NavigationBar NameSection={"Proyectos"}/>
            <div className="container-fluid mt-3">
                <div className="contenedorSuperior">
                    <SearchBar onSearch={handleSearch} />
                        <DropdownMenu 
                            title="Selecciona la Edición"
                            url={URI}
                            onSelect={(edition) => {
                                if (edition === "Selecciona la Edición") {
                                    setSelectedEdition(null);
                                } else {
                                    setSelectedEdition(edition);
                                }
                            }}
                        />   
                </div>
                <div className="contenedor">
                    {loading ? (
                        <Loader/>// Show a loading message while data is being fetched
                    ) : (
                        <ProjectCardsList data={projects} filter={selectedEdition} searchTerm={searchTerm} />
                    )}
                </div>
            </div>
        </>
    );
}

export default Projects;
