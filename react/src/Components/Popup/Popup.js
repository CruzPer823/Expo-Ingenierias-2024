import React,{useRef} from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './Popup.css';

const Popup = ({content,onClose,error,ruta} )=>{
    const navigate = useNavigate();
    const modalRef=useRef();

    const handleSuccess= () => {
        // Redirect to EditUserPage and pass the userId as a URL parameter
        navigate(ruta);
    };

    const closeModal = (e)=>{
        if(modalRef.current === e.target){
            if(error){
                onClose();
            }else{
                handleSuccess();
            }
        }
    }
    return(
    <article ref={modalRef} onClick={closeModal} className="popUp isOpen">
        <div className="popupContainer">
            <button onClick={error?onClose:handleSuccess}className="closePopup bi bi-x-lg">     
            </button>
            {error?<h2 className="errorTitle">¡Cuidado!</h2>:<h2 className="successTitle">¡Listo!</h2>}
            <p className="modalCont">{content}</p>
            <div className="btnMod">
            <button onClick={error?onClose:handleSuccess}className="btn btn-primary" >Aceptar</button>
            </div>
        </div>
    </article>
    );
}

export default Popup;