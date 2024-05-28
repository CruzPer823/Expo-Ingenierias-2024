import React from 'react';
import './TextInput.css';

function TextInput({ label, name, value, onChange, type = 'text', required = false }) {
  return (
    <div className="text-input">
      <label className="text-input-label">
        {label}:
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="text-input-field"
        />
      </label>
    </div>
  );
}

export default TextInput;
