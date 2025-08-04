import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CyberDashboard from './pages/CyberDashboard';
import ThreatAnalysis from './pages/ThreatAnalysis';
import Vulnerabilities from './pages/Vulnerabilities';
import IncidentTrends from './pages/IncidentTrends';
import Compliance from './pages/Compliance';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cyber-dashboard" 
              element={
                <ProtectedRoute>
                  <CyberDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/threats" 
              element={
                <ProtectedRoute>
                  <ThreatAnalysis />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/vulnerabilities" 
              element={
                <ProtectedRoute>
                  <Vulnerabilities />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/trends" 
              element={
                <ProtectedRoute>
                  <IncidentTrends />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/compliance" 
              element={
                <ProtectedRoute>
                  <Compliance />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/reports" 
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;