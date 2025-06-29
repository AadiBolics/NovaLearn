import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModules } from '../context/useModules';
import { jeeNeetService } from '../utils/jeeNeetService';
import './OnboardingForm.css';

const OnboardingForm = () => {
  const navigate = useNavigate();
  const { setModules } = useModules();
  const [selectedExam, setSelectedExam] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);

  const handleExamSelect = async (examType) => {
    setSelectedExam(examType);
    setShowAnimation(true);
    
    // Add a small delay for the selection animation
    setTimeout(async () => {
      try {
        // Get syllabus and create modules
        const syllabusData = await jeeNeetService.getSyllabus(examType);
        
        // Create modules from syllabus
        const modules = [];
        Object.entries(syllabusData.syllabus.subjects).forEach(([subjectKey, subject]) => {
          subject.chapters.forEach((chapter, index) => {
            modules.push({
              id: `${subjectKey}-${index}`,
              title: chapter.name,
              description: `${chapter.name} - ${chapter.topics.join(', ')}`,
              subject: subject.name,
              weightage: chapter.weightage,
              difficulty: chapter.difficulty,
              priority: chapter.priority,
              topics: chapter.topics,
              examType: examType,
              targetYear: '2025',
              currentLevel: 'beginner',
              studyHours: '2-4'
            });
          });
        });

        // Sort modules by priority and weightage
        modules.sort((a, b) => {
          const priorityOrder = { 'very_high': 4, 'high': 3, 'medium': 2, 'low': 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority] || b.weightage - a.weightage;
        });

        setModules(modules);
        navigate('/dashboard');
      } catch (error) {
        console.error('Error creating learning path:', error);
        // Fallback to basic modules
        const fallbackModules = [
          {
            id: 'physics-1',
            title: 'Physics Fundamentals',
            description: 'Core physics concepts for JEE/NEET',
            subject: 'Physics',
            weightage: 25,
            difficulty: 'medium',
            priority: 'high',
            examType: examType,
            targetYear: '2025',
            currentLevel: 'beginner',
            studyHours: '2-4'
          },
          {
            id: 'chemistry-1',
            title: 'Chemistry Basics',
            description: 'Essential chemistry topics',
            subject: 'Chemistry',
            weightage: 25,
            difficulty: 'medium',
            priority: 'high',
            examType: examType,
            targetYear: '2025',
            currentLevel: 'beginner',
            studyHours: '2-4'
          }
        ];
        setModules(fallbackModules);
        navigate('/dashboard');
      }
    }, 800);
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-background">
        <div className="floating-shapes">
          <div className="shape shape-1">📚</div>
          <div className="shape shape-2">🎯</div>
          <div className="shape shape-3">⚡</div>
          <div className="shape shape-4">🏆</div>
          <div className="shape shape-5">💡</div>
        </div>
      </div>

      <div className={`onboarding-card ${showAnimation ? 'animate' : ''}`}>
        <div className="card-header">
          <div className="logo-section">
            <div className="logo-icon">🚀</div>
            <h1 className="app-title">NovaLearn</h1>
          </div>
          <p className="app-subtitle">Your AI-powered JEE/NEET preparation companion</p>
        </div>

        {!showAnimation ? (
          <div className="exam-selection">
            <div className="selection-header">
              <h2>Choose Your Exam</h2>
              <p>Select the exam you're preparing for to get started</p>
            </div>

            <div className="exam-options">
              <div 
                className={`exam-option ${selectedExam === 'jee' ? 'selected' : ''}`}
                onClick={() => handleExamSelect('jee')}
              >
                <div className="exam-icon">⚡</div>
                <div className="exam-content">
                  <h3>JEE (Joint Entrance Examination)</h3>
                  <p>For engineering aspirants - IITs, NITs, and other top engineering colleges</p>
                  <div className="exam-details">
                    <div className="detail-item">
                      <span className="detail-label">Subjects:</span>
                      <span className="detail-value">Physics, Chemistry, Mathematics</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Duration:</span>
                      <span className="detail-value">3 hours</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Total Marks:</span>
                      <span className="detail-value">300</span>
                    </div>
                  </div>
                </div>
                <div className="selection-indicator">
                  {selectedExam === 'jee' ? '✓' : '→'}
                </div>
              </div>

              <div 
                className={`exam-option ${selectedExam === 'neet' ? 'selected' : ''}`}
                onClick={() => handleExamSelect('neet')}
              >
                <div className="exam-icon">🏥</div>
                <div className="exam-content">
                  <h3>NEET (National Eligibility cum Entrance Test)</h3>
                  <p>For medical aspirants - MBBS, BDS, and other medical courses</p>
                  <div className="exam-details">
                    <div className="detail-item">
                      <span className="detail-label">Subjects:</span>
                      <span className="detail-value">Physics, Chemistry, Biology</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Duration:</span>
                      <span className="detail-value">3 hours 20 minutes</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Total Marks:</span>
                      <span className="detail-value">720</span>
                    </div>
                  </div>
                </div>
                <div className="selection-indicator">
                  {selectedExam === 'neet' ? '✓' : '→'}
                </div>
              </div>
            </div>

            <div className="features-preview">
              <h3>What you'll get:</h3>
              <div className="features-grid">
                <div className="feature-item">
                  <div className="feature-icon">📊</div>
                  <span>Personalized Study Plan</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🎯</div>
                  <span>Priority-based Topics</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">📚</div>
                  <span>Top Indian Resources</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">📈</div>
                  <span>Progress Tracking</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="loading-section">
            <div className="loading-animation">
              <div className="loading-spinner"></div>
              <div className="loading-text">
                <h3>Creating Your Learning Path</h3>
                <p>Analyzing {selectedExam.toUpperCase()} syllabus and preparing your personalized study plan...</p>
              </div>
            </div>
            
            <div className="loading-steps">
              <div className="step-item">
                <div className="step-icon">📋</div>
                <span>Analyzing syllabus structure</span>
              </div>
              <div className="step-item">
                <div className="step-icon">🎯</div>
                <span>Prioritizing topics by weightage</span>
              </div>
              <div className="step-item">
                <div className="step-icon">📚</div>
                <span>Gathering learning resources</span>
              </div>
              <div className="step-item">
                <div className="step-icon">✅</div>
                <span>Finalizing your roadmap</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingForm; 