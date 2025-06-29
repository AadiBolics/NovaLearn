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

  // Get the exam type from the first module
  const examType = modules.length > 0 ? 
    (modules[0].examType || 'jee') : 'jee';

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      try {
        const comprehensiveResources = await jeeNeetService.getTopResources(examType);
        setResources(comprehensiveResources);
        
        // Combine all resources for filtering
        const allResources = [];
        
        // Add learning platforms
        if (comprehensiveResources) {
          Object.values(comprehensiveResources).forEach(platform => {
            if (platform && typeof platform === 'object') {
              allResources.push({
                ...platform,
                source: 'learning',
                type: platform.type || 'platform'
              });
            }
          });
        }
        
        setFilteredResources(allResources);
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
    if (category === 'all') {
      setFilteredResources(resources ? Object.values(resources).map(p => ({ ...p, source: 'learning', type: p.type || 'platform' })) : []);
    } else {
      const filtered = Object.values(resources || {}).filter(platform => 
        platform.type === category.toLowerCase() || platform.name.toLowerCase().includes(category.toLowerCase())
      ).map(p => ({ ...p, source: 'learning', type: p.type || 'platform' }));
      
      setFilteredResources(filtered);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      handleCategoryFilter(selectedCategory);
      return;
    }

    const searchResults = Object.values(resources || {}).filter(platform => 
      platform.name.toLowerCase().includes(query.toLowerCase()) ||
      platform.description?.toLowerCase().includes(query.toLowerCase())
    ).map(p => ({ ...p, source: 'learning', type: p.type || 'platform' }));
    
    setFilteredResources(searchResults);
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'coaching': return '🎓';
      case 'platform': return '💻';
      case 'reference': return '📖';
      default: return '🔗';
    }
  };

  const getSourceBadge = (source) => {
    switch (source) {
      case 'learning': return { text: 'Learning Platform', color: '#28a745' };
      default: return { text: 'External', color: '#6c757d' };
    }
  };

  if (loading) {
    return (
      <div className="resources-page">
        <div className="resources-page-header">
          <div className="header-content">
            <button 
              className="back-button"
              onClick={handleBackToDashboard}
            >
              ← Back to Dashboard
            </button>
            
            <div className="header-info">
              <h1>Loading Resources...</h1>
              <p>Fetching resources for {examType.toUpperCase()}</p>
            </div>
          </div>
        </div>
        
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading comprehensive resources from top Indian education platforms...</p>
        </div>
      </div>
    );
  }

  if (!resources) {
    return (
      <div className="resources-page">
        <div className="resources-page-header">
          <div className="header-content">
            <button 
              className="back-button"
              onClick={handleBackToDashboard}
            >
              ← Back to Dashboard
            </button>
            
            <div className="header-info">
              <h1>Resources Unavailable</h1>
              <p>Unable to load resources for {examType.toUpperCase()}</p>
            </div>
          </div>
        </div>
        
        <div className="error-container">
          <h3>Error Loading Resources</h3>
          <p>There was an issue fetching resources. Please try again later.</p>
          <button 
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const allCategories = ['coaching', 'platform', 'reference'];
  const totalResources = filteredResources.length;

  return (
    <div className="resources-page">
      <div className="resources-page-header">
        <div className="header-content">
          <button 
            className="back-button"
            onClick={handleBackToDashboard}
          >
            ← Back to Dashboard
          </button>
          
          <div className="header-info">
            <h1>JEE/NEET Learning Resources</h1>
            <p>Top resources for {examType.toUpperCase()} preparation from leading Indian education platforms</p>
          </div>
        </div>
      </div>

      <div className="resources-content">
        <div className="resources-intro">
          <div className="intro-card">
            <h2>Your JEE/NEET Learning Resources</h2>
            <p>We've gathered the best resources from India's top education platforms to help you prepare for {examType.toUpperCase()}. These platforms offer comprehensive study materials, live classes, and practice tests.</p>
            
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
        </div>

        <div className="resources-filter">
          <div className="search-section">
            <input
              type="text"
              placeholder="Search platforms..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-section">
            <h3>Filter by Type</h3>
            <div className="filter-buttons">
              <button 
                className={`filter-button ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => handleCategoryFilter('all')}
              >
                All Platforms ({totalResources})
              </button>
              {allCategories.map(category => (
                <button 
                  key={category}
                  className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => handleCategoryFilter(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)} ({filteredResources.filter(r => r.type === category).length})
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="resources-grid">
          {filteredResources.map((resource, index) => (
            <div key={index} className="resource-card">
              <div className="resource-header">
                <div className="resource-icon">
                  {getResourceIcon(resource.type)}
                </div>
                <div className="resource-meta">
                  <span className="resource-type">{resource.type}</span>
                  <span 
                    className="resource-source"
                    style={{ backgroundColor: getSourceBadge(resource.source).color }}
                  >
                    {getSourceBadge(resource.source).text}
                  </span>
                </div>
              </div>
              
              <div className="resource-content">
                <h4 className="resource-title">{resource.name}</h4>
                <p className="resource-description">
                  {resource.description || `Top-rated ${resource.type} platform for ${examType.toUpperCase()} preparation`}
                </p>
                <div className="resource-details">
                  <span className="rating">⭐ {resource.rating}/5</span>
                  <span className="pricing">{resource.pricing}</span>
                </div>
                {resource.topTeachers && (
                  <div className="teachers">
                    <strong>Top Teachers:</strong> {resource.topTeachers.join(', ')}
                  </div>
                )}
              </div>
              
              <div className="resource-actions">
                <a 
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-link"
                >
                  Visit Platform →
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="no-resources">
            <h3>No resources found</h3>
            <p>Try selecting a different category, searching with different terms, or check back later for more resources.</p>
          </div>
        )}

        <div className="resources-actions">
          <div className="action-card">
            <h3>Ready to Start Learning?</h3>
            <p>Use these platforms alongside your learning roadmap for the best results</p>
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

export default Resources; 