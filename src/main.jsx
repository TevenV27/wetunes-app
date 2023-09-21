import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './auth/Login.jsx'
import Register from './auth/Register.jsx'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css'

function ProtectedRoute({ children }) {
  if (!localStorage.getItem('authToken')) {
    return <Navigate to="/" />;
  }

  return children;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/app" element={<ProtectedRoute><App /></ProtectedRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
