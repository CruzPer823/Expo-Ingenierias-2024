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
        setInputHeight('auto');
      }
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
      <label className="text-input-label">
        {label}:
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
      </label>
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
