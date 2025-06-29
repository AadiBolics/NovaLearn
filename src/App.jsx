import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { ModuleProvider } from './context/ModuleContext';
import { useModules } from './context/useModules';
import OnboardingForm from './components/OnboardingForm';
import Dashboard from './pages/Dashboard';
import Roadmap from './pages/Roadmap';
import Resources from './pages/Resources';
import ModuleDetail from './pages/ModuleDetail';
import StudyChatbot from './components/StudyChatbot';
import NovaLearnLogo from './components/NovaLearnLogo';
import './styles/global.css';

// Navigation component
const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <NovaLearnLogo 
          className="nav-brand" 
          onClick={handleLogoClick}
        />
        <ul className="nav-links">
          <li>
            <Link 
              to="/dashboard" 
              className={`nav-link ${currentPath === '/dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/roadmap" 
              className={`nav-link ${currentPath === '/roadmap' ? 'active' : ''}`}
            >
              Roadmap
            </Link>
          </li>
          <li>
            <Link 
              to="/resources" 
              className={`nav-link ${currentPath === '/resources' ? 'active' : ''}`}
            >
              Resources
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

// Main app content
const AppContent = () => {
  const { modules } = useModules();

  // Check if user has completed onboarding
  const hasCompletedOnboarding = modules.length > 0;

  return (
    <div className="App">
      {hasCompletedOnboarding && <Navigation />}
      
      <main className="page-wrapper">
        <Routes>
          <Route 
            path="/" 
            element={
              hasCompletedOnboarding ? 
                <Navigate to="/dashboard" replace /> : 
                <OnboardingForm />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              hasCompletedOnboarding ? 
                <Dashboard /> : 
                <Navigate to="/" replace />
            } 
          />
          <Route 
            path="/roadmap" 
            element={
              hasCompletedOnboarding ? 
                <Roadmap /> : 
                <Navigate to="/" replace />
            } 
          />
          <Route 
            path="/resources" 
            element={
              hasCompletedOnboarding ? 
                <Resources /> : 
                <Navigate to="/" replace />
            } 
          />
          <Route 
            path="/module/:id" 
            element={
              hasCompletedOnboarding ? 
                <ModuleDetail /> : 
                <Navigate to="/" replace />
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Study Chatbot - handles its own overlay and toggle */}
      {hasCompletedOnboarding && <StudyChatbot />}
    </div>
  );
};

function App() {
  return (
    <ModuleProvider>
      <Router>
        <AppContent />
      </Router>
    </ModuleProvider>
  );
}

export default App;
