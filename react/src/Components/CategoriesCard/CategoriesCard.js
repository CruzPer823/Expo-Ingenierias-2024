import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './CategoriesCard.css';
import imagen1 from './1.png';
import imagen2 from './2.png';
import imagen3 from './3.png';
import AdminDeleteUserPopUp from '../Popup/AdminDeleteUserPopUp';
import imagenLoco from './Areas.png';
import AddCard from '../AddCard/AddCard';

function CategoriesCard({data}){
    const navigate = useNavigate();
    const {id,title,description,isActive} = data;
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [deleteId, setDeleteId] = useState(null);


    const truncateString = (str, num) => {
        if (str.length <= num) {
            return str;
        }
        return str.slice(0, num) + ' . . .';
    };

    const handleDelete = (id) => {
      setShowModal(true);
      setModalContent("¿Estas seguro de querer eliminar la categoria? Esta accion no puede deshacerse")
      setDeleteId(id);
    };

    const confirmDelete = async() => {
      axios.patch(`https://140.84.165.119/api/Admin/Categories/inhabilitate/${deleteId}`).then(response => {
        console.log("Categoria correctamente inhabilitada:",response.data);
      }).catch(error=>{console.error("Error al inhabilitar la Categoria:", error)})
      setShowModal(false);
      window.location.reload();
    };

    const closeModal = () => {
      setShowModal(false);
  };

    const handleEditClick = () => {
      // Redirect to EditUserPage and pass the userId as a URL parameter
      navigate(`/Admin/Categorias/${id}`);
  };

    const imagen = (title)=>{
        if(title==="Concepto"){
            return imagen1;
        }else if(title==="Prototipo"){
          return imagen2;

        }else if(title==="Producto"){
          return imagen3;
        }else{
          return imagenLoco;
        }
    };
    return (
        <div className='tar'>
            <img src={imagen(`${title}`)} className="card-img-top catImg" alt="Project Image"/>
            <div className='contenido'>
            <h2 className='titleCat'>{truncateString(`${title}`,10)}</h2>
            <p className='descriptionCat'>{truncateString(`${description}`,53)}</p>
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

export default function CategoriesCardList({data}){
    let categoriesInfo=data;
    return(
        <div className="contenedor row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
          <div className='tarjeta'>
          <AddCard name="categorias"/>
          </div>
        {categoriesInfo.map(categories => (
          categories.isActive === 1?
          <div key={categories.id} className='tarjeta'>
            <CategoriesCard data={categories} />
          </div>:null
        ))}
      </div>
  );
}