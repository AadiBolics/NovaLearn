import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

// Components
import OnboardingForm from './components/OnboardingForm';
import Dashboard from './pages/Dashboard';
import ModuleDetail from './pages/ModuleDetail';
import Roadmap from './pages/Roadmap';
import Resources from './pages/Resources';

// Context
import { ModuleProvider, useModules } from './context/ModuleContext';

// Navigation component
const Navigation = () => {
  const location = useLocation();
  const { modules } = useModules();
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          NovaLearn
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
                to="/"
              >
                Home
              </Link>
            </li>
            {modules.length > 0 && (
              <>
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`} 
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${location.pathname === '/roadmap' ? 'active' : ''}`} 
                    to="/roadmap"
                  >
                    Roadmap
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${location.pathname === '/resources' ? 'active' : ''}`} 
                    to="/resources"
                  >
                    Resources
                  </Link>
                </li>
              </>
            )}
          </ul>
          
          {modules.length > 0 && (
            <div className="navbar-nav">
              <span className="navbar-text">
                Progress: {modules.filter(m => m.completed).length}/{modules.length}
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// App Routes component
const AppRoutes = () => {
  const { modules, addModules, markModuleComplete } = useModules();

  const handleOnboardingComplete = (learningModules) => {
    addModules(learningModules);
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={<OnboardingForm onComplete={handleOnboardingComplete} />} 
      />
      <Route 
        path="/dashboard" 
        element={
          modules.length > 0 ? (
            <Dashboard />
          ) : (
            <Navigate to="/" replace />
          )
        } 
      />
      <Route 
        path="/roadmap" 
        element={
          modules.length > 0 ? (
            <Roadmap />
          ) : (
            <Navigate to="/" replace />
          )
        } 
      />
      <Route 
        path="/resources" 
        element={
          modules.length > 0 ? (
            <Resources />
          ) : (
            <Navigate to="/" replace />
          )
        } 
      />
      <Route 
        path="/module/:id" 
        element={
          modules.length > 0 ? (
            <ModuleDetail onModuleComplete={markModuleComplete} />
          ) : (
            <Navigate to="/" replace />
          )
        } 
      />
    </Routes>
  );
};

function App() {
  return (
    <ModuleProvider>
      <Router>
        <div className="App">
          <Navigation />
          <AppRoutes />
        </div>
      </Router>
    </ModuleProvider>
  );
}

export default App;
