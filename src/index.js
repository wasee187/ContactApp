import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/routes/App.router';
import { BrowserRouter } from 'react-router-dom';
import { ContactProvider } from './contexts/Contact.context';

const router = (
  <BrowserRouter>
    <ContactProvider>
      <App />
    </ContactProvider>
  </BrowserRouter>
);
ReactDOM.render(router, document.getElementById('root'));
