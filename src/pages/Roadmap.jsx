import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModules } from '../context/useModules';
import { jeeNeetService } from '../utils/jeeNeetService';
import './Roadmap.css';

const Roadmap = () => {
  const navigate = useNavigate();
  const { modules, getModuleProgress, getCurrentModule } = useModules();
  const [activeView, setActiveView] = useState('timeline'); // 'timeline' or 'grid'
  const [selectedSubject, setSelectedSubject] = useState(null); // null for overview, or subject key
  const [syllabusData, setSyllabusData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get the exam type from the first module or default to 'jee'
  const examType = modules.length > 0 ? 
    (modules[0].examType || 'jee') : 'jee';
  const examTypeDisplay = examType.toUpperCase();

  // Define available subjects based on exam type
  const availableSubjects = examType === 'jee' 
    ? ['physics', 'chemistry', 'mathematics']
    : ['physics', 'chemistry', 'biology'];

  useEffect(() => {
    const fetchSyllabus = async () => {
      setLoading(true);
      try {
        const data = await jeeNeetService.getSyllabus(examType);
        setSyllabusData(data);
      } catch (error) {
        console.error('Error fetching syllabus:', error);
        setSyllabusData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSyllabus();
  }, [examType]);

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleModuleClick = (moduleId) => {
    navigate(`/module/${moduleId}`);
  };

  const handleSubjectSelect = (subjectKey) => {
    setSelectedSubject(selectedSubject === subjectKey ? null : subjectKey);
  };

  const getModuleStatus = (module) => {
    if (module.completed) return 'completed';
    if (module.id === getCurrentModule()?.id) return 'current';
    return 'pending';
  };

  const getSubjectProgress = (subjectName) => {
    const subjectModules = modules.filter(m => m.subject === subjectName);
    if (subjectModules.length === 0) return 0;
    
    const completedModules = subjectModules.filter(m => m.completed).length;
    return Math.round((completedModules / subjectModules.length) * 100);
  };

  const getChapterProgress = (subjectName, chapterName) => {
    const chapterModules = modules.filter(m => 
      m.subject === subjectName && m.chapter === chapterName
    );
    if (chapterModules.length === 0) return 0;
    
    const completedModules = chapterModules.filter(m => m.completed).length;
    return Math.round((completedModules / chapterModules.length) * 100);
  };

  if (loading) {
    return (
      <div className="roadmap-page">
        <div className="roadmap-container">
          <div className="roadmap-header">
            <div className="header-content">
              <button 
                className="glass-button secondary"
                onClick={handleBackToDashboard}
              >
                ← Back to Dashboard
              </button>
              
              <div className="header-info">
                <h1>Loading Roadmap...</h1>
                <p>Preparing your {examTypeDisplay} learning journey</p>
              </div>
            </div>
          </div>
          
          <div className="roadmap-intro">
            <div className="loading-spinner"></div>
            <p>Loading your personalized study roadmap...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!syllabusData || !syllabusData.syllabus) {
    return (
      <div className="roadmap-page">
        <div className="roadmap-container">
          <div className="roadmap-header">
            <div className="header-content">
              <button 
                className="glass-button secondary"
                onClick={handleBackToDashboard}
              >
                ← Back to Dashboard
              </button>
              
              <div className="header-info">
                <h1>Roadmap Unavailable</h1>
                <p>Unable to load roadmap for {examTypeDisplay}</p>
              </div>
            </div>
          </div>
          
          <div className="roadmap-intro">
            <h2>Error Loading Roadmap</h2>
            <p>There was an issue loading your personalized roadmap. Please try again later.</p>
            <button 
              className="glass-button primary"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalModules = modules.length;
  const completedModules = modules.filter(m => m.completed).length;
  const progress = getModuleProgress();

  // If a specific subject is selected, show detailed view
  if (selectedSubject && syllabusData.syllabus.subjects[selectedSubject]) {
    const subject = syllabusData.syllabus.subjects[selectedSubject];
    const subjectModules = modules.filter(m => m.subject === subject.name);
    const subjectProgress = getSubjectProgress(subject.name);

    return (
      <div className="roadmap-page">
        <div className="roadmap-container">
          <div className="roadmap-header">
            <div className="header-content">
              <button 
                className="glass-button secondary"
                onClick={() => setSelectedSubject(null)}
              >
                ← Back to Overview
              </button>
              
              <div className="header-info">
                <h1>{subject.name} - {examTypeDisplay}</h1>
                <p>Detailed study roadmap for {subject.name}</p>
              </div>
            </div>
          </div>

          <div className="roadmap-intro">
            <div className="subject-overview">
              <div className="subject-info">
                <h2>{subject.name} Overview</h2>
                <p>Weightage: <strong>{subject.weightage}%</strong> | Progress: <strong>{subjectProgress}%</strong></p>
                <div className="subject-progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${subjectProgress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="subject-stats">
                <div className="stat-item">
                  <div className="stat-value">{subject.chapters.length}</div>
                  <div className="stat-label">Chapters</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">
                    {subject.chapters.reduce((total, chapter) => total + chapter.topics.length, 0)}
                  </div>
                  <div className="stat-label">Topics</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{subjectModules.length}</div>
                  <div className="stat-label">Modules</div>
                </div>
              </div>
            </div>
          </div>

          <div className="roadmap-content">
            <div className="chapters-timeline">
              {subject.chapters.map((chapter, index) => {
                const chapterProgress = getChapterProgress(subject.name, chapter.name);
                const chapterModules = modules.filter(m => 
                  m.subject === subject.name && m.chapter === chapter.name
                );

                return (
                  <div key={chapter.name} className="chapter-section">
                    <div className="chapter-card">
                      <div className="chapter-header">
                        <div className="chapter-number">{index + 1}</div>
                        <div className="chapter-info">
                          <h3>{chapter.name}</h3>
                          <div className="chapter-meta">
                            <span className="weightage">{chapter.weightage}% weightage</span>
                            <span className="difficulty">{chapter.difficulty} difficulty</span>
                            <span className="priority">{chapter.priority} priority</span>
                          </div>
                        </div>
                        <div className="chapter-progress">
                          <div className="progress-circle">
                            <div className="progress-fill" style={{ 
                              background: `conic-gradient(#00ff88 ${chapterProgress * 3.6}deg, #333 0deg)` 
                            }}></div>
                            <span>{chapterProgress}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="topics-grid">
                        {chapter.topics.map((topic, topicIndex) => {
                          const topicModule = chapterModules.find(m => m.name === topic);
                          const status = topicModule ? getModuleStatus(topicModule) : 'pending';
                          
                          return (
                            <div 
                              key={topic}
                              className={`topic-item ${status}`}
                              onClick={() => topicModule && handleModuleClick(topicModule.id)}
                            >
                              <div className="topic-header">
                                <span className="topic-number">{topicIndex + 1}</span>
                                <h4>{topic}</h4>
                                {topicModule && (
                                  <div className={`status-indicator ${status}`}></div>
                                )}
                              </div>
                              {topicModule && (
                                <div className="topic-meta">
                                  <span className="difficulty">{topicModule.difficulty}</span>
                                  <span className="weightage">{topicModule.weightage}%</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Overview view with subject selection
  return (
    <div className="roadmap-page">
      <div className="roadmap-container">
        <div className="roadmap-header">
          <div className="header-content">
            <button 
              className="glass-button secondary"
              onClick={handleBackToDashboard}
            >
              ← Back to Dashboard
            </button>
            
            <div className="header-info">
              <h1>{examTypeDisplay} Learning Roadmap</h1>
              <p>Your personalized study journey to success</p>
            </div>

            <div className="view-toggle">
              <button 
                className={`view-button ${activeView === 'timeline' ? 'active' : ''}`}
                onClick={() => setActiveView('timeline')}
              >
                Timeline View
              </button>
              <button 
                className={`view-button ${activeView === 'grid' ? 'active' : ''}`}
                onClick={() => setActiveView('grid')}
              >
                Grid View
              </button>
            </div>
          </div>
        </div>

        <div className="roadmap-intro">
          <h2>Your Personalized Study Plan</h2>
          <p>This roadmap is tailored to your {examTypeDisplay} preparation, optimized for your current level and study schedule.</p>
          
          <div className="roadmap-stats">
            <div className="stat-item">
              <div className="stat-value">{totalModules}</div>
              <div className="stat-label">Total Topics</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{completedModules}</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{progress}%</div>
              <div className="stat-label">Progress</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                {syllabusData.syllabus.subjects ? Object.keys(syllabusData.syllabus.subjects).length : 0}
              </div>
              <div className="stat-label">Subjects</div>
            </div>
          </div>
        </div>

        <div className="roadmap-content">
          {activeView === 'timeline' ? (
            <div className="roadmap-timeline">
              <div className="subjects-overview">
                {syllabusData.syllabus.subjects && Object.entries(syllabusData.syllabus.subjects).map(([subjectKey, subject], index) => {
                  const subjectModules = modules.filter(m => m.subject === subject.name);
                  const subjectProgress = getSubjectProgress(subject.name);
                  
                  return (
                    <div key={subjectKey} className="subject-section">
                      <div className="subject-card" onClick={() => handleSubjectSelect(subjectKey)}>
                        <div className="subject-header">
                          <h4>{subject.name}</h4>
                          <div className="subject-stats">
                            <span>{subjectModules.length} modules</span>
                            <span>{subject.weightage}% weightage</span>
                          </div>
                          <button className="expand-button">
                            <span>View Details</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M9 18l6-6-6-6"/>
                            </svg>
                          </button>
                        </div>
                        
                        <div className="subject-progress">
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ width: `${subjectProgress}%` }}
                            ></div>
                          </div>
                          <span>{subjectProgress}% complete</span>
                        </div>
                        
                        <div className="chapters-preview">
                          <h5>Chapters ({subject.chapters.length})</h5>
                          <div className="chapters-list">
                            {subject.chapters.slice(0, 3).map((chapter, idx) => (
                              <div key={chapter.name} className="chapter-preview">
                                <span className="chapter-name">{chapter.name}</span>
                                <span className="chapter-weightage">{chapter.weightage}%</span>
                              </div>
                            ))}
                            {subject.chapters.length > 3 && (
                              <div className="more-chapters">
                                +{subject.chapters.length - 3} more chapters
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="modules-list">
                          {subjectModules.slice(0, 4).map((module) => {
                            const status = getModuleStatus(module);
                            return (
                              <div 
                                key={module.id}
                                className={`module-item ${status}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleModuleClick(module.id);
                                }}
                              >
                                <div className="module-item-header">
                                  <h5>{module.name}</h5>
                                  <div className="module-status">
                                    <div className={`status-indicator ${status}`}></div>
                                  </div>
                                </div>
                                <div className="module-meta">
                                  <span className="difficulty">{module.difficulty}</span>
                                  <span className="weightage">{module.weightage}%</span>
                                </div>
                              </div>
                            );
                          })}
                          {subjectModules.length > 4 && (
                            <div className="more-modules">
                              +{subjectModules.length - 4} more modules
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="roadmap-grid">
              {syllabusData.syllabus.subjects && Object.entries(syllabusData.syllabus.subjects).map(([subjectKey, subject]) => {
                const subjectModules = modules.filter(m => m.subject === subject.name);
                const subjectProgress = getSubjectProgress(subject.name);
                
                return (
                  <div key={subjectKey} className="grid-subject-card" onClick={() => handleSubjectSelect(subjectKey)}>
                    <div className="grid-subject-header">
                      <h4>{subject.name}</h4>
                      <div className="grid-subject-stats">
                        <span>{subjectModules.length} modules</span>
                        <span>{subject.weightage}% weightage</span>
                      </div>
                      <button className="expand-button">
                        <span>View Details</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </button>
                    </div>
                    
                    <div className="grid-subject-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${subjectProgress}%` }}
                        ></div>
                      </div>
                      <span>{subjectProgress}% complete</span>
                    </div>
                    
                    <div className="chapters-preview">
                      <h5>Chapters ({subject.chapters.length})</h5>
                      <div className="chapters-grid">
                        {subject.chapters.slice(0, 4).map((chapter) => (
                          <div key={chapter.name} className="chapter-preview">
                            <span className="chapter-name">{chapter.name}</span>
                            <span className="chapter-weightage">{chapter.weightage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid-modules-list">
                      {subjectModules.slice(0, 3).map((module) => {
                        const status = getModuleStatus(module);
                        return (
                          <div 
                            key={module.id}
                            className={`grid-module-item ${status}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleModuleClick(module.id);
                            }}
                          >
                            <div className="grid-module-header">
                              <h6>{module.name}</h6>
                            </div>
                            <div className="grid-module-meta">
                              <span className="difficulty">{module.difficulty}</span>
                              <span className="weightage">{module.weightage}%</span>
                            </div>
                          </div>
                        );
                      })}
                      {subjectModules.length > 3 && (
                        <div className="more-modules">
                          +{subjectModules.length - 3} more modules
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Roadmap; 