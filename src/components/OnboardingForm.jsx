import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModules } from '../context/useModules';
import { jeeNeetService } from '../utils/jeeNeetService';
import './OnboardingForm.css';

const OnboardingForm = () => {
  const navigate = useNavigate();
  const { setModules } = useModules();
  const [selectedExam, setSelectedExam] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleExamSelection = async (examType) => {
    setSelectedExam(examType);
    setIsLoading(true);
    setError('');

    try {
      // Get syllabus data for the selected exam
      const syllabusData = await jeeNeetService.getSyllabus(examType);
      
      if (syllabusData && syllabusData.syllabus) {
        // Convert syllabus to modules format
        const modules = [];
        const subjects = syllabusData.syllabus.subjects;
        
        Object.keys(subjects).forEach(subjectKey => {
          const subject = subjects[subjectKey];
          subject.chapters.forEach(chapter => {
            modules.push({
              id: `${subjectKey}-${chapter.name.toLowerCase().replace(/\s+/g, '-')}`,
              name: chapter.name,
              subject: subject.name,
              examType: examType,
              weightage: chapter.weightage,
              difficulty: chapter.difficulty,
              priority: chapter.priority,
              topics: chapter.topics,
              completed: false,
              progress: 0,
              estimatedHours: Math.ceil(chapter.weightage * 2), // Rough estimate
              resources: []
            });
          });
        });

        // Sort modules by priority and weightage
        modules.sort((a, b) => {
          const priorityOrder = { 'very_high': 4, 'high': 3, 'medium': 2, 'low': 1 };
          const aPriority = priorityOrder[a.priority] || 1;
          const bPriority = priorityOrder[b.priority] || 1;
          
          if (aPriority !== bPriority) {
            return bPriority - aPriority;
          }
          return b.weightage - a.weightage;
        });

        setModules(modules);
        navigate('/dashboard');
      } else {
        setError('Unable to load syllabus data. Please try again.');
      }
    } catch (err) {
      console.error('Error during onboarding:', err);
      setError('An error occurred while setting up your learning path. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      <div className="onboarding-content">
        <div className="onboarding-card glass-card elevated">
          <div className="onboarding-header">
            <h1 className="onboarding-title">Welcome to NovaLearn</h1>
            <p className="onboarding-subtitle">
              Your AI-powered companion for JEE & NEET preparation
            </p>
          </div>

          <div className="onboarding-body">
            <div className="exam-selection">
              <h2>Choose Your Exam</h2>
              <p>Select the exam you're preparing for to get started with your personalized learning journey.</p>
              
              <div className="exam-options">
                <button
                  className={`exam-option glass-card interactive ${selectedExam === 'jee' ? 'selected' : ''}`}
                  onClick={() => handleExamSelection('jee')}
                  disabled={isLoading}
                >
                  <div className="exam-icon">🎯</div>
                  <div className="exam-info">
                    <h3>JEE Main & Advanced</h3>
                    <p>Joint Entrance Examination for Engineering</p>
                    <div className="exam-details">
                      <span>Physics • Chemistry • Mathematics</span>
                    </div>
                  </div>
                </button>

                <button
                  className={`exam-option glass-card interactive ${selectedExam === 'neet' ? 'selected' : ''}`}
                  onClick={() => handleExamSelection('neet')}
                  disabled={isLoading}
                >
                  <div className="exam-icon">🏥</div>
                  <div className="exam-info">
                    <h3>NEET</h3>
                    <p>National Eligibility cum Entrance Test</p>
                    <div className="exam-details">
                      <span>Physics • Chemistry • Biology</span>
                    </div>
                  </div>
                </button>
              </div>

              {error && (
                <div className="error-message status-error">
                  <p>{error}</p>
                </div>
              )}

              {isLoading && (
                <div className="loading-section">
                  <div className="loading-spinner"></div>
                  <p>Setting up your personalized learning path...</p>
                </div>
              )}
            </div>

            <div className="onboarding-features">
              <h3>What you'll get:</h3>
              <div className="features-grid">
                <div className="feature-item">
                  <div className="feature-icon">🗺️</div>
                  <div className="feature-text">
                    <h4>Personalized Roadmap</h4>
                    <p>AI-generated study plan tailored to your exam</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">📚</div>
                  <div className="feature-text">
                    <h4>Curated Resources</h4>
                    <p>Best study materials from top Indian platforms</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🤖</div>
                  <div className="feature-text">
                    <h4>AI Study Assistant</h4>
                    <p>24/7 support for doubts and motivation</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">📊</div>
                  <div className="feature-text">
                    <h4>Progress Tracking</h4>
                    <p>Monitor your learning journey with detailed analytics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm; 