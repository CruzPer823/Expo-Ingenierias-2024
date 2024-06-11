import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../AreaCard/AreaCard.css';
import AddCard from '../AddCard/AddCard';
import imagen from './announce.png';
import AdminDeleteUserPopUp from '../Popup/AdminDeleteUserPopUp';

function AnnounceCard({data}){
    const {id,title,description,audience,multimedia,createdAt} = data;
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [deleteId, setDeleteId] = useState(null);
    const [deleteMul,setDeletedMul] = useState(null);
    
    const truncateString = (str, num) => {
        if (str.length <= num) {
            return str;
        } 
        return str.slice(0, num) + ' . . .';
    };
    const navigate = useNavigate();

    const handleDelete = async(id,multimedia) => {
      setShowModal(true);
      setModalContent("¿Estas seguro de querer eliminar el anuncio? Esta accion no puede deshacerse")
      setDeleteId(id);
      setDeletedMul(multimedia);
    };

    const confirmDelete = async() => {

      await fetch(`http://localhost:8000/Admin/deleteImage/${deleteMul}`,{
            method:`DELETE`,
        });
      axios.delete(`http://localhost:8000/Admin/Announce/delete/${deleteId}`)
          .then(response => {
              console.log("Anuncio correctamente eliminado:",response.data);
          })
          .catch(error => {
              console.error("Error al eliminar el anuncio:", error);
          });
      setShowModal(false);
      window.location.reload();
  };

  const closeModal = () => {
      setShowModal(false);
  };

    const handleEditClick = () => {
        // Redirect to EditUserPage and pass the userId as a URL parameter
        navigate(`/Admin/anuncios/${id}`);
    };

    const handleRoles=(role)=>{
      if (role ==="teachers"){
        return "Profesores";
      }else if(role ==="judges"){
        return "Jueces";
      }else if(role==="students"){
        return "Alumnos";
      }else{
        return "Todos";
      }
    };

    return (
        <div className='tar'>
            <img src={imagen} className="card-img-top" alt="Project Image"/>
            <div className='contenido'>
            <h2>{truncateString(`${title}`,15)}</h2>
            <p className='description'>{truncateString(` Descripción: ${description}`,50)}</p>
            <p className='descriptionAud'>{`Audiencia: ${handleRoles(audience)}`}</p>
            <p className='descriptionAud'>{` Creación: ${createdAt.slice(0,10)}`}</p>
            <button className="btn btn-primary custom-primaty-btn btnPrin" onClick={handleEditClick}>Editar</button>
            <button className="btn  btn-danger mx-2 btnElim" onClick={()=>handleDelete(id,multimedia)}>Eliminar</button>
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

export default function AnnounceCardList({data, filter,searchTerm}){
    let announceInfo=data;
    if (filter !== "") {
      announceInfo = announceInfo.filter(announce => announce.audience === filter);
    }
  
    // Apply search filter
    if (searchTerm) {
      announceInfo = announceInfo.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
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