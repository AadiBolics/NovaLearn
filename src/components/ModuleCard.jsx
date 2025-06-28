import React from 'react';
import { useNavigate } from 'react-router-dom';

const ModuleCard = ({ module }) => {
  const navigate = useNavigate();

  const handleStartModule = () => {
    navigate(`/module/${module.id}`);
  };

  return (
    <div className="module-card">
      <div className="card-body">
        <h5 className="module-title">{module.title}</h5>
        <p className="module-description">{module.description}</p>
        
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
        <button 
          className="start-button"
          onClick={handleStartModule}
          disabled={module.completed}
        >
          {module.completed ? 'Completed' : 'Start Module'}
        </button>
      </div>
    </div>
  );
};

export default ModuleCard; 