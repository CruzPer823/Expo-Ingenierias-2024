import React, { useEffect, useState } from 'react';
import './DropdownMenuB.css';
function DropdownMenuB({ title, onSelect, value }) {
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(value);

  useEffect(() => {
    const data = [
      { value: 'all', label: 'Todos' },
      { value: 'students', label: 'Estudiantes' },
      { value: 'teachers', label: 'Docentes' },
      { value: 'judges', label: 'Jueces' }
    ];
    setOptions(data);
  }, []);

  const handleOptionSelect = (audience) => {
    setSelectedOption(audience);
    onSelect(audience);
  };

  return (
    <div className="dropdown contDrop">
      <h2 className="text-input-label">Audiencia:</h2> 
        <button
          className="btn btn-secondary dropdown-toggle B"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {selectedOption ? options.find(option => option.value === selectedOption)?.label : title}
        </button>
        <ul className="dropdown-menu">
          {error && <li className="dropdown-item text-danger">{error}</li>}
          {options.map((option) => (
            <li key={option.value}>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => handleOptionSelect(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
          {/* Default option "Selecciona la Edición" */}
          <li>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => handleOptionSelect(null)}
            >
              Selecciona la Audiencia
            </button>
          </li>
        </ul>
    </div>
  );
}

export default DropdownMenuB;
