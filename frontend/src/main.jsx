import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './authContext.jsx'
import ProjectRoutes from './Routes.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <ProjectRoutes />
      </Router>
    </AuthProvider>
  </React.StrictMode>,
)