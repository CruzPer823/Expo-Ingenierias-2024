import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Placeholder from 'react-bootstrap/Placeholder';
import { Link } from 'react-router-dom';

import './TeacherAdvertisements.css'
import Menu from '../../../Components/Togglebar/togglebar.js';


function AnnounSearch({ handleSearch }) {
  const handleChange = (e) => {
    handleSearch(e.target.value);
  };

  return (
    <div className='col-12 p-2'>
      <Form.Control
        required
        type="text"
        placeholder="Ingresa el título de un anuncio para buscar"
        className='InputFormat'
        onChange={handleChange}
      ></Form.Control>
    </div>
  );
}

function AnnounInfo({ announ, isLoading }) {
  const truncatedText = (text, limit) => {
    if (!text || typeof text !== 'string' || text.length <= limit) {
      return text;
    }
    return text.slice(0, limit) + '...';
  };

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <div className='row m-3 p-2 AnnounInfoContainer d-flex align-items-center'>
            <div className='col-3 d-flex align-items-center'>
              <i className='bi bi-envelope-fill AnnounIcon'></i>
              <Placeholder animation="glow" className="w-75">
                <Placeholder xs={12} bg="primary" className="ms-4" size="lg" />
              </Placeholder>
            </div>
            <div className='col-7 d-flex align-items-center'>
              <Placeholder animation="glow" className="w-100">
                <Placeholder xs={12} bg="secondary" className="ms-4" size="lg" />
              </Placeholder>
            </div>
            <div className='col-2 text-end'>
              <Placeholder animation="glow" className="w-100">
                <Placeholder xs={10} bg="dark" className="ms-4" size="lg" />
              </Placeholder>
            </div>
          </div>
        </>
      ) : (
        <>
        <Link to={`/announ-teacher/${announ.id}`} className='row m-3 p-2 AnnounInfoContainer d-flex align-items-center'>
        {isLargeScreen ? (
          <>
            <div className='col-3 d-flex align-items-center'>
              <i className='bi bi-envelope-fill AnnounIcon'></i>
              <span className='Titulo'> {announ.title}</span>
            </div>
            <div className='col-7 d-flex align-items-center'>
              <span className='TextoAnnoun'>{truncatedText(announ.description, 100)}</span>
            </div>
            <div className='col-2 text-end'>
              <span className='Subtitulo text-wrap'>{announ.createdAt && announ.createdAt.substring(0, 10)}</span>
            </div>
          </>
        ) : (
          <>
            <div className='row-3 d-flex align-items-center'>
              <i className='bi bi-envelope-fill AnnounIcon'></i>
              <span className='Titulo'> {announ.title}</span>
            </div>
            <div className='row-7 d-flex align-items-center'>
              <span className='TextoAnnoun'>{truncatedText(announ.description, 100)}</span>
            </div>
            <div className='row-2 text-end'>
              <span className='Subtitulo text-wrap'>{announ.createdAt && announ.createdAt.substring(0, 10)}</span>
            </div>
          </>
        )}
        </Link>
        </>
      )}
    </>
  );
}

function AnnounInfoCont({ announcements, isLoading }) {
  return (
    <div className='col-12 p-12'>
      <div className='container-fluid'>
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => <AnnounInfo key={index} isLoading={true} />)
          : announcements.map((announcement, index) => (
              <AnnounInfo key={index} announ={announcement} isLoading={false} />
            ))}
      </div>
    </div>
  );
}

export default function AnnounCont() {
  const [allAnnouncements, setAllAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/announ/')
      .then((res) => res.json())
      .then((data) => {
        setAllAnnouncements(data);
        setFilteredAnnouncements(data);
        setIsLoading(false); // Datos obtenidos, desactivar estado de carga
      });
  }, []);

  const handleSearch = (searchText) => {
    if (searchText.trim() === '') {
      setFilteredAnnouncements(allAnnouncements);
    } else {
      const filtered = allAnnouncements.filter((announcement) =>
        announcement.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredAnnouncements(filtered);
    }
  };
  
    return (
      <>
        <Menu NameSecProf={"Anuncios"}></Menu>
        <div className='container-fluid mt-3 p-3'>
          <div className='row p-3 ContainerAnnoun'>
            <AnnounSearch handleSearch={handleSearch} isLoading={isLoading} />
          </div>
  
          <div className='row p-3 mt-4 ContainerAnnoun'>
            <AnnounInfoCont announcements={filteredAnnouncements} isLoading={isLoading} />
          </div>
        </div>
      </>
    );
  }
  