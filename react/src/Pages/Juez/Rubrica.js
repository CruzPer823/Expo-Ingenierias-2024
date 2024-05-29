import React, { useState } from 'react';
import { criteria } from '../../Components/rubricadata.js';
import { Link } from 'react-router-dom';
import './Rubrica.css';
import '../../Components/rubricadata.js';
import NavigationBar from '../../Components/NavigationBar/Judge/NavigationBar';

const Rubrica = () => {
  const [selectedCriteria, setSelectedCriteria] = useState(Array(criteria.length).fill(0));
  const [comments, setComments] = useState(Array(criteria.length).fill(''));
  const [additionalComment, setAdditionalComment] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleSliderChange = (index, value) => {
    setSelectedCriteria(prevSelectedCriteria => {
      const newSelectedCriteria = [...prevSelectedCriteria];
      newSelectedCriteria[index] = value;
      return newSelectedCriteria;
    });
  };

  const handleCommentChange = (index, value) => {
    setComments(prevComments => {
      const newComments = [...prevComments];
      newComments[index] = value;
      return newComments;
    });
  };

  const handleAdditionalCommentChange = (value) => {
    setAdditionalComment(value);
  };

  const handleSubmit = () => {
    // Check if the additional comment meets the minimum length requirement
    if (additionalComment.trim().length < 100) {
      setShowErrorMessage(true);
      return;
    }

    // Calculate total score and message
    const totalScore = selectedCriteria.reduce((acc, value) => acc + value, 0);

    const criteriaMessage = selectedCriteria.map((value, index) => {
      return `${criteria[index].name}: Score: ${value}\nComentario: ${comments[index]}`;
    }).join('\n');

    // Display total score, criteria, and comments in a pop-up
    if (window.confirm(`¿Estás seguro de que deseas enviar tu rúbrica?\n\nPuntaje Total: ${totalScore/5}\n${criteriaMessage}\nComentario adicional: ${additionalComment}`)) {
      window.location.href = './ProyectosJuez'; // Redirect the user to the /judge page
    }
  };

  return (
    <>
     <NavigationBar NameSection={"Rúbrica"}/>
    <div className="container">
      <h1>CALIFICA EL PROYECTO EN BASE A LA RÚBRICA</h1>
      <div className="rubrica-container">
        {criteria.map((criterion, index) => (
          <div className="criterion" key={index}>
            <h3>{criterion.name}</h3>
            <p>Calificación: {selectedCriteria[index]}</p>

            <div className="PB-range-slider-div">
              
              <p>0(Deficiente)</p>
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={selectedCriteria[index]}
                onChange={(e) => handleSliderChange(index, parseInt(e.target.value))}
                id={`myRange${index}`}
              />
              <p>5(Excelente)</p>
            </div>
            {/* Caja de comentarios */}
            <textarea
              placeholder={`Comentarios adicionales sobre ${criterion.name}`}
              className="comment-box"
              value={comments[index]}
              onChange={(e) => handleCommentChange(index, e.target.value)}
            />
          </div>
        ))}
        {/* Comentario adicional */}
        <textarea
          placeholder="Comentario adicional sobre el proyecto (mínimo 100 caracteres)"
          className="comment-box"
          value={additionalComment}
          onChange={(e) => handleAdditionalCommentChange(e.target.value)}
        />
        {/* Mensaje de error si el comentario adicional es insuficiente */}
        {showErrorMessage && additionalComment.trim().length < 100 && <p className="error-message">Por favor, ingresa un comentario adicional con al menos 100 caracteres.</p>}
        <div className="buttons-container2">
          <Link to="/ProyectosJuez" className="btn2">Cancelar</Link>
          <button onClick={handleSubmit} className="btn3">Enviar</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Rubrica;
