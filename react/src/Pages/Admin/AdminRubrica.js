import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Table from '../../Components/Table/Table';
import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar';

function AdminRubrica() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/Admin/getCriterias')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    return (
        <>
            <NavigationBar NameSection={"Rubrica"} />
            <div className="container-fluid mt-3">
                <div className="row mt-3">
                    <Table data={data} rubricTable={true} />
                </div>
            </div>
        </>
    );
}

export default AdminRubrica;
