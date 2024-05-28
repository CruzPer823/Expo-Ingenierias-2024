import React from 'react';

import Table from '../../Components/Table/Table';
import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar';

function AdminRubrica() {

    return (
        <>
            <NavigationBar NameSection={"Rubrica"} />
            <div className="container-fluid mt-3">
                <div className="row mt-3">
                    {/* <Table  data={}/> */}
                </div>
            </div>
        </>
    );
}

export default AdminRubrica;
