import React, { useState } from 'react';
import './DisplayAnnounce.css';

function DisplayAnnounce({ src, alt, label,file,id }) {
  const [zoomed, setZoomed] = useState(false);
  const URLimage="http://localhost:8000/assets/";
  const toggleZoom = () => {
    setZoomed(!zoomed);
  };


  return (
    <>
    {
      src === null? null:
    <div className='ImageContainer'>
      <h2 className="text-input-label">{label}</h2>
        <img label={label} src={URLimage+src} alt={alt} style={{ width: zoomed ? '100%' : 'auto', cursor: 'zoom-in', height: zoomed ? '100%' : '60vh', cursor: 'zoom-in' }} onClick={toggleZoom} className='displayImage'/>
    </div>
    }
    </>
  );
}

export default DisplayAnnounce;
