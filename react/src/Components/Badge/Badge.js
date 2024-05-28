import React from 'react';
import './Badge.css';

const Badge = ({ data, className }) => {
  return (
    <div className="badge-container">
      <div className={`${className}`}>{data}</div>
    </div>
  );
};

export default Badge;
