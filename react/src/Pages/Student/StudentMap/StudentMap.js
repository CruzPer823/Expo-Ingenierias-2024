import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import ToggleBarStudent from '../../../Components/TogglebarStudent/togglebarStudent.js';

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useRef, useState, useEffect } from 'react';
import Loader from '../../../Components/Loader/Loader.js';

import './StudentMap.css'

function ZoomableImage({ width = '100%', height = '585px' }) {
    const mapId = 1;
    const transformRef = useRef(null);
    const URLimage = "https://140.84.165.119/api/assets/";
    const [mapa, setMapa] = useState({ map_image: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`https://140.84.165.119/api/map/get/map/${mapId}`)
            .then(response => response.json())
            .then(data => {
                setMapa({ map_image: data[0].map_image });
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al obtener el Mapa:', error);
                setLoading(false);
            });
    }, [mapId]);

    const mapSrc = URLimage + mapa.map_image;

    return (
        <>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Loader />
                </div>
            ) : (
                <div style={{ position: 'relative', width, height, overflow: 'hidden' }} className='ContenedorMap'>
                    <TransformWrapper ref={transformRef} style={{ width: '100%', height: '100%' }}>
                        <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 100 }}>
                            <button onClick={() => transformRef.current.zoomIn()} className="zoom-button">+</button>
                            <button onClick={() => transformRef.current.zoomOut()} className="zoom-button">-</button>
                        </div>
                        <TransformComponent wrapperStyle={{ width: '100%', height: '100%', position: 'absolute', display: 'flex' }}>
                            <img src={mapSrc} alt="Zoomable" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '5px' }} />
                        </TransformComponent>
                    </TransformWrapper>
                </div>
            )}
        </>
    );
}

export default function StudentMap() {
    return (
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
