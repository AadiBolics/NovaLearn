import axios from 'axios';
import { getSyllabus } from '../data/syllabi';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export const generateModules = async (interests, goal, style) => {
  try {
    // Get the syllabus for the career goal
    const syllabus = getSyllabus(goal);
    
    const prompt = `You are an expert learning path designer with deep knowledge of industry standards, technologies, and career development.

User Profile:
- Interests: ${interests}
- Career Goal: ${goal} (${syllabus.title})
- Learning Style: ${style}

Based on the comprehensive syllabus for ${syllabus.title}, create 3 highly specific, actionable learning modules that will help this person achieve their goal. Each module should be:

MODULE 1 (Foundation):
- Focus on essential skills and tools needed for ${goal}
- Include specific technologies, frameworks, or methodologies from the syllabus
- Provide concrete learning resources (specific courses, books, or platforms)
- Challenge: A specific project with clear deliverables

MODULE 2 (Core Skills):
- Build on Module 1 with intermediate concepts
- Include specific industry tools, best practices, or certifications
- Focus on practical application in real-world scenarios
- Challenge: A portfolio-worthy project with specific requirements

MODULE 3 (Advanced Application):
- Advanced concepts and specialized knowledge
- Industry-specific projects or case studies
- Preparation for job applications or career advancement
- Challenge: A comprehensive project that demonstrates expertise

For each module, be extremely specific about:
- Exact technologies, tools, or frameworks to learn
- Specific learning resources (course names, book titles, platforms)
- Concrete project requirements and deliverables
- Measurable outcomes and success criteria

Use the syllabus structure as a guide but personalize based on the user's interests and learning style.

Format as JSON array with exactly 3 objects:
{
  "title": "Specific, descriptive title",
  "description": "Detailed description with specific technologies, tools, and learning resources",
  "challenge": "Specific project with clear requirements, deliverables, and success criteria"
}

Make each module build progressively on the previous one, with concrete, actionable steps.`;

    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert learning path designer with deep knowledge of industry standards, technologies, and career development. You create highly specific, actionable learning modules with concrete deliverables and measurable outcomes."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3, // Lower temperature for more focused, consistent responses
        max_tokens: 1500
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Extract the response content
    const content = response.data.choices[0].message.content;
    
    // Try to parse JSON from the response
    try {
      // Look for JSON in the response (sometimes GPT wraps it in markdown)
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      const jsonString = jsonMatch ? jsonMatch[0] : content;
      const modules = JSON.parse(jsonString);
      
      // Validate the response structure
      if (!Array.isArray(modules) || modules.length !== 3) {
        throw new Error('Invalid response format');
      }
      
      // Ensure each module has required fields and add career goal
      const validatedModules = modules.map((module, index) => ({
        id: index + 1,
        title: module.title || `Module ${index + 1}`,
        description: module.description || 'No description provided',
        challenge: module.challenge || 'Complete the module exercises',
        completed: false,
        careerGoal: goal // Store the career goal for roadmap access
      }));
      
      return validatedModules;
      
    } catch (parseError) {
      console.error('Failed to parse GPT response:', parseError);
      console.log('Raw response:', content);
      
      // Fallback to syllabus-based modules if parsing fails
      return generateSyllabusBasedModules(interests, goal, style, syllabus);
    }
    
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    
    // Return syllabus-based modules on error
    const syllabus = getSyllabus(goal);
    return generateSyllabusBasedModules(interests, goal, style, syllabus);
  }
};

// Generate modules based on syllabus data
const generateSyllabusBasedModules = (interests, goal, style, syllabus) => {
  const roadmap = syllabus.roadmap;
  
  if (!roadmap || roadmap.length === 0) {
    return generateFallbackModules(interests, goal, style);
  }

  // Create modules based on the first 3 phases of the roadmap
  const modules = [];
  
  for (let i = 0; i < Math.min(3, roadmap.length); i++) {
    const phase = roadmap[i];
    const firstTopic = phase.topics[0];
    
    modules.push({
      id: i + 1,
      title: `${phase.phase}: ${firstTopic.name}`,
      description: `Master ${firstTopic.name} and related skills. ${firstTopic.description} This phase focuses on ${phase.phase.toLowerCase()} concepts and prepares you for the next level.`,
      challenge: `Complete the following projects: ${firstTopic.projects.join(', ')}. Use the provided free resources to learn and apply your knowledge.`,
      completed: false,
      careerGoal: goal
    });
  }

  return modules;
};

// Fallback function to generate default modules if API fails
const generateFallbackModules = (interests, goal, style) => {
  return [
    {
      id: 1,
      title: "Introduction to Your Learning Path",
      description: `Start your journey toward becoming a ${goal} by understanding the fundamentals and setting up your learning environment.`,
      challenge: "Create a learning plan and set up your development environment with the tools you'll need.",
      completed: false,
      careerGoal: goal
    },
    {
      id: 2,
      title: "Core Concepts and Fundamentals",
      description: `Build a strong foundation in the key concepts related to ${interests} and ${goal}.`,
      challenge: "Complete a hands-on project that demonstrates your understanding of the core concepts.",
      completed: false,
      careerGoal: goal
    },
    {
      id: 3,
      title: "Advanced Applications and Projects",
      description: `Apply your knowledge to real-world scenarios and build a portfolio-worthy project.`,
      challenge: "Develop a comprehensive project that showcases your skills and can be added to your portfolio.",
      completed: false,
      careerGoal: goal
    }
  ];
}; 