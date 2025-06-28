import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ message = "Generating your personalized learning path..." }) => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingSpinner; 