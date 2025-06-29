import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useModules } from '../context/useModules';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { modules, getModuleProgress, getCurrentModule } = useModules();

  const handleStartLearning = () => {
    navigate('/roadmap');
  };

  const handleViewResources = () => {
    navigate('/resources');
  };

  const progress = getModuleProgress();
  const currentModule = getCurrentModule();
  const examType = modules.length > 0 ? (modules[0].examType || 'JEE') : 'JEE';

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="welcome-section">
            <h1>Welcome to NovaLearn! 🎓</h1>
            <p>Your personalized {examType} preparation journey starts here</p>
          </div>
          
          <div className="progress-section">
            <div className="progress-card">
              <div className="progress-info">
                <h3>Your Progress</h3>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p>{progress}% Complete</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="quick-actions">
          <div className="action-card primary">
            <div className="action-icon">📚</div>
            <div className="action-content">
              <h3>Continue Learning</h3>
              <p>Pick up where you left off with your personalized study plan</p>
              <button 
                className="action-button primary"
                onClick={handleStartLearning}
              >
                Start Learning →
              </button>
            </div>
          </div>

          <div className="action-card secondary">
            <div className="action-icon">🔗</div>
            <div className="action-content">
              <h3>Learning Resources</h3>
              <p>Access top Indian education platforms and study materials</p>
              <button 
                className="action-button secondary"
                onClick={handleViewResources}
              >
                View Resources →
              </button>
            </div>
          </div>
        </div>

        {currentModule && (
          <div className="current-module">
            <h2>Current Module</h2>
            <div className="module-card">
              <div className="module-header">
                <h3>{currentModule.name}</h3>
                <span className="module-subject">{currentModule.subject}</span>
              </div>
              <p className="module-description">{currentModule.description}</p>
              <div className="module-meta">
                <span className="difficulty">Difficulty: {currentModule.difficulty}</span>
                <span className="weightage">Weightage: {currentModule.weightage}%</span>
              </div>
              <Link to={`/module/${currentModule.id}`} className="module-link">
                Continue Module →
              </Link>
            </div>
          </div>
        )}

        <div className="study-stats">
          <h2>Your Study Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📖</div>
              <div className="stat-info">
                <h3>{modules.length}</h3>
                <p>Total Modules</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-info">
                <h3>{modules.filter(m => m.completed).length}</h3>
                <p>Completed</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏱️</div>
              <div className="stat-info">
                <h3>{Math.ceil(modules.length * 0.3)}</h3>
                <p>Hours This Week</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-info">
                <h3>{progress}%</h3>
                <p>Overall Progress</p>
              </div>
            </div>
          </div>
        </div>

        <div className="motivation-section">
          <div className="motivation-card">
            <h2>Stay Motivated! 💪</h2>
            <p>Every expert was once a beginner. Your dedication today will shape your success tomorrow. Keep pushing forward!</p>
            <div className="motivation-actions">
              <button 
                className="motivation-button"
                onClick={handleStartLearning}
              >
                Continue Your Journey
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 