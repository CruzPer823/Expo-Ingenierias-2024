import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Placeholder from 'react-bootstrap/Placeholder';
import { Link } from 'react-router-dom';
import StudentToggle from '../../../Components/TogglebarStudent/togglebarStudent.js';
import './Announ.css';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const URL = 'http://localhost:8000/announ/';

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

function AnnounIcon({ isRead }) {
  return (
    <>
     {isRead ? (<i className={'bi bi-envelope-open-fill AnnounIcon'}></i>) :(<i className={'bi bi-envelope-fill AnnounIcon'}></i>)}
    </>
  );
}

function AnnounInfo({ announ, isLoading, markAsRead }) {
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

  const handleAnnounceClick = async () => {
    try {
      // Marca el anuncio como leído en el backend
      await axios.post(URL + 'readAnnounceStudent', {
        id_student: announ.user.sub,
        id_announce: announ.id,
      });
      // Actualiza el estado del anuncio a leído
      markAsRead(announ.id);
    } catch (error) {
      console.error('Error marking announce as read', error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className='row m-3 p-2 AnnounInfoContainer d-flex align-items-center'>
          <div className='col-3 d-flex align-items-center'>
            <AnnounIcon isRead={false} />
            <Placeholder animation='glow' className='w-75'>
              <Placeholder xs={12} bg='primary' className='ms-4' size='lg' />
            </Placeholder>
          </div>
          <div className='col-7 d-flex align-items-center'>
            <Placeholder animation='glow' className='w-100'>
              <Placeholder xs={12} bg='secondary' className='ms-4' size='lg' />
            </Placeholder>
          </div>
          <div className='col-2 text-end'>
            <Placeholder animation='glow' className='w-100'>
              <Placeholder xs={10} bg='dark' className='ms-4' size='lg' />
            </Placeholder>
          </div>
        </div>
      ) : (
        <Link to={'/announ-estudiante/' + announ.id} className='row m-3 p-2 AnnounInfoContainer d-flex align-items-center' onClick={handleAnnounceClick}>
          {isLargeScreen ? (
            <>
              <div className='col-3 d-flex align-items-center'>
                <AnnounIcon isRead={announ.isRead} />
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
                <AnnounIcon isRead={announ.isRead} />
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
      )}
    </>
  );
}

function AnnounInfoCont({ announcements, isLoading, markAsRead }) {
  return (
    <div className='col-12 p-12'>
      <div className='container-fluid'>
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => <AnnounInfo key={index} isLoading={true} markAsRead={markAsRead} />)
          : announcements.map((announcement, index) => (
              <AnnounInfo key={index} announ={announcement} isLoading={false} markAsRead={markAsRead} />
            ))}
      </div>
    </div>
  );
}

export default function AnnounCont() {
  const { user } = useAuth0();
  const [allAnnouncements, setAllAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(URL + 'students');
      const data = await response.json();
      const savedReadStatus = JSON.parse(localStorage.getItem('readAnnouncements')) || {};

      // Map saved read status to announcements
      const updatedAnnouncements = data.map(announcement => ({
        ...announcement,
        isRead: savedReadStatus[announcement.id] || false
      }));

      setAllAnnouncements(updatedAnnouncements);
      setFilteredAnnouncements(updatedAnnouncements);
      setIsLoading(false); // Datos obtenidos, desactivar estado de carga
    };

    fetchData();
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

  const markAsRead = (id) => {
    setAllAnnouncements((prevAnnouncements) =>
      prevAnnouncements.map((announcement) =>
        announcement.id === id ? { ...announcement, isRead: true } : announcement
      )
    );
    setFilteredAnnouncements((prevFiltered) =>
      prevFiltered.map((announcement) =>
        announcement.id === id ? { ...announcement, isRead: true } : announcement
      )
    );

    // Save read status in localStorage
    const savedReadStatus = JSON.parse(localStorage.getItem('readAnnouncements')) || {};
    savedReadStatus[id] = true;
    localStorage.setItem('readAnnouncements', JSON.stringify(savedReadStatus));
  };

  return (
    <>
      <StudentToggle NameSection={'Anuncios'} />
      <div className='container-fluid mt-3 p-3'>
        <div className='row p-3 ContainerAnnoun'>
          <AnnounSearch handleSearch={handleSearch} />
        </div>

        <div className='row p-3 mt-4 ContainerAnnoun'>
          <AnnounInfoCont announcements={filteredAnnouncements} isLoading={isLoading} markAsRead={markAsRead} />
        </div>
      </div>
    </>
  );
}
