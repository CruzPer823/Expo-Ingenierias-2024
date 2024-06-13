import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Placeholder from 'react-bootstrap/Placeholder';
import { Link } from 'react-router-dom';
import StudentToggle from '../../../Components/TogglebarStudent/togglebarStudent.js';
import './Announ.css';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const URL = 'https://140.84.165.119/api/announ/';

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

function hasData(variable) {
  if (variable.length === 0) {
    return false;
  }
  else{
    return true;
  }
}

function AnnounIcon({ isRead }) {
  return (
    <>
     {isRead ? (<i className={'bi bi-envelope-open-fill AnnounIconAbierto'}></i>) :(<i className={'bi bi-envelope-fill AnnounIconCerrado'}></i>)}
    </>
  );
}

function AnnounInfo({ announ, isLoading}) {
  const { user } = useAuth0();
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
        id_student: user.sub,
        id_announce: announ.id,
      });

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
                <AnnounIcon isRead={hasData(announ.announ_read_students)} />
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
                <AnnounIcon isRead={hasData(announ.announ_read_students)} />
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

function AnnounInfoCont({ announcements, isLoading}) {
  return (
    <div className='col-12 p-12'>
      <div className='container-fluid'>
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => <AnnounInfo key={index} isLoading={true}/>)
          : announcements.map((announcement, index) => (
              <AnnounInfo key={index} announ={announcement} isLoading={false}/>
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
    fetch(URL+'students/' + user.sub)
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
      <StudentToggle NameSection={'Anuncios'} />
      <div className='container-fluid mt-3 p-3'>
        <div className='row p-3 ContainerAnnoun'>
          <AnnounSearch handleSearch={handleSearch} />
        </div>

        <div className='row p-3 mt-4 ContainerAnnoun'>
          <AnnounInfoCont announcements={filteredAnnouncements} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
}
