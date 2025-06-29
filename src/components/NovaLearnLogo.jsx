import React from 'react';
import './NovaLearnLogo.css';

const NovaLearnLogo = ({ className = '', onClick }) => {
  return (
    <div className={`nova-logo ${className}`} onClick={onClick}>
      <div className="logo-container">
        {/* Futuristic geometric elements */}
        <div className="logo-geometry">
          <div className="hexagon outer">
            <div className="hexagon inner">
              <div className="hexagon core"></div>
            </div>
          </div>
          <div className="orbit-ring">
            <div className="orbit-dot"></div>
          </div>
          <div className="orbit-ring reverse">
            <div className="orbit-dot"></div>
          </div>
        </div>
        
        {/* Text logo */}
        <div className="logo-text">
          <span className="logo-nova">Nova</span>
          <span className="logo-learn">Learn</span>
        </div>
        
        {/* Glow effects */}
        <div className="logo-glow"></div>
        <div className="logo-glow secondary"></div>
      </div>
    </div>
  );
};

export default NovaLearnLogo; 