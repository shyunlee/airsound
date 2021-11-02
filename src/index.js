import React, { memo } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import HttpClient from './network/http';
import AuthService from './service/auth';
import MediaService from './service/media';
import ImageFileInput from './components/image_file_input/ImageFileInput';
import ImageUploader from './service/imageUploader';

const baseURL = process.env.REACT_APP_BASE_URL

const httpClient = new HttpClient(baseURL)
const authService = new AuthService(httpClient)
const mediaService = new MediaService(httpClient)
const imageUploader = new ImageUploader()


const FileInput = memo((props) => (
  <ImageFileInput {...props} imageUploader={imageUploader} />
))

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App authService={authService} mediaService={mediaService} FileInput={FileInput}/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
