import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar'
import ContentCard from '../../Components/ContentCard/ContentCard';
import TextInput from '../../Components/TextInput/TextInput';
import Loader from '../../Components/Loader/Loader';

function EditUserPage() {
    const { userId } = useParams(); // Retrieve the userId from the URL parameters
    const [user, setUser] = useState({ name: '', email: '', enrollment: '' }); // Include enrollment in state
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch existing user data
    useEffect(() => {
        fetch(`http://localhost:8000/users/${userId}`)
            .then(response => response.json())
            .then(data => {
                setUser({ name: data.name, email: data.email, enrollment: data.enrollment }); // Include enrollment
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user:', error);
                setLoading(false);
            });
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8000/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(response => {
            if (response.ok) {
                alert('User updated successfully!');
                navigate('/usuarios'); // Redirect to home or users list page
            } else {
                alert('Failed to update user.');
            }
        })
        .catch(error => {
            console.error('Error updating user:', error);
            alert('An error occurred. Please try again.');
        });
    };

    if (loading) {
        return <div style={{display:'flex', justifyContent:'center'}}>
        <Loader/>
        </div>;
    }

    return (

        <>
            <NavigationBar NameSection={"Modificar Usuarios"}/>
                <div className="container"> 
                    <div className="row justify-content-center mt-3">
                        <div className="col-md-12">
                            <form onSubmit={handleSubmit}>
                                <ContentCard title="Modificar Usuario" content={  
                                    <>
                                        <TextInput
                                            label="Name"
                                            name="name"
                                            value={user.name}
                                            onChange={handleChange}
                                            required
                                        />

                                        {user.enrollment ? ( // Check if enrollment exists
                                            <TextInput
                                                label="Enrollment"
                                                name="enrollment"
                                                value={user.enrollment}
                                                onChange={handleChange}
                                                required
                                            />
                                        ) : (
                                            <TextInput
                                                label="Email"
                                                name="email"
                                                value={user.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        )}
                                        
                                    </> 
                                } />
                              <div className="d-flex justify-content-center mt-3">
                                <button type="submit" className="btn btn-primary custom-primaty-btn">Actualizar Usuario</button>
                              </div>
                            </form>
                        </div>
                    </div>    
                </div>
        </>
    );
}

export default EditUserPage;
