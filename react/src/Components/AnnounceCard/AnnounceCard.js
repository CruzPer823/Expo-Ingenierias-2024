import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../AreaCard/AreaCard.css';
import AddCard from '../AddCard/AddCard';
import imagen from './announce.png';

function AnnounceCard({data}){
    const {id,title,description,audience,multimedia} = data;
    const truncateString = (str, num) => {
        if (str.length <= num) {
            return str;
        } 
        return str.slice(0, num) + ' . . .';
    };
    const navigate = useNavigate();

    const handleDelete = (id) => {
      axios.delete(`http://localhost:8000/Admin/Announce/delete/${id}`).then(response => {
        console.log("Anuncio correctamente eliminado:",response.data);
      }).catch(error=>{console.error("Error al eliminar el anuncio:", error)})
      window.location.reload();
    };

    const handleEditClick = () => {
        // Redirect to EditUserPage and pass the userId as a URL parameter
        navigate(`/anuncios/${id}`);
    };
    return (
        <div className='tar'>
            <img src={imagen} className="card-img-top" alt="Project Image"/>
            <div className='contenido'>
            <h2>{truncateString(`${title}`,15)}</h2>
            <p className='description'>{truncateString(`${description}`,53)}</p>
            <button className="btn btn-primary custom-primaty-btn btnPrin" onClick={handleEditClick}>Editar</button>
            <button className="btn  btn-danger mx-2 btnElim" onClick={()=>handleDelete(id)}>Eliminar</button>
            </div>
        </div>
    );
}

export default function AnnounceCardList({data}){
    let announceInfo=data;
    return(
        <div className="contenedor row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
          <div className='tarjeta'>
          <AddCard name="anuncios"/>
          </div>
        {announceInfo.map(anuncio => (
          <div key={anuncio.id} className='tarjeta'>
            <AnnounceCard data={anuncio} />
          </div>
        ))}
      </div>
  );
}