import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { Switch } from '@mui/material';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);


