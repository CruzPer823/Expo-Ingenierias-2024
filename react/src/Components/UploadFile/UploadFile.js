import React, { useState } from 'react';
import Popup from '../Popup/Popup';
import './UploadFile.css';

const UploadFile = ({ onFileSelect }) => {
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState(null);
    const [content, setContent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && (selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/png' || selectedFile.type === 'image/jpg')) {
            setFileName(selectedFile.name);
            setFile(selectedFile);
            onFileSelect(selectedFile);
        } else {
            setType(true);
            setContent('Solo se permiten archivos con extensión .jpeg, .jpg o .png');
            setShowModal(true);
        }
    };

    return (
        <div className="uploadBotton">
            <input  type="file" accept=".jpeg, .jpg, .png" onChange={handleFileChange} />
            {fileName && <p>Selected file: {fileName}</p>}
            {showModal && <Popup content={content} onClose={()=>setShowModal(false)} error={type} ruta={'/Admin/anuncios'}/>}
        </div>
    );
};

export default UploadFile;
