import React, { useEffect, useState } from 'react';

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
    <div className="dropdown-center">
      <label className="text-input-label">
        Audiencia: 
      <button className="btn btn-secondary dropdown-toggle btn-m" type="button" data-bs-toggle="dropdown" aria-expanded="false"
      name="audience">
        {selectedOption? selectedOption : title}
      </button>
      <ul className="dropdown-menu">
        {error && <li className="dropdown-item text-danger">{error}</li>}
        {options.map((option) => (
          <li key={option.value}>
            <a className="dropdown-item" href="#" onClick={() => handleOptionSelect(option.value)}>
              {option.label}
            </a>
          </li>
        ))}
        {/* Default option "Selecciona la Edición" */}
        <li>
          <a className="dropdown-item" href="#" onClick={() => handleOptionSelect(null)}>
            Selecciona la Audiencia
          </a>
        </li>
      </ul>
      </label>
    </div>
  );
}

export default DropdownMenuB;