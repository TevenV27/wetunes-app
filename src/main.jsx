import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './auth/Login.jsx'
import Register from './auth/Register.jsx'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/app" element={<App />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/*" />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
