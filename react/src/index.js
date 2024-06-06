import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {BrowserRouter}  from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";

console.log(
  //process.env.REACT_APP_AUTH0_DOMAIN.App,
  //process.env.REACT_APP_AUTH0_CLIENT_ID
)

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      useRefreshTokens={true} 
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: "http://localhost:3000/Callback"
  }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();
