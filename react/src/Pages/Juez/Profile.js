import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import NavigationBar from '../../Components/NavigationBar/Judge/NavigationBar';
import React, { useState,useEffect,useRef} from "react";
import { useParams } from "react-router-dom";
import './Profile.css';


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

export default function PerfilJuez(){
    const [person, setPerson] = useState({
        id: "",
        name: "",
        lastName: "",
        email: "",
    })
    const {idpersona} = useParams();
    useEffect(() => {
        fetch(`http://localhost:8000/Juez/fetchPerson/${idpersona}`)
          .then((res) => res.json())
          .then((data)=>setPerson(data));
        
        },[idpersona]);

    return(
        <>
        <NavigationBar NameSection={"Perfil"} />
        <div className='container-fluid m-5 perfil cont-principal mx-auto'>
            <div className='row p-2'>
                <i className="bi bi-person-circle icon-p"></i>
            </div>
            <div className='row p-2 '>
                <div className='col-md-12'>
                    <h1>Perfil</h1>
                </div>
            </div>
            <Datos name={person.name+' '+person.lastName} type={"Juez"}  email={person.email}/>
            
        </div>
        </>
    );
}