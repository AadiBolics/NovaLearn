import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModules } from '../context/ModuleContext';
import { getSyllabus } from '../data/syllabi';
import './Resources.css';

const Resources = () => {
  const navigate = useNavigate();
  const { modules } = useModules();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get the career goal from the first module
  const careerGoal = modules.length > 0 ? 
    (modules[0].careerGoal || 'web developer') : 'web developer';
  
  const syllabus = getSyllabus(careerGoal);

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  // Collect all resources from the syllabus
  const allResources = [];
  const categories = new Set();

  if (syllabus.roadmap) {
    syllabus.roadmap.forEach(phase => {
      phase.topics.forEach(topic => {
        topic.resources.forEach(resource => {
          allResources.push({
            ...resource,
            phase: phase.phase,
            topic: topic.name
          });
          categories.add(resource.type);
        });
      });
    });
  }

  const filteredResources = selectedCategory === 'all' 
    ? allResources 
    : allResources.filter(resource => resource.type === selectedCategory);

  const getResourceIcon = (type) => {
    switch (type) {
      case 'course': return '📚';
      case 'tutorial': return '🎯';
      case 'documentation': return '📖';
      case 'book': return '📘';
      case 'video': return '🎥';
      case 'guide': return '📋';
      case 'interactive': return '🎮';
      default: return '🔗';
    }
  };

  return (
    <div className="resources-page">
      <div className="resources-page-header">
        <div className="header-content">
          <button 
            className="back-button"
            onClick={handleBackToDashboard}
          >
            ← Back to Dashboard
          </button>
          
          <div className="header-info">
            <h1>Free Learning Resources</h1>
            <p>Curated resources for {syllabus.title} - All completely free!</p>
          </div>
        </div>
      </div>

      <div className="resources-content">
        <div className="resources-intro">
          <div className="intro-card">
            <h2>Your Learning Resources</h2>
            <p>We've curated the best free resources to help you master {syllabus.title}. These resources are carefully selected to provide you with comprehensive, high-quality learning materials without any cost.</p>
            
            <div className="resource-stats">
              <div className="stat-item">
                <div className="stat-value">{allResources.length}</div>
                <div className="stat-label">Total Resources</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{categories.size}</div>
                <div className="stat-label">Resource Types</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">100%</div>
                <div className="stat-label">Free</div>
              </div>
            </div>
          </div>
        </div>

        <div className="resources-filter">
          <div className="filter-section">
            <h3>Filter by Type</h3>
            <div className="filter-buttons">
              <button 
                className={`filter-button ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                All Resources ({allResources.length})
              </button>
              {Array.from(categories).map(category => (
                <button 
                  key={category}
                  className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {getResourceIcon(category)} {category.charAt(0).toUpperCase() + category.slice(1)} ({allResources.filter(r => r.type === category).length})
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="resources-grid">
          {filteredResources.map((resource, index) => (
            <div key={index} className="resource-card">
              <div className="resource-header">
                <div className="resource-icon">
                  {getResourceIcon(resource.type)}
                </div>
                <div className="resource-meta">
                  <span className="resource-type">{resource.type}</span>
                  <span className="resource-topic">{resource.topic}</span>
                </div>
              </div>
              
              <div className="resource-content">
                <h4 className="resource-title">{resource.name}</h4>
                <p className="resource-description">
                  From {resource.phase} - {resource.topic}
                </p>
              </div>
              
              <div className="resource-actions">
                <a 
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-link"
                >
                  Visit Resource →
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="no-resources">
            <h3>No resources found</h3>
            <p>Try selecting a different category or check back later for more resources.</p>
          </div>
        )}

        <div className="resources-actions">
          <div className="action-card">
            <h3>Ready to Start Learning?</h3>
            <p>Use these resources alongside your learning modules for the best results</p>
            <button 
              className="start-learning-button"
              onClick={handleBackToDashboard}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources; 