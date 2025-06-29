import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import { ModuleProvider } from './context/ModuleContext';
import OnboardingForm from './components/OnboardingForm';
import Dashboard from './pages/Dashboard';
import Roadmap from './pages/Roadmap';
import Resources from './pages/Resources';
import ModuleDetail from './pages/ModuleDetail';
import StudyChatbot from './components/StudyChatbot';

// Component to conditionally render chatbot
const AppContent = () => {
  const location = useLocation();
  const showChatbot = location.pathname !== '/';

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<OnboardingForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/module/:id" element={<ModuleDetail />} />
      </Routes>
      {showChatbot && <StudyChatbot />}
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
