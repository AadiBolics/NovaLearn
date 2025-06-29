import React, { useState } from 'react';
import './SkillHierarchy.css';

const SkillHierarchy = ({ syllabusData, modules }) => {
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [expandedChapter, setExpandedChapter] = useState(null);

  if (!syllabusData || !syllabusData.syllabus) {
    return <div className="hierarchy-error">No syllabus data available</div>;
  }

  const { subjects } = syllabusData.syllabus;
  const examType = syllabusData.examType || 'JEE';

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '#28a745';
      case 'medium': return '#ffc107';
      case 'hard': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getWeightageColor = (weightage) => {
    if (weightage >= 15) return '#dc3545';
    if (weightage >= 10) return '#fd7e14';
    if (weightage >= 5) return '#ffc107';
    return '#28a745';
  };

  const toggleSubject = (subjectKey) => {
    setExpandedSubject(expandedSubject === subjectKey ? null : subjectKey);
  };

  const toggleChapter = (chapterKey) => {
    setExpandedChapter(expandedChapter === chapterKey ? null : chapterKey);
  };

  const totalChapters = Object.values(subjects).reduce((total, subject) => 
    total + subject.chapters.length, 0
  );

  const totalTopics = Object.values(subjects).reduce((total, subject) => 
    total + subject.chapters.reduce((chapterTotal, chapter) => 
      chapterTotal + chapter.topics.length, 0
    ), 0
  );

  return (
    <div className="skill-hierarchy">
      <div className="hierarchy-header">
        <h2>{examType} Syllabus Hierarchy</h2>
        <p>Understanding the structure and relationships between subjects, chapters, and topics</p>
      </div>

      <div className="hierarchy-container">
        <div className="subjects-hierarchy">
          {Object.entries(subjects).map(([subjectKey, subject]) => {
            const isSubjectExpanded = expandedSubject === subjectKey;
            const subjectWeightage = subject.weightage || 0;
            const completedChapters = subject.chapters.filter(chapter => 
              modules.some(module => 
                module.subject === subject.name && 
                module.title === chapter.name && 
                module.completed
              )
            ).length;

            return (
              <div key={subjectKey} className={`subject-hierarchy ${isSubjectExpanded ? 'expanded' : ''}`}>
                <div 
                  className="subject-header"
                  onClick={() => toggleSubject(subjectKey)}
                >
                  <div className="subject-info">
                    <h3>{subject.name}</h3>
                    <div className="subject-meta">
                      <span className="weightage" style={{ backgroundColor: getWeightageColor(subjectWeightage) }}>
                        {subjectWeightage}% weightage
                      </span>
                      <span className="chapters-count">{subject.chapters.length} chapters</span>
                      <span className="progress">{completedChapters}/{subject.chapters.length} completed</span>
                    </div>
                  </div>
                  <div className="expand-icon">
                    {isSubjectExpanded ? '−' : '+'}
                  </div>
                </div>

                {isSubjectExpanded && (
                  <div className="subject-content">
                    <div className="chapters-list">
                      {subject.chapters.map((chapter, chapterIndex) => {
                        const chapterKey = `${subjectKey}-${chapterIndex}`;
                        const isChapterExpanded = expandedChapter === chapterKey;
                        const isCompleted = modules.some(module => 
                          module.subject === subject.name && 
                          module.title === chapter.name && 
                          module.completed
                        );

                        return (
                          <div key={chapterIndex} className={`chapter-item ${isCompleted ? 'completed' : ''}`}>
                            <div 
                              className="chapter-header"
                              onClick={() => toggleChapter(chapterKey)}
                            >
                              <div className="chapter-info">
                                <h4>{chapter.name}</h4>
                                <div className="chapter-meta">
                                  <span 
                                    className="difficulty"
                                    style={{ backgroundColor: getDifficultyColor(chapter.difficulty) }}
                                  >
                                    {chapter.difficulty}
                                  </span>
                                  <span className="weightage">{chapter.weightage}%</span>
                                  <span className="priority">{chapter.priority.replace('_', ' ')}</span>
                                  <span className="topics-count">{chapter.topics.length} topics</span>
                                </div>
                              </div>
                              <div className="expand-icon">
                                {isChapterExpanded ? '−' : '+'}
                              </div>
                            </div>

                            {isChapterExpanded && (
                              <div className="chapter-content">
                                <div className="topics-list">
                                  {chapter.topics.map((topic, topicIndex) => (
                                    <div key={topicIndex} className="topic-item">
                                      <div className="topic-name">{topic}</div>
                                      <div className="topic-status">
                                        {modules.some(module => 
                                          module.subject === subject.name && 
                                          module.title === chapter.name && 
                                          module.topics?.includes(topic) &&
                                          module.completed
                                        ) ? (
                                          <span className="completed-badge">✓ Completed</span>
                                        ) : (
                                          <span className="pending-badge">⏳ Pending</span>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="hierarchy-insights">
          <h3>Study Insights</h3>
          <div className="insights-grid">
            <div className="insight-card">
              <h4>High Priority Chapters</h4>
              <p>Focus on chapters with 'very_high' and 'high' priority first</p>
              <div className="priority-chapters">
                {Object.values(subjects).flatMap(subject => 
                  subject.chapters.filter(chapter => 
                    chapter.priority === 'very_high' || chapter.priority === 'high'
                  ).map(chapter => ({
                    name: chapter.name,
                    subject: subject.name,
                    weightage: chapter.weightage
                  }))
                ).slice(0, 5).map((chapter, index) => (
                  <div key={index} className="priority-item">
                    <span className="chapter-name">{chapter.name}</span>
                    <span className="subject-name">({chapter.subject})</span>
                    <span className="weightage">{chapter.weightage}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="insight-card">
              <h4>Weightage Distribution</h4>
              <p>Chapters with higher weightage should get more study time</p>
              <div className="weightage-breakdown">
                {Object.entries(subjects).map(([subjectKey, subject]) => (
                  <div key={subjectKey} className="subject-weightage">
                    <span className="subject-name">{subject.name}</span>
                    <span className="total-weightage">{subject.weightage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hierarchy-summary">
        <div className="summary-stats">
          <div className="stat">
            <div className="stat-number">{Object.keys(subjects).length}</div>
            <div className="stat-label">Subjects</div>
          </div>
          <div className="stat">
            <div className="stat-number">{totalChapters}</div>
            <div className="stat-label">Chapters</div>
          </div>
          <div className="stat">
            <div className="stat-number">{totalTopics}</div>
            <div className="stat-label">Topics</div>
          </div>
          <div className="stat">
            <div className="stat-number">100%</div>
            <div className="stat-label">Total Weightage</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillHierarchy; 