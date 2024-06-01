import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import ToggleBarStudent from '../../../Components/TogglebarStudent/togglebarStudent.js';

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useRef } from 'react';

import Map from '../../../img/PruebaMap5.png';

import './StudentMap.css'


function ZoomableImage({ width = '100%', height = '585px' }) {
    const transformRef = useRef(null);
  
    return (
      <div style={{ position: 'relative', width, height, overflow: 'hidden' }} className='ContenedorMap'>
        <TransformWrapper ref={transformRef} style={{ width: '100%', height: '100%' }}>
          <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 100 }}>
            <button onClick={() => transformRef.current.zoomIn()} className="zoom-button">+</button>
            <button onClick={() => transformRef.current.zoomOut()} className="zoom-button">-</button>
          </div>
        <TransformComponent wrapperStyle={{ width: '100%', height: '100%', position: "absolute", display: 'flex' }}>
            <img src={Map} alt="Zoomable" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: "5px" }} />
        </TransformComponent>
        </TransformWrapper>
      </div>
    );
  }

export default function StudentMap(){
    return(
        <>
            <ToggleBarStudent NameSection={"Mapa del evento"} />

            <div className='container-fluid p-2'>
                <div className='row m-3'>
                    <div className='col'>
                        <center><ZoomableImage /></center>
                    </div>
                </div>
            </div>


        </>
    );
}