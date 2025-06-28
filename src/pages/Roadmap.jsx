import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useModules } from '../context/ModuleContext';
import { getSyllabus } from '../data/syllabi';
import LearningRoadmap from '../components/LearningRoadmap';
import './Roadmap.css';

const Roadmap = () => {
  const navigate = useNavigate();
  const { modules } = useModules();

  // Get the career goal from the first module (assuming it's set during onboarding)
  const careerGoal = modules.length > 0 ? 
    (modules[0].careerGoal || 'web developer') : 'web developer';
  
  const syllabus = getSyllabus(careerGoal);

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleStartLearning = () => {
    navigate('/dashboard');
  };

  return (
    <div className="roadmap-page">
      <div className="roadmap-page-header">
        <div className="header-content">
          <button 
            className="back-button"
            onClick={handleBackToDashboard}
          >
            ← Back to Dashboard
          </button>
          
          <div className="header-info">
            <h1>Your Learning Roadmap</h1>
            <p>Master {syllabus.title} with our comprehensive learning path</p>
          </div>
        </div>
      </div>

      <div className="roadmap-content">
        <div className="roadmap-intro">
          <div className="intro-card">
            <h2>About This Path</h2>
            <p>{syllabus.description}</p>
            
            <div className="path-stats">
              <div className="stat-item">
                <div className="stat-value">{syllabus.roadmap.length}</div>
                <div className="stat-label">Learning Phases</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">
                  {syllabus.roadmap.reduce((total, phase) => total + phase.topics.length, 0)}
                </div>
                <div className="stat-label">Topics to Master</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">
                  {syllabus.roadmap.reduce((total, phase) => 
                    total + phase.topics.reduce((topicTotal, topic) => 
                      topicTotal + topic.resources.length, 0), 0
                  )}
                </div>
                <div className="stat-label">Free Resources</div>
              </div>
            </div>
          </div>
        </div>

        <LearningRoadmap syllabus={syllabus} />

        <div className="roadmap-actions">
          <div className="action-card">
            <h3>Ready to Start Learning?</h3>
            <p>Begin your journey with the first module and track your progress</p>
            <button 
              className="start-learning-button"
              onClick={handleStartLearning}
            >
              Start Learning Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap; 