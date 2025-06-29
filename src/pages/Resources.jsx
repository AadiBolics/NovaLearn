import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModules } from '../context/useModules';
import { jeeNeetService } from '../utils/jeeNeetService';
import './Resources.css';

const Resources = () => {
  const navigate = useNavigate();
  const { modules } = useModules();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [resources, setResources] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResources, setFilteredResources] = useState([]);

  // Get the exam type from the first module or default to 'jee'
  const examType = modules.length > 0 ? 
    (modules[0].examType || 'jee') : 'jee';

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      try {
        const comprehensiveResources = await jeeNeetService.getTopResources(examType);
        setResources(comprehensiveResources);
        
        // Convert resources object to array for easier handling
        const resourcesArray = comprehensiveResources ? 
          Object.entries(comprehensiveResources).map(([key, resource]) => ({
            id: key,
            ...resource
          })) : [];
        
        setFilteredResources(resourcesArray);
      } catch (error) {
        console.error('Error fetching resources:', error);
        setResources(null);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [examType]);

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (!resources) return;

    const resourcesArray = Object.entries(resources).map(([key, resource]) => ({
      id: key,
      ...resource
    }));

    if (category === 'all') {
      setFilteredResources(resourcesArray);
    } else {
      const filtered = resourcesArray.filter(resource => 
        resource.type === category.toLowerCase()
      );
      setFilteredResources(filtered);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!resources) return;

    const resourcesArray = Object.entries(resources).map(([key, resource]) => ({
      id: key,
      ...resource
    }));

    if (!query.trim()) {
      handleCategoryFilter(selectedCategory);
      return;
    }

    const searchResults = resourcesArray.filter(resource => 
      resource.name.toLowerCase().includes(query.toLowerCase()) ||
      resource.description?.toLowerCase().includes(query.toLowerCase()) ||
      resource.features?.some(feature => 
        feature.toLowerCase().includes(query.toLowerCase())
      )
    );
    
    setFilteredResources(searchResults);
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'coaching': return '🎓';
      case 'platform': return '💻';
      case 'youtube': return '📺';
      case 'reference': return '📖';
      default: return '🔗';
    }
  };

  const getCategoryColor = (type) => {
    switch (type) {
      case 'coaching': return 'rgba(40, 167, 69, 0.2)';
      case 'platform': return 'rgba(0, 123, 255, 0.2)';
      case 'youtube': return 'rgba(255, 0, 0, 0.2)';
      case 'reference': return 'rgba(255, 193, 7, 0.2)';
      default: return 'rgba(108, 117, 125, 0.2)';
    }
  };

  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="container">
          <div className="resources-header glass-card">
            <button 
              className="glass-button secondary"
              onClick={handleBackToDashboard}
            >
              ← Back to Dashboard
            </button>
            
            <div className="header-info">
              <h1>Loading Resources...</h1>
              <p>Fetching top {examType.toUpperCase()} resources from leading Indian platforms</p>
            </div>
          </div>
          
          <div className="loading-container glass-card">
            <div className="loading-spinner"></div>
            <p>Loading comprehensive resources from top Indian education platforms...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!resources) {
    return (
      <div className="page-wrapper">
        <div className="container">
          <div className="resources-header glass-card">
            <button 
              className="glass-button secondary"
              onClick={handleBackToDashboard}
            >
              ← Back to Dashboard
            </button>
            
            <div className="header-info">
              <h1>Resources Unavailable</h1>
              <p>Unable to load resources for {examType.toUpperCase()}</p>
            </div>
          </div>
          
          <div className="error-container glass-card">
            <h3>Error Loading Resources</h3>
            <p>There was an issue fetching resources. Please try again later.</p>
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

  const allCategories = ['coaching', 'platform', 'youtube', 'reference'];
  const totalResources = Object.keys(resources).length;

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="resources-header glass-card">
          <button 
            className="glass-button secondary"
            onClick={handleBackToDashboard}
          >
            ← Back to Dashboard
          </button>
          
          <div className="header-info">
            <h1>{examType.toUpperCase()} Learning Resources</h1>
            <p>Top resources from leading Indian education platforms for your exam preparation</p>
          </div>
        </div>

        <div className="resources-content">
          <div className="resources-intro glass-card">
            <h2>Your {examType.toUpperCase()} Learning Resources</h2>
            <p>We've curated the best resources from India's top education platforms to help you prepare for {examType.toUpperCase()}. These platforms offer comprehensive study materials, live classes, and practice tests.</p>
            
            <div className="resource-stats">
              <div className="stat-item">
                <div className="stat-value">{totalResources}</div>
                <div className="stat-label">Total Platforms</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{allCategories.length}</div>
                <div className="stat-label">Categories</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">100%</div>
                <div className="stat-label">Indian</div>
              </div>
            </div>
          </div>

          <div className="resources-filter glass-card">
            <div className="search-section">
              <input
                type="text"
                placeholder="Search platforms, features, or teachers..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="glass-input"
              />
            </div>
            
            <div className="filter-section">
              <h3>Filter by Type</h3>
              <div className="filter-buttons">
                <button 
                  className={`glass-button ${selectedCategory === 'all' ? 'primary' : 'secondary'}`}
                  onClick={() => handleCategoryFilter('all')}
                >
                  All Platforms ({totalResources})
                </button>
                {allCategories.map(category => {
                  const count = Object.values(resources).filter(r => r.type === category).length;
                  return (
                    <button 
                      key={category}
                      className={`glass-button ${selectedCategory === category ? 'primary' : 'secondary'}`}
                      onClick={() => handleCategoryFilter(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="resources-grid">
            {filteredResources.map((resource, index) => (
              <div 
                key={resource.id || index} 
                className="resource-card glass-card interactive"
                data-type={resource.type}
              >
                <div className="resource-header">
                  <div className="resource-icon">
                    {getResourceIcon(resource.type)}
                  </div>
                  <div className="resource-meta">
                    <span 
                      className="resource-type"
                      style={{ backgroundColor: getCategoryColor(resource.type) }}
                    >
                      {resource.type}
                    </span>
                    <span className="resource-rating">⭐ {resource.rating}/5</span>
                  </div>
                </div>
                
                <div className="resource-content">
                  <h4 className="resource-title">
                    {resource.name}
                    {resource.type === 'youtube' && resource.subjects?.includes('Physics') && (
                      <span className="featured-badge">🔥 Featured</span>
                    )}
                  </h4>
                  <p className="resource-description">
                    {resource.description || `Top-rated ${resource.type} platform for ${examType.toUpperCase()} preparation`}
                  </p>
                  
                  <div className="resource-details">
                    <div className="pricing-info">
                      <span className="pricing">{resource.pricing}</span>
                    </div>
                    <div className="subjects-info">
                      <strong>Subjects:</strong> {resource.subjects?.join(', ')}
                    </div>
                  </div>
                  
                  {resource.features && (
                    <div className="features">
                      <strong>Features:</strong>
                      <div className="feature-tags">
                        {resource.features.map((feature, idx) => (
                          <span key={idx} className="feature-tag">{feature}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {resource.topTeachers && (
                    <div className="teachers">
                      <strong>Top Teachers:</strong> 
                      <div className="teacher-list">
                        {Array.isArray(resource.topTeachers) 
                          ? resource.topTeachers.join(', ')
                          : resource.topTeachers
                        }
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="resource-actions">
                  <a 
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button primary"
                  >
                    {resource.type === 'youtube' ? 'Watch Channel →' : 'Visit Platform →'}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="no-resources glass-card">
              <h3>No resources found</h3>
              <p>Try selecting a different category, searching with different terms, or check back later for more resources.</p>
            </div>
          )}

          <div className="resources-actions">
            <div className="action-card glass-card">
              <h3>Ready to Start Learning?</h3>
              <p>Use these platforms alongside your learning roadmap for the best results</p>
              <button 
                className="glass-button primary"
                onClick={handleBackToDashboard}
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources; 