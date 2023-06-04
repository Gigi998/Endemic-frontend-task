import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CryptoProvider } from './context/appContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <CryptoProvider>
      <App />
    </CryptoProvider>
  </React.StrictMode>
);
