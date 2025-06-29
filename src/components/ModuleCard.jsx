import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ModuleCard = ({ module }) => {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

  const handleStartModule = () => {
    navigate(`/module/${module.id}`);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="module-card">
      <div className="card-body">
        <div className="module-header">
          <h5 className="module-title">{module.title}</h5>
          <div className="module-meta">
            {module.duration && (
              <span className="meta-item duration">
                <i className="fas fa-clock"></i> {module.duration}
              </span>
            )}
            {module.difficulty && (
              <span className={`meta-item difficulty ${module.difficulty.toLowerCase()}`}>
                {module.difficulty}
              </span>
            )}
          </div>
        </div>
        
        <p className="module-description">{module.description}</p>
        
        {module.skills && module.skills.length > 0 && (
          <div className="module-skills">
            <div className="skills-label">Skills you'll learn:</div>
            <div className="skills-list">
              {module.skills.slice(0, 3).map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
              {module.skills.length > 3 && (
                <span className="skill-tag more">+{module.skills.length - 3} more</span>
              )}
            </div>
          </div>
        )}
        
        <div className="module-challenge">
          <div className="challenge-label">Challenge</div>
          <p className="challenge-text">{module.challenge}</p>
        </div>
        
        {module.completed && (
          <div className="module-status">
            <span className="completed-badge">✓ Module completed!</span>
          </div>
        )}
      </div>
      
      <div className="card-footer">
        <div className="footer-actions">
          <button 
            className="start-button"
            onClick={handleStartModule}
            disabled={module.completed}
          >
            {module.completed ? 'Completed' : 'Start Module'}
          </button>
          
          {(module.resources || module.projects) && (
            <button 
              className="details-button"
              onClick={toggleDetails}
            >
              {showDetails ? 'Hide Details' : 'View Details'}
            </button>
          )}
        </div>
      </div>
      
      {showDetails && (module.resources || module.projects) && (
        <div className="module-details">
          {module.resources && module.resources.length > 0 && (
            <div className="resources-section">
              <h6>Learning Resources</h6>
              <div className="resources-list">
                {module.resources.map((resource, index) => (
                  <div key={index} className="resource-item">
                    <div className="resource-type">{resource.type}</div>
                    <div className="resource-name">{resource.name}</div>
                    {resource.description && (
                      <div className="resource-description">{resource.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {module.projects && module.projects.length > 0 && (
            <div className="projects-section">
              <h6>Projects</h6>
              <div className="projects-list">
                {module.projects.map((project, index) => (
                  <div key={index} className="project-item">
                    <div className="project-name">{project.name}</div>
                    <div className="project-description">{project.description}</div>
                    {project.deliverables && (
                      <div className="project-deliverables">
                        <strong>Deliverables:</strong>
                        <ul>
                          {project.deliverables.map((deliverable, idx) => (
                            <li key={idx}>{deliverable}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ModuleCard; 