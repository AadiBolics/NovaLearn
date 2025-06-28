import React from 'react';
import { Link } from 'react-router-dom';
import ModuleCard from '../components/ModuleCard';
import { useModules } from '../context/ModuleContext';
import './Dashboard.css';

const Dashboard = () => {
  const { modules } = useModules();

  if (!modules || modules.length === 0) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>No Learning Modules Found</h1>
        </div>
        <div className="completion-alert">
          <h5>Please complete the onboarding form</h5>
          <p>Generate your personalized learning path to get started.</p>
        </div>
      </div>
    );
  }

  const completedCount = modules.filter(module => module.completed).length;
  const totalCount = modules.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Your Learning Dashboard</h1>
          <div className="header-actions">
            <Link to="/roadmap" className="roadmap-button">
              View Learning Roadmap
            </Link>
            <Link to="/resources" className="resources-button">
              Free Resources
            </Link>
          </div>
        </div>
      </div>
      
      <div className="progress-section">
        <div className="progress-info">
          <span className="progress-text">Progress: {completedCount} of {totalCount} modules completed</span>
          <span className="progress-percentage">{progressPercentage}%</span>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="modules-grid">
        {modules.map(module => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard; 