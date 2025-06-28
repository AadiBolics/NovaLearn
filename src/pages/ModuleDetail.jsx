import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useModules } from '../context/ModuleContext';
import './ModuleDetail.css';

const ModuleDetail = ({ onModuleComplete }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { modules } = useModules();
  
  const module = modules?.find(m => m.id === parseInt(id));
  const currentIndex = modules?.findIndex(m => m.id === parseInt(id)) || 0;
  const nextModule = modules?.[currentIndex + 1];
  const prevModule = modules?.[currentIndex - 1];

  if (!module) {
    return (
      <div className="module-detail-container">
        <div className="completion-alert">
          <h5>Module not found</h5>
          <p>The requested module could not be found.</p>
          <Link to="/dashboard" className="nav-button secondary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const handleMarkComplete = () => {
    onModuleComplete(module.id);
    navigate('/dashboard');
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleNextModule = () => {
    if (nextModule) {
      navigate(`/module/${nextModule.id}`);
    }
  };

  const handlePrevModule = () => {
    if (prevModule) {
      navigate(`/module/${prevModule.id}`);
    }
  };

  return (
    <div className="module-detail-container">
      <div className="module-detail-header">
        <h1>{module.title}</h1>
      </div>
      
      {module.completed && (
        <div className="completion-alert">
          <h5>🎉 Module Completed!</h5>
          <p>Congratulations! You have successfully completed this module.</p>
        </div>
      )}
      
      <div className="module-detail-card">
        <div className="card-body">
          <div className="section-content">
            <h5 className="section-title">Description</h5>
            <p className="module-description">{module.description}</p>
          </div>
          
          <div className="section-content">
            <h5 className="section-title">Challenge</h5>
            <div className="challenge-section">
              <div className="challenge-label">Your Mission:</div>
              <p className="challenge-text">{module.challenge}</p>
            </div>
          </div>

          <div className="section-content">
            <h5 className="section-title">Learning Objectives</h5>
            <ul className="objectives-list">
              <li>Understand core concepts and principles</li>
              <li>Practice with hands-on exercises</li>
              <li>Complete the final challenge project</li>
              <li>Apply knowledge to real-world scenarios</li>
            </ul>
          </div>

          <div className="section-content">
            <h5 className="section-title">Estimated Time</h5>
            <div className="time-estimate">
              <p>This module typically takes 2-4 hours to complete.</p>
            </div>
          </div>

          {!module.completed && (
            <div className="section-content">
              <div className="ready-alert">
                <h5>Ready to start?</h5>
                <p>Take your time to go through the content and complete the challenge.</p>
              </div>
            </div>
          )}
        </div>
        <div className="card-footer">
          <div className="navigation-buttons">
            <div className="left-buttons">
              <button 
                className="nav-button secondary"
                onClick={handleBackToDashboard}
              >
                ← Dashboard
              </button>
              
              {prevModule && (
                <button 
                  className="nav-button outline"
                  onClick={handlePrevModule}
                >
                  ← Previous
                </button>
              )}
            </div>
            
            <div className="right-buttons">
              {!module.completed && (
                <button 
                  className="nav-button success"
                  onClick={handleMarkComplete}
                >
                  Mark as Complete
                </button>
              )}
              
              {nextModule && (
                <button 
                  className="nav-button outline"
                  onClick={handleNextModule}
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleDetail; 