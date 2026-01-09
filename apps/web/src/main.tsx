import React from 'react';
import ReactDOM from 'react-dom/client';
import '@ui/styles/reset.css';
import '@ui/styles/theme.css';
import '@ui/styles/components.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
