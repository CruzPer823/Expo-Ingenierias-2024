import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './AreaCard.css';
import imagen from './Areas.png';
import AddCard from '../AddCard/AddCard';
function Areacard({data}){
    const {id,name,description,IsActive} = data;
    const truncateString = (str, num) => {
        if (str.length <= num) {
            return str;
        }
        return str.slice(0, num) + ' . . .';
    };
    const navigate = useNavigate();

    const handleDelete = (id) => {
      axios.patch(`http://localhost:8000/Admin/Areas/inhabilitate/${id}`).then(response => {
        console.log("Área correctamente inhabilitada:",response.data);
      }).catch(error=>{console.error("Error al inhabilitar el Área:", error)})
      window.location.reload();
    };

    const handleEditClick = () => {
        // Redirect to EditUserPage and pass the userId as a URL parameter
        navigate(`/Areas/${id}`);
    };
    if (IsActive){
    return (
        <div className='tar'>
            <img src={imagen} className="card-img-top areasImg" alt="Project Image"/>
            <div className='contenido'>
            <h2>{truncateString(`${name}`,7)}</h2>
            <p className='description'>{truncateString(`${description}`,53)}</p>
            <button className="btn btn-primary custom-primaty-btn btnPrin" onClick={handleEditClick}>Editar</button>
            <button className="btn  btn-danger mx-2 btnElim" onClick={()=>handleDelete(id)}>Inhabilitar</button>
            </div>
        </div>
    );
  }else{
    return ;
  }
}

export default function AreasCardList({data}){
    let areasInfo=data;
    return(
        <div className="contenedor row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
          <div className='tarjeta'>
          <AddCard name="areas"/>
          </div>
        {areasInfo.map(area => (
          <div key={area.id} className='tarjeta'>
            <Areacard data={area} />
          </div>
        ))}
      </div>
  );
}