import React from 'react';
import {criteria} from './components/rubricadata.js';
import {Lienzo} from './components/Lienzo.js';
import {useState} from 'react';
import { Link } from 'react-router-dom'; // Importa el componente Link de react-router-dom
import './Rubrica.css'

const Rubrica = () => {
  const [selectedCriteria, setSelectedCriteria] = useState(Array(criteria.length).fill(0));

  const handleCheckboxChange = (index, levelIndex) => {
    setSelectedCriteria(prevSelectedCriteria => {
      const newSelectedCriteria = [...prevSelectedCriteria]; // Copia el estado anterior
      newSelectedCriteria[index] = levelIndex; // Actualiza el valor correspondiente al criterio seleccionado
      return newSelectedCriteria; // Devuelve el nuevo estado actualizado
    });
  };

  const handleSubmit = () => {
    const totalScore = selectedCriteria.reduce((acc, levelIndex, index) => {
      const level = criteria[index].levels[levelIndex];
      return acc + level.score;
    }, 0);

    const message = selectedCriteria.map((levelIndex, index) => {
      const level = criteria[index].levels[levelIndex];
      return `Criteria ${index + 1}: ${level.name} - Score: ${level.score}`;
    }).join('\n');

    if (window.confirm("¿Estás seguro de que deseas enviar tu rúbrica?")) {
      alert(`Puntaje Total: ${totalScore}\n\n${message}`);
      window.location.href = './juez'; // Redirige al usuario a la página /juez
    }
  };

  return (
    
    <div className="container">
        <Lienzo />
        <Link to="/Juez" className="btn2">Cancelar</Link>
        <h1>CALIFICA EL PROYECTO EN BASE A LA RÚBRICA</h1>
    <div className="rubrica-container"> {/* Clase para el contenedor de la rúbrica */}
      {criteria.map((criterion, index) => (
        <div className="criterion" key={index}> {/* Clase para el criterio */}
          <h3>Criterio {index + 1}</h3>
          <div className="checkboxes-container"> {/* Clase para el contenedor de las casillas de verificación */}
            {criterion.levels.map((level, levelIndex) => (
              <div key={levelIndex}>
                <input
                  type="checkbox"
                  checked={selectedCriteria[index] === levelIndex}
                  onChange={() => handleCheckboxChange(index, levelIndex)}
                />
                <label>{level.name}</label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleSubmit} className="btn">Enviar</button>

    </div>

    </div>
  );
};

export default Rubrica;
