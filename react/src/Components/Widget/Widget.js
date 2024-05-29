import React from 'react';
import './Widget.css';

function Widget({ title, content, centered = false }) {
  return (
    <div className={`widget ${centered ? 'centered' : ''}`}>
      <p className="widget-title">{title}</p>
      <div className="widget-content">{content}</div>
    </div>
  );
}

export default Widget;
