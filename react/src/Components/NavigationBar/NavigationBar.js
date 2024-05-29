import React from 'react';
import { Link } from 'react-router-dom';

import './NavigationBar.css';
import logo from '../../Assets/logoNavBar.svg';
import { AiOutlineClose } from "react-icons/ai";

function NavigationBar({ onClose }) {
  return (
    <div className='navigation-bar'>
      <div className='top-section'> 
        <img src={logo} alt="logo"/>
        <p>Expo<br /> <span className="title-span">ingenierías</span></p>
        <button className="close-button" onClick={onClose}><AiOutlineClose/></button>
      </div>
      <ul>
        <li><Link to="/">Tablero</Link></li>
        <li><Link to="/historico">Historico</Link></li>
        <li><Link to="/usuarios">Usuarios</Link></li>
        <li><Link to="/proyectos">Proyectos</Link></li>
      </ul>
    </div>
  );
}

export default NavigationBar;
