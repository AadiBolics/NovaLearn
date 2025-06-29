// Study Bot Service - Supportive AI assistant for JEE/NEET students
export const studyBot = {
  // Context-aware responses based on student's current state
  handleMessage: (message, context = {}) => {
    const lowerMsg = message.toLowerCase();
    const currentModule = context.currentModule || 'general studies';
    const progress = context.progress || 0;
    const examType = context.examType || 'JEE';

    // Stress and anxiety responses
    if (lowerMsg.includes('stress') || lowerMsg.includes('anxiety') || lowerMsg.includes('overwhelm')) {
      return {
        type: 'support',
        message: "I understand this can be really overwhelming. Remember, it's completely normal to feel stressed during exam preparation. Take a deep breath - you're doing great! 💙 Would you like to take a short break or talk about what's stressing you?",
        suggestions: ['Take a 5-minute break', 'Talk about it', 'Continue studying'],
        mood: 'calm'
      };
    }

    // Motivation and encouragement
    if (lowerMsg.includes('motivation') || lowerMsg.includes('tired') || lowerMsg.includes('give up') || lowerMsg.includes('can\'t do')) {
      return {
        type: 'motivation',
        message: "Hey, I believe in you! Every expert was once a beginner, and every successful person faced challenges. You're stronger than you think! 🌟 Remember why you started this journey. What's one small thing you can do right now to move forward?",
        suggestions: ['Study for 15 minutes', 'Take a short walk', 'Review what I know'],
        mood: 'encouraging'
      };
    }

    // Study help and guidance
    if (lowerMsg.includes('help') || lowerMsg.includes('stuck') || lowerMsg.includes('difficult') || lowerMsg.includes('understand')) {
      return {
        type: 'study_help',
        message: `I'm here to help you with ${currentModule}! Let's break this down together. What specific part are you finding challenging? Sometimes the best approach is to tackle it step by step. 📚`,
        suggestions: ['Break it into smaller parts', 'Try a different approach', 'Ask for specific help'],
        mood: 'helpful'
      };
    }

    // Time management and planning
    if (lowerMsg.includes('time') || lowerMsg.includes('schedule') || lowerMsg.includes('plan') || lowerMsg.includes('organize')) {
      return {
        type: 'planning',
        message: `Great thinking! Planning is key to success. Let's organize your study time effectively. You're currently at ${progress}% progress - that's amazing! 🎯 What's your main goal for today?`,
        suggestions: ['Create a study schedule', 'Set daily goals', 'Review my progress'],
        mood: 'organized'
      };
    }

    // Break and relaxation
    if (lowerMsg.includes('break') || lowerMsg.includes('rest') || lowerMsg.includes('tired') || lowerMsg.includes('relax')) {
      return {
        type: 'break',
        message: "Absolutely! Taking breaks is essential for effective learning. Your brain needs time to process information. Try the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds. 🌿 What would you like to do during your break?",
        suggestions: ['Short walk', 'Deep breathing', 'Light stretching', 'Quick snack'],
        mood: 'relaxed'
      };
    }

    // Exam-specific advice
    if (lowerMsg.includes('exam') || lowerMsg.includes('test') || lowerMsg.includes('paper')) {
      return {
        type: 'exam_advice',
        message: `${examType} preparation is a marathon, not a sprint! Focus on understanding concepts rather than memorizing. Practice regularly, and don't forget to take care of yourself. You've got this! 📝`,
        suggestions: ['Practice questions', 'Review weak areas', 'Mock test'],
        mood: 'confident'
      };
    }

    // General greeting and support
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
      return {
        type: 'greeting',
        message: `Hello! 👋 I'm your study assistant, here to support you on your ${examType} journey. How are you feeling today? Remember, I'm here to help with anything - whether you need study guidance, motivation, or just someone to talk to!`,
        suggestions: ['I need study help', 'I\'m feeling stressed', 'I want motivation', 'Just checking in'],
        mood: 'friendly'
      };
    }

    // Default supportive response
    return {
      type: 'general',
      message: "I'm here to support you! Whether you need help with studies, motivation, or just want to talk, I'm listening. What's on your mind? 💭",
      suggestions: ['Study help', 'I\'m stressed', 'Need motivation', 'General chat'],
      mood: 'supportive'
    };
  },

  // Get contextual tips based on current module
  getContextualTip: (context = {}) => {
    const currentModule = context.currentModule || 'general';

    const tips = {
      'physics': "Physics is all about understanding concepts! Try to visualize the problems and relate them to real-world examples. 🚀",
      'chemistry': "Chemistry combines theory and practice. Make sure to understand the concepts before solving numerical problems. ⚗️",
      'mathematics': "Math is about practice! Solve different types of problems to strengthen your understanding. 📐",
      'biology': "Biology requires both memorization and understanding. Create mind maps to connect different concepts. 🧬"
    };

    return tips[currentModule.toLowerCase()] || "Keep going! Every small step counts towards your goal. 🌟";
  },

  // Get motivational quote
  getMotivationalQuote: () => {
    const quotes = [
      "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
      "The only way to do great work is to love what you do. - Steve Jobs",
      "Education is the most powerful weapon which you can use to change the world. - Nelson Mandela",
      "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
      "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
    ];
    
    return quotes[Math.floor(Math.random() * quotes.length)];
  },

  // Get study technique suggestions
  getStudyTechniques: (subject) => {
    const techniques = {
      'physics': [
        "Practice numerical problems regularly",
        "Understand the underlying concepts first",
        "Use diagrams and visual aids",
        "Solve previous year questions"
      ],
      'chemistry': [
        "Focus on understanding mechanisms",
        "Practice balancing equations",
        "Memorize important reactions",
        "Use mnemonics for formulas"
      ],
      'mathematics': [
        "Practice daily with different problem types",
        "Focus on speed and accuracy",
        "Learn shortcuts and tricks",
        "Review basic concepts regularly"
      ],
      'biology': [
        "Create mind maps for complex topics",
        "Use flashcards for memorization",
        "Practice diagram-based questions",
        "Understand the interconnections"
      ]
    };

    return techniques[subject.toLowerCase()] || [
      "Break down complex topics",
      "Practice regularly",
      "Take short breaks",
      "Review what you've learned"
    ];
  }
}; 