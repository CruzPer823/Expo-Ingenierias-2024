import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './AreaCard.css';
import imagen from './Areas.png';
import AddCard from '../AddCard/AddCard';
import AdminDeleteUserPopUp from '../Popup/AdminDeleteUserPopUp';


function Areacard({data}){
    const {id,name,description,isActive} = data;
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [deleteId, setDeleteId] = useState(null);
    
    
    const truncateString = (str, num) => {
        if (str.length <= num) {
            return str;
        }
        return str.slice(0, num) + ' . . .';
    };
    const navigate = useNavigate();

    const handleDelete = (id) => {
      setShowModal(true);
      setModalContent("¿Estas seguro de querer eliminar el área? Esta accion no puede deshacerse")
      setDeleteId(id);
    };

    const confirmDelete = async() => {
      axios.patch(`http://localhost:8000/Admin/Areas/inhabilitate/${deleteId}`).then(response => {
        console.log("Área correctamente inhabilitada:",response.data);
      }).catch(error=>{console.error("Error al inhabilitar el Área:", error)})
      setShowModal(false);
      window.location.reload();
    };

    const closeModal = () => {
      setShowModal(false);
  };
    const handleEditClick = () => {
        // Redirect to EditUserPage and pass the userId as a URL parameter
        navigate(`/Admin/areas/${id}`);
    };
    return (
        <div className='tar'>
            <img src={imagen} className="card-img-top areasImg" alt="Project Image"/>
            <div className='contenido'>
            <h2>{truncateString(`${name}`,7)}</h2>
            <p className='description'>{truncateString(`${description}`,53)}</p>
            <button className="btn btn-primary custom-primaty-btn btnPrin" onClick={handleEditClick}>Editar</button>
            <button className="btn  btn-danger mx-2 btnElim" onClick={()=>handleDelete(id)}>Eliminar</button>
            {showModal && (
                <AdminDeleteUserPopUp 
                    content={modalContent} 
                    onClose={closeModal} 
                    onConfirm={confirmDelete} 
                />
              )}
            </div>
        </div>
    );
}

export default function AreasCardList({data}){
    let areasInfo=data;
    return(
        <div className="contenedor row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
          <div className='tarjeta'>
          <AddCard name="areas"/>
          </div>
        {areasInfo.map(area => (
          area.isActive===1?
          <div key={area.id} className='tarjeta'>
            <Areacard data={area} />
          </div>:null
        ))}
      </div>
  );
}