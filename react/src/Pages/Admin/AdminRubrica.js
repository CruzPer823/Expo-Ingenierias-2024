import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Table from '../../Components/Table/Table';
import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar';
import Loader from '../../Components/Loader/Loader';

function AdminRubrica() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8000/Admin/getCriterias')
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    return (
        <>
            <NavigationBar NameSection={"Rúbrica"} />
            {loading?(
                <div style={{display:'flex', justifyContent:'center'}}>
                <Loader/>
                </div>
            ):(<div style={{display:'flex',justifyContent:'center', alignItems:'center',height:'60vh',margin:'1vw'}}>
                <div className="container-fluid mt-3">
                    <div className="row mt-3" >
                        <Table data={data} rubricTable={true} />
                    </div>
                </div>
            </div>
            )}
        </>
    );
}

export default AdminRubrica;
