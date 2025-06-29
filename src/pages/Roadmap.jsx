import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModules } from '../context/useModules';
import { jeeNeetService } from '../utils/jeeNeetService';
import LearningRoadmap from '../components/LearningRoadmap';
import SkillHierarchy from '../components/SkillHierarchy';
import './Roadmap.css';

const Roadmap = () => {
  const navigate = useNavigate();
  const { modules } = useModules();
  const [syllabusData, setSyllabusData] = useState(null);
  const [studyPlan, setStudyPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('roadmap');

  // Get exam type from modules
  const examType = modules.length > 0 ? 
    (modules[0].examType || 'jee') : 'jee';

  useEffect(() => {
    const fetchSyllabusData = async () => {
      setLoading(true);
      try {
        const syllabus = await jeeNeetService.getSyllabus(examType);
        const plan = await jeeNeetService.getStudyPlan(examType, '2025-05-01', 'beginner');
        
        setSyllabusData(syllabus);
        setStudyPlan(plan);
      } catch (error) {
        console.error('Error fetching syllabus data:', error);
        // Set fallback data
        setSyllabusData({
          examType: examType,
          syllabus: {
            subjects: {
              physics: {
                name: 'Physics',
                weightage: 33,
                chapters: [
                  { name: 'Mechanics', weightage: 12, difficulty: 'medium', priority: 'high', topics: ['Kinematics', 'Dynamics', 'Work & Energy'] },
                  { name: 'Thermodynamics', weightage: 8, difficulty: 'medium', priority: 'medium', topics: ['Laws of Thermodynamics', 'Heat Transfer'] }
                ]
              },
              chemistry: {
                name: 'Chemistry',
                weightage: 33,
                chapters: [
                  { name: 'Physical Chemistry', weightage: 12, difficulty: 'medium', priority: 'high', topics: ['Atomic Structure', 'Chemical Bonding'] },
                  { name: 'Organic Chemistry', weightage: 10, difficulty: 'hard', priority: 'high', topics: ['Hydrocarbons', 'Functional Groups'] }
                ]
              }
            }
          }
        });
      } finally {
        setLoading(false);
      }
    };

    if (modules.length > 0) {
      fetchSyllabusData();
    }
  }, [modules, examType]);

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="roadmap-page">
        <div className="roadmap-header">
          <div className="header-content">
            <button 
              className="back-button"
              onClick={handleBackToDashboard}
            >
              ← Back to Dashboard
            </button>
            
            <div className="header-info">
              <h1>Loading Your Learning Roadmap...</h1>
              <p>Preparing your personalized {examType.toUpperCase()} study plan</p>
            </div>
          </div>
        </div>
        
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Analyzing syllabus and creating your study timeline...</p>
        </div>
      </div>
    );
  }

  if (!syllabusData || modules.length === 0) {
    return (
      <div className="roadmap-page">
        <div className="roadmap-header">
          <div className="header-content">
            <button 
              className="back-button"
              onClick={handleBackToDashboard}
            >
              ← Back to Dashboard
            </button>
            
            <div className="header-info">
              <h1>No Learning Path Found</h1>
              <p>Please complete the onboarding to create your learning roadmap</p>
            </div>
          </div>
        </div>
        
        <div className="no-data-container">
          <h3>Complete Onboarding First</h3>
          <p>You need to complete the onboarding process to generate your personalized learning roadmap.</p>
          <button 
            className="start-onboarding-button"
            onClick={() => navigate('/')}
          >
            Start Onboarding
          </button>
        </div>
      </div>
    );
  }

  const examTypeDisplay = examType.toUpperCase();
  const totalModules = modules.length;
  const completedModules = modules.filter(m => m.completed).length;
  const progressPercentage = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  return (
    <div className="roadmap-page">
      <div className="roadmap-header">
        <div className="header-content">
          <button 
            className="back-button"
            onClick={handleBackToDashboard}
          >
            ← Back to Dashboard
          </button>
          
          <div className="header-info">
            <h1>Your {examTypeDisplay} Learning Roadmap</h1>
            <p>Personalized study plan based on {examTypeDisplay} syllabus and your current level</p>
            <div className="progress-info">
              <span>Progress: {completedModules}/{totalModules} modules completed</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="roadmap-content">
        <div className="view-toggle">
          <button 
            className={`toggle-button ${activeView === 'roadmap' ? 'active' : ''}`}
            onClick={() => setActiveView('roadmap')}
          >
            Learning Roadmap
          </button>
          <button 
            className={`toggle-button ${activeView === 'hierarchy' ? 'active' : ''}`}
            onClick={() => setActiveView('hierarchy')}
          >
            Skill Hierarchy
          </button>
        </div>

        {activeView === 'roadmap' ? (
          <div className="roadmap-section">
            <div className="roadmap-intro">
              <h2>Your Personalized Study Plan</h2>
              <p>This roadmap is tailored to your {examTypeDisplay} preparation, optimized for your current level and study schedule.</p>
              
              <div className="roadmap-stats">
                <div className="stat-item">
                  <div className="stat-value">{totalModules}</div>
                  <div className="stat-label">Total Topics</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{syllabusData.syllabus.subjects ? Object.keys(syllabusData.syllabus.subjects).length : 3}</div>
                  <div className="stat-label">Subjects</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{examTypeDisplay}</div>
                  <div className="stat-label">Exam Type</div>
                </div>
              </div>
            </div>

            <LearningRoadmap 
              modules={modules}
              syllabusData={syllabusData}
              studyPlan={studyPlan}
            />
          </div>
        ) : (
          <div className="hierarchy-section">
            <div className="hierarchy-intro">
              <h2>Skill Hierarchy & Dependencies</h2>
              <p>Understanding the relationships between topics helps you study more effectively.</p>
            </div>

            <SkillHierarchy 
              syllabusData={syllabusData}
              modules={modules}
            />
          </div>
        )}

        <div className="roadmap-actions">
          <div className="action-card">
            <h3>Ready to Start Learning?</h3>
            <p>Begin with the highest priority topics and work through your personalized roadmap</p>
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

export default Roadmap; 