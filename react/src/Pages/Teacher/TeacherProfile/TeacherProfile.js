import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import Menu from '../../../Components/Togglebar/togglebar.js';
import React, { useState,useEffect,useRef} from "react";
import { useParams } from "react-router-dom";
import './TeacherProfile.css';


function Datos({name,email,type,id}){

    return(
        <>
            <div className='row p-2'>
                <div className='col-6 col-md-6'>
                <h3>Nombre: </h3>
                </div>
                <div className='col-6 col-md-6'>
                    <span className='text-break'>{name}</span>
                </div>
            </div>
            <div className='row p-2'>
                <div className='col-6 col-md-6'>
                <h3>Correo: </h3>
                </div>
                <div className='col-6 col-md-6'>
                    <span className='text-break'>{email}</span>
                </div>
            </div>

            <div className='row p-2'>
                <div className='col-6 col-md-6'>
                <h3>Usuario: </h3>
                </div>
                <div className='col-6 col-md-6 mb-4'>
                    <span>{type}</span>
                </div>
            </div>
            </>
    );
}
export default function Perfil(){
    const [user, setUser] = useState({
        id: "",
        name: "",
        lastName: "",
        email: "",
    })
    const {id_user} = useParams();
    useEffect(() => {
        //nuevodescr120T
        //http://localhost:8000/projects/responsable/${user.sub}
        fetch(`http://localhost:8000/person/resume/${id_user}`)
          .then((res) => res.json())
          .then((data)=>setUser(data))
        
        },[id_user])
    return(
        <>
        <Menu />
        <div className='container-fluid m-5 perfil cont-principal mx-auto'>
            <div className='row p-2'>
                <i className="bi bi-person-circle icon-p"></i>
            </div>
            <div className='row p-2 '>
                <div className='col-md-12'>
                    <h1>Perfil</h1>
                </div>
            </div>
            <Datos name={user.name+' '+user.lastName} type={"Profesor"}  email={user.email}/>
            
        </div>
        </>
    );
}