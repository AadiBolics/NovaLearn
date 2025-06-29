# NovaLearn - AI-Powered Personalized Learning Platform

NovaLearn is an intelligent learning platform that creates personalized educational roadmaps using AI. Whether you choose a predefined career path or enter any field of interest, our AI will research current trends, scrape the web for the latest resources, and generate a comprehensive learning syllabus tailored to your goals.

## ✨ Features

### 🤖 AI-Powered Syllabus Generation
- **Dynamic Field Analysis**: Enter any field of interest and let AI create a personalized learning path
- **Web Scraping Integration**: Real-time research of current trends, technologies, and resources
- **Comprehensive Roadmaps**: 4-module progressive learning paths with detailed resources and projects
- **Current Market Insights**: Job market analysis, salary ranges, and industry trends

### 📚 Learning Management
- **Interactive Modules**: Detailed learning modules with skills, resources, and projects
- **Progress Tracking**: Visual progress indicators and completion tracking
- **Resource Library**: Curated learning resources for each module
- **Project-Based Learning**: Hands-on projects with clear deliverables

### 🎯 Personalized Experience
- **Learning Style Adaptation**: Visual, hands-on, or theoretical learning preferences
- **Interest-Based Customization**: Tailored content based on your interests and goals
- **Career Path Guidance**: Professional development and certification recommendations

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/novalearn.git
   cd novalearn
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   # Required for AI-powered features
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   
   # Optional - for enhanced web scraping
   VITE_NEWS_API_KEY=your_news_api_key_here
   VITE_GOOGLE_SEARCH_API_KEY=your_google_search_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 API Keys Setup

### Required: OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account and get your API key
3. Add it to your `.env` file as `VITE_OPENAI_API_KEY`

### Optional: News API Key
1. Visit [NewsAPI](https://newsapi.org/)
2. Sign up for a free account
3. Get your API key and add it as `VITE_NEWS_API_KEY`

### Optional: Google Search API Key
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Custom Search API
3. Create credentials and add as `VITE_GOOGLE_SEARCH_API_KEY`

## 📖 How to Use

### 1. Choose Your Learning Approach
- **Predefined Career Paths**: Select from curated career paths like Web Development, Data Science, etc.
- **Custom Field (AI-Powered)**: Enter any field of interest and let AI research and create a personalized syllabus

### 2. Complete the Onboarding
- Describe your interests and passions
- Select your learning style preference
- For custom fields, the AI will research current trends and create a comprehensive roadmap

### 3. Follow Your Learning Path
- Access your personalized dashboard with progress tracking
- View field analysis and market insights
- Explore detailed modules with resources and projects
- Track your progress through the learning journey

## 🏗️ Architecture

### Frontend
- **React 18** with Vite for fast development
- **React Router** for navigation
- **Context API** for state management
- **Bootstrap** for responsive UI components

### AI Integration
- **OpenAI GPT-4** for intelligent syllabus generation
- **Web Scraping Service** for current information gathering
- **Dynamic Content Generation** based on user input

### Data Management
- **Local Storage** for user progress and preferences
- **Context Providers** for state management
- **Modular Architecture** for easy maintenance

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React context providers
├── data/               # Static data and syllabi
├── pages/              # Main application pages
├── styles/             # Global styles and CSS
├── utils/              # Utility functions and services
│   ├── gptService.js   # OpenAI integration
│   └── webScrapingService.js  # Web scraping functionality
└── App.jsx             # Main application component
```

## 🎨 Customization

### Adding New Career Paths
Edit `src/data/syllabi.js` to add new predefined career paths with detailed roadmaps.

### Customizing AI Prompts
Modify the prompts in `src/utils/gptService.js` to adjust how the AI generates learning paths.

### Styling
Customize the appearance by modifying the CSS files in `src/styles/` and component-specific CSS files.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for providing the GPT-4 API
- Bootstrap for the UI framework
- React team for the amazing framework
- All contributors and users of NovaLearn

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Contact the development team

---

**Made with ❤️ for learners worldwide**
