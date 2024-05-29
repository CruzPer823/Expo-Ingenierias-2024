import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar'
import CategoriesCardList from '../../Components/CategoriesCard/CategoriesCard';
import Loader from '../../Components/Loader/Loader';
import '../../Components/AreaCard/AreaCard.css';

const CATEGORIES_API = 'http://localhost:8000/Admin/Categories/';


function Categorias(){
    
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCategories = async () => {
    
        try {
            const response = await axios.get(CATEGORIES_API);
            setCategories(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching categories:", error);
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchCategories();
    }, []);

    return(
        <>
            <NavigationBar NameSection={"Categorías"}/>
            <div className='contenedor'>
                {loading? (
                    <Loader/>
                ) : (
                    <CategoriesCardList data={categories}/>
                )}
            </div>
            
        </>
    );
}

export default Categorias;