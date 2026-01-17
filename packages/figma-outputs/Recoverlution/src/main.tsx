// Entry point for the Recoverlution platform
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'
import './styles/v3.css' // V3 marketing styles
import 'react-slick/slick/slick.css'
import 'react-slick/slick/slick-theme.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)