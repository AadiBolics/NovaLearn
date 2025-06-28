import React, { useState } from 'react';
import { generateModules } from '../utils/gptService';
import LoadingSpinner from './LoadingSpinner';
import { getAvailableCareers } from '../data/syllabi';
import './OnboardingForm.css';

const OnboardingForm = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    interests: '',
    careerGoal: '',
    learningStyle: 'visual'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const availableCareers = getAvailableCareers();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.interests.trim() || !formData.careerGoal.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const modules = await generateModules(
        formData.interests,
        formData.careerGoal,
        formData.learningStyle
      );
      
      onComplete(modules);
    } catch (err) {
      console.error('Error generating modules:', err);
      setError('Failed to generate learning modules. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="onboarding-container">
        <div className="loading-section">
          <LoadingSpinner />
          <h2>Creating Your Personalized Learning Path</h2>
          <p>Analyzing your interests and career goals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="onboarding-container">
      <div className="onboarding-content">
        <div className="onboarding-header">
          <h1>Welcome to NovaLearn</h1>
          <p>Your AI-powered personalized learning journey starts here</p>
        </div>

        <form onSubmit={handleSubmit} className="onboarding-form">
          <div className="form-section">
            <label htmlFor="interests" className="form-label">
              What are your main interests and passions? *
            </label>
            <textarea
              id="interests"
              name="interests"
              value={formData.interests}
              onChange={handleInputChange}
              className="form-control"
              placeholder="e.g., I love building websites, solving complex problems, working with data, creating mobile apps..."
              rows="4"
              required
            />
            <small className="form-help">
              Tell us what excites you and what you'd like to learn more about
            </small>
          </div>

          <div className="form-section">
            <label htmlFor="careerGoal" className="form-label">
              What's your career goal? *
            </label>
            <select
              id="careerGoal"
              name="careerGoal"
              value={formData.careerGoal}
              onChange={handleInputChange}
              className="form-control"
              required
            >
              <option value="">Select your career goal</option>
              {availableCareers.map(career => (
                <option key={career.id} value={career.id}>
                  {career.title}
                </option>
              ))}
            </select>
            <small className="form-help">
              Choose the career path you want to pursue
            </small>
          </div>

          <div className="form-section">
            <label className="form-label">How do you prefer to learn? *</label>
            <div className="learning-style-options">
              <label className="style-option">
                <input
                  type="radio"
                  name="learningStyle"
                  value="visual"
                  checked={formData.learningStyle === 'visual'}
                  onChange={handleInputChange}
                />
                <div className="option-content">
                  <h4>Visual Learner</h4>
                  <p>I learn best through diagrams, videos, and visual examples</p>
                </div>
              </label>

              <label className="style-option">
                <input
                  type="radio"
                  name="learningStyle"
                  value="hands-on"
                  checked={formData.learningStyle === 'hands-on'}
                  onChange={handleInputChange}
                />
                <div className="option-content">
                  <h4>Hands-on Learner</h4>
                  <p>I prefer practical exercises and building real projects</p>
                </div>
              </label>

              <label className="style-option">
                <input
                  type="radio"
                  name="learningStyle"
                  value="theoretical"
                  checked={formData.learningStyle === 'theoretical'}
                  onChange={handleInputChange}
                />
                <div className="option-content">
                  <h4>Theoretical Learner</h4>
                  <p>I like understanding concepts deeply before applying them</p>
                </div>
              </label>
            </div>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button type="submit" className="submit-button">
            Create My Learning Path
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingForm; 