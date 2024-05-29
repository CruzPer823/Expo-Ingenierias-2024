import React, { useEffect, useState } from 'react';

function DropdownMenu({ title , url, onSelect }) {
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('El servidor no responde');
        }
        const data = await response.json();
        const sortedOptions = data.sort((a, b) => b.year - a.year);
        setOptions(sortedOptions);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchOptions();
  }, [url]);

  const handleOptionSelect = (periodo, id) => {
    setSelectedOption(periodo);
    onSelect(id);
  };

  return (
    <div className="dropdown-center">
      <button className="btn btn-secondary dropdown-toggle {btn-lg}" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        {selectedOption ? selectedOption : title}
      </button>
      <ul className="dropdown-menu">
        {error && <li className="dropdown-item text-danger">{error}</li>}
        {options.map(option => (
          <li key={option.id}>
            <a className="dropdown-item" href="#" onClick={() => handleOptionSelect(option.period +" "+ option.year, option.id)}>
              {option.period + " " + option.year}
            </a>
          </li>
        ))}
        {/* Default option "Selecciona la Edición" */}
        <li>
          <a className="dropdown-item" href="#" onClick={() => handleOptionSelect("Selecciona la Edición", null)}>
            Selecciona la Edición
          </a>
        </li>
      </ul>
    </div>
  );
}

export default DropdownMenu;
