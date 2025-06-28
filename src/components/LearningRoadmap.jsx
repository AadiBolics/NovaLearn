import React, { useState } from 'react';
import './LearningRoadmap.css';

const LearningRoadmap = ({ syllabus }) => {
  const [selectedPhase, setSelectedPhase] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState(null);

  if (!syllabus || !syllabus.roadmap) {
    return <div className="roadmap-error">No roadmap available</div>;
  }

  const { roadmap } = syllabus;

  return (
    <div className="learning-roadmap">
      <div className="roadmap-header">
        <h2>Your Learning Roadmap</h2>
        <p>Follow this structured path to become a {syllabus.title}</p>
      </div>

      <div className="roadmap-container">
        <div className="roadmap-timeline">
          {roadmap.map((phase, phaseIndex) => (
            <div 
              key={phaseIndex}
              className={`roadmap-phase ${selectedPhase === phaseIndex ? 'active' : ''}`}
              onClick={() => setSelectedPhase(phaseIndex)}
            >
              <div className="phase-marker">
                <div className="phase-number">{phaseIndex + 1}</div>
                <div className="phase-connector"></div>
              </div>
              
              <div className="phase-content">
                <h3 className="phase-title">{phase.phase}</h3>
                <div className="phase-duration">{phase.duration}</div>
                
                {selectedPhase === phaseIndex && (
                  <div className="phase-topics">
                    {phase.topics.map((topic, topicIndex) => (
                      <div 
                        key={topicIndex}
                        className={`topic-card ${selectedTopic === topicIndex ? 'selected' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTopic(selectedTopic === topicIndex ? null : topicIndex);
                        }}
                      >
                        <div className="topic-header">
                          <h4>{topic.name}</h4>
                          <div className="topic-duration">2-3 weeks</div>
                        </div>
                        
                        <p className="topic-description">{topic.description}</p>
                        
                        {selectedTopic === topicIndex && (
                          <div className="topic-details">
                            <div className="skills-section">
                              <h5>Skills You'll Learn:</h5>
                              <div className="skills-list">
                                {topic.skills.map((skill, skillIndex) => (
                                  <span key={skillIndex} className="skill-tag">{skill}</span>
                                ))}
                              </div>
                            </div>
                            
                            <div className="projects-section">
                              <h5>Projects:</h5>
                              <ul className="projects-list">
                                {topic.projects.map((project, projectIndex) => (
                                  <li key={projectIndex}>{project}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="resources-section">
                              <h5>Free Resources:</h5>
                              <div className="resources-list">
                                {topic.resources.map((resource, resourceIndex) => (
                                  <a 
                                    key={resourceIndex}
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`resource-link ${resource.type}`}
                                  >
                                    <span className="resource-type">{resource.type}</span>
                                    <span className="resource-name">{resource.name}</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="roadmap-summary">
        <div className="summary-stats">
          <div className="stat">
            <div className="stat-number">{roadmap.length}</div>
            <div className="stat-label">Phases</div>
          </div>
          <div className="stat">
            <div className="stat-number">
              {roadmap.reduce((total, phase) => total + phase.topics.length, 0)}
            </div>
            <div className="stat-label">Topics</div>
          </div>
          <div className="stat">
            <div className="stat-number">
              {roadmap.reduce((total, phase) => 
                total + phase.topics.reduce((topicTotal, topic) => 
                  topicTotal + topic.resources.length, 0), 0
              )}
            </div>
            <div className="stat-label">Resources</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningRoadmap; 