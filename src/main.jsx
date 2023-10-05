import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './auth/Login.jsx'
import Register from './auth/Register.jsx'
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css'

function ProtectedRoute({ children }) {
  const authToken = Cookies.get('authToken')
  const userData = Cookies.get('userData')
  
  if (!authToken && !userData) {
    return <Navigate to="/login" />;
  }

  return children;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><App /></ProtectedRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
