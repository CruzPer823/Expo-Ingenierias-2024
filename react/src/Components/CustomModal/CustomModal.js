import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios'; // Import axios

function CustomModal({ show, handleClose, projectId, adminId, handleSuccess }) {
  const [disqualificationReason, setDisqualificationReason] = useState('');

  const handleInputChange = (event) => {
    setDisqualificationReason(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/projects/disqualify', {
        id_admin: adminId,
        id_project: projectId,
        reason: disqualificationReason,
      });
      console.log(response.data.message);
      handleSuccess(response.data.message); // Call the success handler
      handleClose();
    } catch (error) {
      console.error('Error disqualifying project:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Motivos de Descalificación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea
          className="form-control"
          rows="5"
          value={disqualificationReason}
          onChange={handleInputChange}
          placeholder="Ingresa el motivo de descalificación..."
        ></textarea>
        <p style={{ color: 'red', marginTop: '10px' }}>
          Esta operación no se puede deshacer.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CustomModal;
