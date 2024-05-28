import React, { useState, useEffect } from 'react';
import Table from '../../Components/Table/Table';
import { userTabledata } from '../../MockData/MockData';
import SearchBar from '../../Components/SearchBar/SearchBar';
import RoleFilter from '../../Components/RoleFilter/RoleFilter';
import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar';
import Loader from '../../Components/Loader/Loader';


function Users() {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/users');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleRoleFilter = (role) => {
        setSelectedRole(role);
    };

    if (loading) {
        return <><NavigationBar NameSection={"Usuarios"} />
        <div style={{display:'flex', justifyContent:'center'}}>
        <Loader/>
        </div>
        </>
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <NavigationBar NameSection={"Usuarios"} />
            <div className="container-fluid mt-3">
                <div className="row">
                    <SearchBar onSearch={handleSearch} />
                    <RoleFilter onRoleFilter={handleRoleFilter} />
                </div>

                <div className="row mt-3">
                    <Table data={data} searchQuery={searchQuery} selectedRole={selectedRole} />
                </div>
            </div>
        </>
    );
}

export default Users;
