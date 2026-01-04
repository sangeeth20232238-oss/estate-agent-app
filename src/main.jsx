import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Switched to HashRouter for GitHub Pages compatibility */}
    <HashRouter> 
      <App />
    </HashRouter>
  </React.StrictMode>,
)