import './ConfBot.css'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

export default function Usure({ Path, className, Texto, MensajeTitle, BotonA, BotonB, onConfirm, recharge=false }) {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);

    const handleClose = () => {
        setShow(false);
        setIsConfirming(false);
    };
    const handleShow = () => setShow(true);

    const handleConfirm = async () => {
        handleClose();
        setIsConfirming(true);
        await onConfirm(); 
        
        if(recharge){
            setTimeout(function() {
                window.location.reload();
            }, 1000);
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
                    <Button className='ButtonContinue' variant="secondary" onClick={handleClose} disabled={isConfirming}>
                        {BotonA}
                    </Button>
                    <Button className='fw-bold ' variant="secondary" onClick={handleConfirm} disabled={isConfirming}>  
                        {BotonB}
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
}