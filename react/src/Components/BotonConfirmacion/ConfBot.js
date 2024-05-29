import './ConfBot.css'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

export default function Usure({ Path, className, Texto, MensajeTitle, BotonA, BotonB, onConfirm, recharge=false }) {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleConfirm = async () => {
        await onConfirm(); // Esperar a que se complete la función onConfirm

        // Después de confirmar los cambios, redirigir a la ruta especificada en Path
        handleClose(); // Cierra el modal después de confirmar los cambios
        if(recharge){
            window.location.reload();
        }
        else{
            navigate(Path); // Redirige a la ruta especificada en Path
        }
        
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow} className={className}>
                {Texto}
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{MensajeTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='centered-container h-100 d-flex justify-content-evenly'>
                    <Button className='ButtonContinue' variant="secondary" onClick={handleClose}>
                        {BotonA}
                    </Button>
                    <Button className='fw-bold ' variant="secondary" onClick={handleConfirm}>
                        {BotonB}
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
}