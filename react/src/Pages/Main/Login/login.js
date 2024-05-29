import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import tecLogo from "../../../img/teclogo.png";
import expoLogo from "../../../img/logoei.svg";
import backgroundImage from "../../../img/fondo1.png";
import {Link} from 'react-router-dom'

export default function Login() {
  return (
    <div className="login-container"
        style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="login-header">
        <img
          src={tecLogo}
          className="tec-logo"
          alt="Tecnológico de Monterrey"
        />

        <div className="brand-container">
          <img src={expoLogo} className="expo-logo" />
          <div className="expo-text-container">
            <h1 className="expo-text">Expo</h1>
            <h1 className="ingenierias-text">Ingenierías</h1>
          </div>
        </div>
      </div>
      <form className="login-form">
        <input type="text" className="form-control" placeholder="Usuario" />
        <input
          type="password"
          className="form-control"
          placeholder="Contraseña"
        />
        <button type="submit" className="btn btn-secondary">
          Iniciar sesión
        </button>
        <Link to="/Registro-inicio" className='cuenta-btn'>Registrarse</Link>
        <div className="login-help">
          <a href="#">¿OLVIDASTE TU CONTRASEÑA?</a>
          <a href="#">¿NECESITAS AYUDA? CONTÁCTANOS</a>
        </div>
      </form>
    </div>
  );
}

