import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import HttpClient from './network/http';
import AuthService from './service/auth';
import MediaService from './service/media';

const baseURL = process.env.REACT_APP_BASE_URL

const httpClient = new HttpClient(baseURL)
const authService = new AuthService(httpClient)
const mediaService = new MediaService(httpClient)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App authService={authService} mediaService={mediaService}/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
