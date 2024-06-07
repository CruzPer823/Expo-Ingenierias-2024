import React, { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './AdminDeleteUserPopUp.css';

const AdminDeleteUserPopUp = ({ content, onClose, onConfirm, error }) => {
    const modalRef = useRef();

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    };

    return (
        <article ref={modalRef} onClick={closeModal} className="popUp isOpen">
            <div className="popupContainer">
                <button onClick={onClose} className="closePopup bi bi-x-lg"></button>
                <h2 className="errorTitle">¡Cuidado!</h2> 
                <p className="modalCont">{content}</p>
                <div className="btnMod">
                    <button onClick={onClose} className="btn btn-secondary">Cancelar</button>
                    <button onClick={onConfirm} className="btn btn-primary">Aceptar</button>
                </div>
            </div>
        </article>
    );
};

export default AdminDeleteUserPopUp;
