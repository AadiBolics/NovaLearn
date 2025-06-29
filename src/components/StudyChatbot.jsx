import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useModules } from '../context/useModules';
import { aiChatbotService } from '../utils/aiChatbotService';
import './StudyChatbot.css';

const StudyChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef(null);
  const { modules, getModuleProgress, getCurrentModule } = useModules();

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with welcome message
  const initializeChat = useCallback(() => {
    const examType = modules.length > 0 ? (modules[0].examType || 'jee') : 'jee';
    const welcomeMessage = {
      id: Date.now(),
      type: 'bot',
      message: `Hello! 👋 I'm NovaLearn, your AI study assistant for ${examType.toUpperCase()} preparation. I'm here to help you with studies, motivation, stress management, and anything else you need. How are you feeling today?`,
      suggestions: ['I need study help', 'I\'m feeling stressed', 'Need motivation', 'Just checking in'],
      mood: 'friendly',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [modules]);

  useEffect(() => {
    if (!isInitialized && isOpen) {
      initializeChat();
      setIsInitialized(true);
    }
  }, [isOpen, isInitialized, initializeChat]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Get context for AI
      const examType = modules.length > 0 ? (modules[0].examType || 'jee') : 'jee';
      const currentModule = getCurrentModule()?.name || 'General Studies';
      const progress = getModuleProgress();

      const context = {
        examType,
        currentModule,
        progress,
        modules
      };

      // Get AI response
      const aiResponse = await aiChatbotService.generateResponse(inputMessage, context);

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: aiResponse.message,
        suggestions: aiResponse.suggestions,
        mood: aiResponse.mood,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: "I'm having trouble connecting right now, but I'm still here to support you! 💙 What's on your mind?",
        suggestions: ['I need study help', 'I\'m feeling stressed', 'Need motivation'],
        mood: 'supportive',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsInitialized(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    aiChatbotService.clearHistory();
    setIsInitialized(false);
    if (isOpen) {
      initializeChat();
    }
  };

  return (
    <div className="study-chatbot">
      {/* Floating chat button */}
      <button 
        className={`chatbot-toggle ${isOpen ? 'active' : ''}`}
        onClick={toggleChat}
        aria-label="Open study assistant"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <span className="chatbot-icon">🎓</span>
              <div>
                <h3>NovaLearn Assistant</h3>
                <p>Your AI Study Companion</p>
              </div>
            </div>
            <div className="chatbot-actions">
              <button 
                className="clear-chat-btn"
                onClick={clearChat}
                title="Clear chat"
              >
                🗑️
              </button>
              <button 
                className="close-chat-btn"
                onClick={toggleChat}
                title="Close chat"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`message ${msg.type === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-content">
                  <p>{msg.message}</p>
                  {msg.suggestions && msg.type === 'bot' && (
                    <div className="message-suggestions">
                      {msg.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          className="suggestion-btn"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="message-timestamp">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot-message">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <div className="input-container">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                rows="1"
                disabled={isTyping}
              />
              <button 
                className="send-btn"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
              >
                ➤
              </button>
            </div>
            <div className="input-hint">
              Press Enter to send, Shift+Enter for new line
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyChatbot; 