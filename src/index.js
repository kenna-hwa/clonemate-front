import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from "recoil";

ReactDOM.render(
  <RecoilRoot>
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App />
  </BrowserRouter>
  </RecoilRoot>,

  document.getElementById('root')
);


