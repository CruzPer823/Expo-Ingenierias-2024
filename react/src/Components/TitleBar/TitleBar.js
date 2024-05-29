import React, { useState } from 'react';

import './TitleBar.css';
import logo from '../../Assets/logo.svg';
import NavigationBar from '../../Components/NavigationBar/NavigationBar'; 

function TitleBar({ title}) {
    const [isNavOpen, setIsNavOpen] = useState(false); // State to manage the visibility of the navigation bar
    
    const toggleNav = () => {
      setIsNavOpen(!isNavOpen);
    };

    const closeNav = () => {
        setIsNavOpen(false); // Close the navigation bar
    };

    return (
        <div className="title-bar">
          <div className="left-content">
            <img src={logo} alt="Logo" onClick={toggleNav} className="logo"/> {/* Add onClick event to trigger the toggleNav function */}
            <div className="title">{title}</div>
          </div>
          {isNavOpen && <NavigationBar onClose={closeNav} />} {/* Render the NavigationBar component if isNavOpen is true */}   
        </div>
    );
  }

export default TitleBar;