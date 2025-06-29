import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useModules } from '../context/useModules';
import './ModuleDetail.css';

const ModuleDetail = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { modules, updateModule } = useModules();

  const module = modules.find(m => m.id === moduleId);

  if (!module) {
    return (
      <div className="module-detail-page">
        <div className="error-container">
          <h2>Module Not Found</h2>
          <p>The requested module could not be found.</p>
          <button 
            className="back-button"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleMarkComplete = () => {
    updateModule(moduleId, { completed: true });
    navigate('/dashboard');
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleBackToRoadmap = () => {
    navigate('/roadmap');
  };

  return (
    <div className="module-detail-page">
      <div className="module-detail-header">
        <div className="header-content">
          <button 
            className="back-button"
            onClick={handleBackToDashboard}
          >
            ← Back to Dashboard
          </button>
          
          <div className="header-info">
            <h1>{module.name}</h1>
            <p>{module.subject} • {module.difficulty} • {module.weightage}% weightage</p>
          </div>
        </div>
      </div>

      <div className="module-detail-content">
        <div className="module-overview">
          <div className="overview-card">
            <h2>Module Overview</h2>
            <p className="module-description">{module.description}</p>
            
            <div className="module-meta">
              <div className="meta-item">
                <span className="meta-label">Subject:</span>
                <span className="meta-value">{module.subject}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Difficulty:</span>
                <span className="meta-value">{module.difficulty}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Weightage:</span>
                <span className="meta-value">{module.weightage}%</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Status:</span>
                <span className={`meta-value status ${module.completed ? 'completed' : 'in-progress'}`}>
                  {module.completed ? 'Completed' : 'In Progress'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="module-content">
          <div className="content-section">
            <h2>Learning Objectives</h2>
            <ul className="objectives-list">
              {module.objectives?.map((objective, index) => (
                <li key={index}>{objective}</li>
              )) || [
                'Understand core concepts and principles',
                'Apply theoretical knowledge to practical problems',
                'Develop problem-solving skills',
                'Prepare for exam-specific questions'
              ].map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          </div>

          <div className="content-section">
            <h2>Key Topics</h2>
            <div className="topics-grid">
              {module.topics?.map((topic, index) => (
                <div key={index} className="topic-card">
                  <h4>{topic.name}</h4>
                  <p>{topic.description}</p>
                </div>
              )) || [
                { name: 'Core Concepts', description: 'Fundamental principles and theories' },
                { name: 'Problem Solving', description: 'Application of concepts to solve problems' },
                { name: 'Practice Questions', description: 'Exam-style questions and solutions' }
              ].map((topic, index) => (
                <div key={index} className="topic-card">
                  <h4>{topic.name}</h4>
                  <p>{topic.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="content-section">
            <h2>Study Resources</h2>
            <div className="resources-list">
              <div className="resource-item">
                <span className="resource-icon">📖</span>
                <div className="resource-info">
                  <h4>Textbook References</h4>
                  <p>NCERT and standard reference books for comprehensive understanding</p>
                </div>
              </div>
              <div className="resource-item">
                <span className="resource-icon">🎥</span>
                <div className="resource-info">
                  <h4>Video Lectures</h4>
                  <p>Online lectures from top educators and coaching institutes</p>
                </div>
              </div>
              <div className="resource-item">
                <span className="resource-icon">📝</span>
                <div className="resource-info">
                  <h4>Practice Questions</h4>
                  <p>Previous year questions and practice tests</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="module-actions">
          <div className="action-buttons">
            {!module.completed && (
              <button 
                className="complete-button"
                onClick={handleMarkComplete}
              >
                Mark as Complete
              </button>
            )}
            <button 
              className="roadmap-button"
              onClick={handleBackToRoadmap}
            >
              View Full Roadmap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleDetail; 