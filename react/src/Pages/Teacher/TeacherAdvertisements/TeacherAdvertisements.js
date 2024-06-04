import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Placeholder from 'react-bootstrap/Placeholder';
import { Link } from 'react-router-dom';

import './TeacherAdvertisements.css'
import Menu from '../../../Components/Togglebar/togglebar.js';
import axios from 'axios';

const URL = 'http://localhost:8000/announ/';

import { useAuth0 } from '@auth0/auth0-react';

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

  const {  user } = useAuth0();

  
  const handleAnnounceClick = async () => {
    try {
      await axios.post(URL+'readAnnouncePerson', {
        id_person: user.sub,
        id_announce: announ.id
      });
    } catch (error) {
      console.error('Error marking announce as read', error);
    }
  };

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
        <Link to={`/announ-teacher/${announ.id}`} className='row m-3 p-2 AnnounInfoContainer d-flex align-items-center' onClick={handleAnnounceClick}>
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
    fetch(URL)
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
            <AnnounSearch handleSearch={handleSearch} />
          </div>
  
          <div className='row p-3 mt-4 ContainerAnnoun'>
            <AnnounInfoCont announcements={filteredAnnouncements} />
          </div>
        </div>
      </>
    );
  }
  