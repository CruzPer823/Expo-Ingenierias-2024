import React, { useEffect, useRef, useState } from 'react';
import './TextInput.css';

function TextInput({ label, name, value, onChange, required = false }) {
  const inputRef = useRef(null);
  const [inputWidth, setInputWidth] = useState('auto');
  const [inputHeight, setInputHeight] = useState('auto');
  const maxWidth = 300; // Set max width for the textarea

  useEffect(() => {
    if (inputRef.current) {
      const font = getComputedStyle(inputRef.current).font;
      const width = getTextWidth(value || '', font) + 20; // Adding a little extra space for cursor

      if (width > maxWidth) {
        setInputWidth(`${maxWidth}px`);
        setInputHeight(`${inputRef.current.scrollHeight}px`);
      } else {
        setInputWidth(`${width}px`);
        setInputHeight('40px');
      }
      inputRef.current.style.height = 'auto'; // Reset the height to auto
    inputRef.current.style.height = `${inputRef.current.scrollHeight}px`; 
    }
  }, [value]);

  const handleInput = () => {
    if (inputRef.current) {
      const { scrollHeight } = inputRef.current;
      if (scrollHeight > parseInt(inputHeight)) {
        setInputHeight(`${scrollHeight}px`);
      }
    }
  };

  return (
    <div className="text-input">
      
      <h2 className="text-input-label">{label}</h2>
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="text-input-fieldd"
          style={{ width: inputWidth, height: inputHeight }}
          ref={inputRef}
          onInput={handleInput}
        />
    </div>
  );
}

function getTextWidth(text, font) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = font;
  return context.measureText(text).width;
}

export default TextInput;
