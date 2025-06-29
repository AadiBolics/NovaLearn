import OpenAI from 'openai';

// Debug: Check what Vite sees
console.log("DEBUG - VITE_OPENAI_API_KEY:", import.meta.env.VITE_OPENAI_API_KEY);
console.log("DEBUG - Type of key:", typeof import.meta.env.VITE_OPENAI_API_KEY);
console.log("DEBUG - Key length:", import.meta.env.VITE_OPENAI_API_KEY?.length);

// Initialize OpenAI client with fallback
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const openai = apiKey ? new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true // Note: In production, this should be handled server-side
}) : null;

export class AIChatbotService {
  constructor() {
    this.conversationHistory = [];
    this.maxHistoryLength = 10; // Keep last 10 messages for context
  }

  // Add message to conversation history
  addToHistory(role, content) {
    this.conversationHistory.push({ role, content });
    if (this.conversationHistory.length > this.maxHistoryLength) {
      this.conversationHistory.shift(); // Remove oldest message
    }
  }

  // Generate AI response using OpenAI GPT-4
  async generateResponse(userMessage, context = {}) {
    try {
      // Check if OpenAI client is available
      if (!openai) {
        console.warn('OpenAI API key not configured, using fallback responses');
        return this.getFallbackResponse(userMessage, context);
      }

      // Build the system prompt for JEE/NEET study assistant
      const systemPrompt = this.buildSystemPrompt(context);
      
      // Prepare messages for OpenAI
      const messages = [
        { role: 'system', content: systemPrompt },
        ...this.conversationHistory,
        { role: 'user', content: userMessage }
      ];

      // Call OpenAI API
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      });

      const aiResponse = response.choices[0].message.content;
      
      // Add to conversation history
      this.addToHistory('user', userMessage);
      this.addToHistory('assistant', aiResponse);

      return {
        message: aiResponse,
        type: this.determineResponseType(userMessage),
        suggestions: this.generateSuggestions(userMessage),
        mood: this.determineMood(aiResponse)
      };

    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      
      // Fallback to rule-based responses if API fails
      return this.getFallbackResponse(userMessage, context);
    }
  }

  // Build comprehensive system prompt for JEE/NEET students
  buildSystemPrompt(context) {
    const { currentModule, progress, examType, modules } = context;
    
    return `You are NovaLearn, a supportive AI study assistant specifically designed for JEE/NEET students in India. Your role is to provide personalized academic guidance, emotional support, and stress management.

CONTEXT:
- Exam Type: ${examType || 'JEE'}
- Current Module: ${currentModule || 'General Studies'}
- Progress: ${progress || 0}%
- Total Modules: ${modules?.length || 0}

CORE RESPONSIBILITIES:

1. ACADEMIC SUPPORT:
- Help with specific JEE/NEET topics (Physics, Chemistry, Mathematics/Biology)
- Provide step-by-step problem-solving guidance
- Suggest study techniques and strategies
- Explain complex concepts in simple terms
- Recommend practice problems and resources

2. EMOTIONAL SUPPORT:
- Recognize and address stress, anxiety, and burnout
- Provide motivation and encouragement
- Help with time management and study planning
- Offer relaxation techniques and stress relief
- Build confidence and positive mindset

3. STUDY GUIDANCE:
- Create personalized study plans
- Suggest effective learning strategies
- Help with exam preparation techniques
- Provide time management advice
- Recommend revision strategies

COMMUNICATION STYLE:
- Be warm, empathetic, and encouraging
- Use a calm and supportive tone
- Include relevant emojis for friendliness
- Keep responses concise but helpful
- Be culturally sensitive to Indian students
- Use simple, clear language

SPECIFIC GUIDELINES:
- For stress/anxiety: Offer immediate comfort and practical coping strategies
- For academic questions: Provide clear explanations with examples
- For motivation: Share encouraging messages and success stories
- For study planning: Give actionable, step-by-step advice
- Always maintain a positive, can-do attitude

Remember: You're not just a tutor, but a supportive companion on their educational journey. Be patient, understanding, and always encouraging.`;
  }

  // Determine response type based on user message and AI response
  determineResponseType(userMessage) {
    const lowerMsg = userMessage.toLowerCase();

    if (lowerMsg.includes('stress') || lowerMsg.includes('anxiety') || lowerMsg.includes('overwhelm')) {
      return 'support';
    }
    if (lowerMsg.includes('motivation') || lowerMsg.includes('tired') || lowerMsg.includes('give up')) {
      return 'motivation';
    }
    if (lowerMsg.includes('help') || lowerMsg.includes('stuck') || lowerMsg.includes('difficult')) {
      return 'study_help';
    }
    if (lowerMsg.includes('time') || lowerMsg.includes('schedule') || lowerMsg.includes('plan')) {
      return 'planning';
    }
    if (lowerMsg.includes('break') || lowerMsg.includes('rest') || lowerMsg.includes('relax')) {
      return 'break';
    }
    if (lowerMsg.includes('exam') || lowerMsg.includes('test')) {
      return 'exam_advice';
    }
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
      return 'greeting';
    }
    return 'general';
  }

  // Generate contextual suggestions based on conversation
  generateSuggestions(userMessage) {
    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.includes('stress') || lowerMsg.includes('anxiety')) {
      return ['Take a 5-minute break', 'Try deep breathing', 'Talk about what\'s stressing you'];
    }
    if (lowerMsg.includes('motivation') || lowerMsg.includes('tired')) {
      return ['Study for 15 minutes', 'Take a short walk', 'Review what you know'];
    }
    if (lowerMsg.includes('help') || lowerMsg.includes('stuck')) {
      return ['Break it into smaller parts', 'Try a different approach', 'Ask for specific help'];
    }
    if (lowerMsg.includes('time') || lowerMsg.includes('schedule')) {
      return ['Create a study schedule', 'Set daily goals', 'Review your progress'];
    }
    return ['I need study help', 'I\'m feeling stressed', 'Need motivation'];
  }

  // Determine mood of the response
  determineMood(aiResponse) {
    const lowerResponse = aiResponse.toLowerCase();
    
    if (lowerResponse.includes('calm') || lowerResponse.includes('breathe') || lowerResponse.includes('relax')) {
      return 'calm';
    }
    if (lowerResponse.includes('believe') || lowerResponse.includes('encourage') || lowerResponse.includes('motivate')) {
      return 'encouraging';
    }
    if (lowerResponse.includes('help') || lowerResponse.includes('explain') || lowerResponse.includes('guide')) {
      return 'helpful';
    }
    if (lowerResponse.includes('plan') || lowerResponse.includes('organize') || lowerResponse.includes('schedule')) {
      return 'organized';
    }
    if (lowerResponse.includes('break') || lowerResponse.includes('rest') || lowerResponse.includes('relax')) {
      return 'relaxed';
    }
    if (lowerResponse.includes('confident') || lowerResponse.includes('success') || lowerResponse.includes('achieve')) {
      return 'confident';
    }
    return 'supportive';
  }

  // Fallback responses when API is unavailable
  getFallbackResponse(userMessage, context) {
    const lowerMsg = userMessage.toLowerCase();
    const { currentModule } = context;

    if (lowerMsg.includes('stress') || lowerMsg.includes('anxiety')) {
      return {
        message: "I understand this can be really overwhelming. Remember, it's completely normal to feel stressed during exam preparation. Take a deep breath - you're doing great! 💙 Would you like to take a short break or talk about what's stressing you?",
        type: 'support',
        suggestions: ['Take a 5-minute break', 'Talk about it', 'Continue studying'],
        mood: 'calm'
      };
    }

    if (lowerMsg.includes('motivation') || lowerMsg.includes('tired')) {
      return {
        message: "Hey, I believe in you! Every expert was once a beginner, and every successful person faced challenges. You're stronger than you think! 🌟 Remember why you started this journey. What's one small thing you can do right now to move forward?",
        type: 'motivation',
        suggestions: ['Study for 15 minutes', 'Take a short walk', 'Review what I know'],
        mood: 'encouraging'
      };
    }

    if (lowerMsg.includes('help') || lowerMsg.includes('stuck')) {
      return {
        message: `I'm here to help you with ${currentModule || 'your studies'}! Let's break this down together. What specific part are you finding challenging? Sometimes the best approach is to tackle it step by step. 📚`,
        type: 'study_help',
        suggestions: ['Break it into smaller parts', 'Try a different approach', 'Ask for specific help'],
        mood: 'helpful'
      };
    }

    return {
      message: "I'm here to support you! Whether you need help with studies, motivation, or just want to talk, I'm listening. What's on your mind? 💭",
      type: 'general',
      suggestions: ['Study help', 'I\'m stressed', 'Need motivation', 'General chat'],
      mood: 'supportive'
    };
  }

  // Get contextual study tips
  async getContextualTips(context) {
    try {
      const prompt = `As a JEE/NEET study assistant, provide 3 specific, actionable study tips for a student currently studying ${context.currentModule || 'general topics'} with ${context.progress || 0}% progress. Keep each tip under 100 words and make them practical.`;
      
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 300,
        temperature: 0.7
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Error getting contextual tips:', error);
      return "Focus on understanding concepts rather than memorizing. Practice regularly with different types of problems. Take short breaks to maintain focus and retention.";
    }
  }

  // Get motivational quote
  async getMotivationalQuote() {
    try {
      const prompt = "Provide an inspiring quote specifically for JEE/NEET students in India, focusing on perseverance, hard work, and success in competitive exams. Include the author's name.";
      
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 100,
        temperature: 0.8
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Error getting motivational quote:', error);
      return "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill";
    }
  }

  // Clear conversation history
  clearHistory() {
    this.conversationHistory = [];
  }
}

// Export singleton instance
export const aiChatbotService = new AIChatbotService(); 