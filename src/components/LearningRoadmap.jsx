import React, { useState } from 'react';
import './LearningRoadmap.css';

const LearningRoadmap = ({ modules, studyPlan }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);

  if (!modules || modules.length === 0) {
    return <div className="roadmap-error">No modules available</div>;
  }

  // Group modules by subject
  const modulesBySubject = modules.reduce((acc, module) => {
    const subject = module.subject || 'General';
    if (!acc[subject]) {
      acc[subject] = [];
    }
    acc[subject].push(module);
    return acc;
  }, {});

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '#28a745';
      case 'medium': return '#ffc107';
      case 'hard': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'very_high': return '#dc3545';
      case 'high': return '#fd7e14';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const totalModules = modules.length;
  const completedModules = modules.filter(m => m.completed).length;
  const progressPercentage = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  return (
    <div className="learning-roadmap">
      <div className="roadmap-header">
        <h2>Your JEE/NEET Learning Roadmap</h2>
        <p>Structured study plan organized by subjects and topics</p>
        
        <div className="roadmap-progress">
          <div className="progress-info">
            <span>Overall Progress: {completedModules}/{totalModules} modules</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="roadmap-container">
        <div className="subjects-overview">
          <h3>Subjects Overview</h3>
          <div className="subjects-grid">
            {Object.entries(modulesBySubject).map(([subject, subjectModules]) => {
              const subjectProgress = subjectModules.filter(m => m.completed).length;
              const subjectTotal = subjectModules.length;
              const subjectPercentage = subjectTotal > 0 ? (subjectProgress / subjectTotal) * 100 : 0;
              
              return (
                <div 
                  key={subject}
                  className={`subject-card ${selectedSubject === subject ? 'active' : ''}`}
                  onClick={() => setSelectedSubject(selectedSubject === subject ? null : subject)}
                >
                  <div className="subject-header">
                    <h4>{subject}</h4>
                    <div className="subject-stats">
                      <span>{subjectProgress}/{subjectTotal} completed</span>
                    </div>
                  </div>
                  
                  <div className="subject-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${subjectPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {selectedSubject === subject && (
                    <div className="subject-modules">
                      {subjectModules.map((module) => (
                        <div 
                          key={module.id}
                          className={`module-item ${module.completed ? 'completed' : ''} ${selectedModule === module.id ? 'selected' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedModule(selectedModule === module.id ? null : module.id);
                          }}
                        >
                          <div className="module-header">
                            <h5>{module.title}</h5>
                            <div className="module-badges">
                              <span 
                                className="difficulty-badge"
                                style={{ backgroundColor: getDifficultyColor(module.difficulty) }}
                              >
                                {module.difficulty}
                              </span>
                              <span 
                                className="priority-badge"
                                style={{ backgroundColor: getPriorityColor(module.priority) }}
                              >
                                {module.priority.replace('_', ' ')}
                              </span>
                              <span className="weightage-badge">
                                {module.weightage}% weightage
                              </span>
                            </div>
                          </div>
                          
                          <p className="module-description">{module.description}</p>
                          
                          {selectedModule === module.id && (
                            <div className="module-details">
                              {module.topics && (
                                <div className="topics-section">
                                  <h6>Topics Covered:</h6>
                                  <div className="topics-list">
                                    {module.topics.map((topic, index) => (
                                      <span key={index} className="topic-tag">{topic}</span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              <div className="module-meta">
                                <div className="meta-item">
                                  <strong>Study Hours:</strong> {module.studyHours || '2-4 hours'}
                                </div>
                                <div className="meta-item">
                                  <strong>Target Year:</strong> {module.targetYear || '2025'}
                                </div>
                                <div className="meta-item">
                                  <strong>Current Level:</strong> {module.currentLevel || 'beginner'}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {studyPlan && (
          <div className="study-plan-section">
            <h3>Recommended Study Schedule</h3>
            <div className="study-plan">
              <div className="plan-phase">
                <h4>Phase 1: Foundation Building (Months 1-3)</h4>
                <p>Focus on core concepts and fundamentals</p>
                <ul>
                  <li>Complete basic topics in each subject</li>
                  <li>Build strong conceptual understanding</li>
                  <li>Practice basic problems</li>
                </ul>
              </div>
              
              <div className="plan-phase">
                <h4>Phase 2: Advanced Topics (Months 4-6)</h4>
                <p>Move to complex topics and advanced concepts</p>
                <ul>
                  <li>Tackle high-weightage chapters</li>
                  <li>Solve advanced problems</li>
                  <li>Take topic-wise tests</li>
                </ul>
              </div>
              
              <div className="plan-phase">
                <h4>Phase 3: Revision & Mock Tests (Months 7-8)</h4>
                <p>Comprehensive revision and full-length tests</p>
                <ul>
                  <li>Complete syllabus revision</li>
                  <li>Take full-length mock tests</li>
                  <li>Analyze weak areas</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="roadmap-summary">
        <div className="summary-stats">
          <div className="stat">
            <div className="stat-number">{Object.keys(modulesBySubject).length}</div>
            <div className="stat-label">Subjects</div>
          </div>
          <div className="stat">
            <div className="stat-number">{totalModules}</div>
            <div className="stat-label">Topics</div>
          </div>
          <div className="stat">
            <div className="stat-number">{completedModules}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat">
            <div className="stat-number">{Math.round(progressPercentage)}%</div>
            <div className="stat-label">Progress</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningRoadmap; 