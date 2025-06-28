# NovaLearn - AI-Powered Personalized Learning Platform

NovaLearn is a comprehensive learning platform that generates personalized learning paths based on user interests, career goals, and learning styles. It features curated syllabi, visual roadmaps, and free learning resources for various tech careers.

## 🚀 Features

### 🎯 **Personalized Learning Paths**
- AI-generated modules based on user interests and career goals
- Comprehensive syllabus database for different career paths
- Progressive learning structure from foundation to advanced

### 📊 **Visual Learning Roadmap**
- Interactive timeline showing learning phases
- Detailed topic breakdowns with skills, projects, and resources
- Progress tracking and completion status

### 📚 **Free Learning Resources Hub**
- Curated collection of free learning resources
- Filterable by resource type (courses, tutorials, documentation, books, videos)
- Direct links to high-quality, free educational content

### 🎨 **Modern UI/UX**
- Clean, modern black and white design
- Responsive layout for all devices
- Google Sans-like typography (Inter font)
- Fluid, full-screen layouts

### 🔄 **Progress Tracking**
- Real-time progress monitoring
- Module completion tracking
- Visual progress indicators

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite
- **Routing**: React Router v6
- **Styling**: CSS3 with custom design system
- **State Management**: React Context API
- **AI Integration**: OpenAI GPT-4 API
- **UI Framework**: Bootstrap 5 (minimal usage)

## 📁 Project Structure

```
NovaLearn/
├── src/
│   ├── components/
│   │   ├── OnboardingForm.jsx      # User onboarding with career selection
│   │   ├── ModuleCard.jsx          # Individual module display
│   │   ├── LoadingSpinner.jsx      # Loading states
│   │   └── LearningRoadmap.jsx     # Visual roadmap component
│   ├── pages/
│   │   ├── Dashboard.jsx           # Main dashboard with modules
│   │   ├── ModuleDetail.jsx        # Detailed module view
│   │   ├── Roadmap.jsx             # Learning roadmap page
│   │   └── Resources.jsx           # Free resources hub
│   ├── context/
│   │   └── ModuleContext.jsx       # Global state management
│   ├── data/
│   │   └── syllabi.js              # Comprehensive syllabus database
│   ├── utils/
│   │   └── gptService.js           # OpenAI API integration
│   └── styles/
│       └── global.css              # Global styles and variables
```

## 🎓 Supported Career Paths

### **Web Development**
- HTML5, CSS3, JavaScript fundamentals
- React, Node.js, Express
- Full-stack development
- Authentication, deployment, testing

### **Data Science**
- Python for data science
- Statistics and mathematics
- Machine learning fundamentals
- Deep learning with TensorFlow/PyTorch
- Natural language processing
- Data engineering

### **Mobile Development**
- iOS development (Swift, SwiftUI)
- Android development (Java, Kotlin, Jetpack Compose)
- Cross-platform development (React Native, Flutter)

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd NovaLearn
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env and add your OpenAI API key
   VITE_OPENAI_API_KEY=your_actual_openai_api_key_here
   ```
   
   **Important**: Never commit your `.env` file to version control. It's already included in `.gitignore`.

4. **Get your OpenAI API key**
   - Visit [OpenAI Platform](https://platform.openai.com/)
   - Sign up or log in
   - Go to API Keys section
   - Create a new API key
   - Copy the key and paste it in your `.env` file

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:5173`

## 📖 How to Use

### 1. **Onboarding Process**
- Fill out the onboarding form with your interests
- Select your career goal from the dropdown
- Choose your preferred learning style
- Submit to generate personalized modules

### 2. **Dashboard**
- View your generated learning modules
- Track progress with visual indicators
- Access roadmap and resources

### 3. **Learning Roadmap**
- Explore the visual learning path
- Click on phases to see detailed topics
- View skills, projects, and resources for each topic

### 4. **Resources Hub**
- Browse free learning resources
- Filter by resource type
- Access direct links to courses, tutorials, and documentation

### 5. **Module Details**
- View comprehensive module information
- Mark modules as complete
- Access specific challenges and projects

## 🎨 Design System

### Color Palette
- **Primary Black**: `#1a1a1a`
- **Secondary Black**: `#2d2d2d`
- **White**: `#ffffff`
- **Light Gray**: `#f8f9fa`
- **Border Gray**: `#e9ecef`
- **Dark Gray**: `#6c757d`
- **Accent Gray**: `#495057`

### Typography
- **Font Family**: Inter (Google Sans-like)
- **Weights**: 400, 500, 600, 700
- **Responsive scaling**: Fluid typography

## 🔧 Configuration

### Environment Variables
The app uses environment variables for configuration. Create a `.env` file in the root directory:

```bash
# Required: OpenAI API Key
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

### OpenAI API Configuration
The app uses OpenAI's GPT-4 API for generating personalized learning modules. The API key is loaded from environment variables for security.

### Syllabus Customization
Add new career paths by updating `src/data/syllabi.js`:

```javascript
export const syllabi = {
  "new-career": {
    title: "New Career Path",
    description: "Description of the career path",
    roadmap: [
      // Define learning phases and topics
    ]
  }
};
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables in Production
For production deployment, make sure to set the environment variables:

**Vercel:**
- Go to your project settings
- Add environment variable: `VITE_OPENAI_API_KEY`
- Set the value to your OpenAI API key

**Netlify:**
- Go to Site settings > Environment variables
- Add: `VITE_OPENAI_API_KEY` with your API key value

**Other platforms:**
- Set the `VITE_OPENAI_API_KEY` environment variable
- Ensure it's accessible to your build process

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Set environment variables in Vercel dashboard

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

## 🔐 Security Notes

- **Never commit API keys** to version control
- The `.env` file is included in `.gitignore`
- Use environment variables for all sensitive data
- For production, use your platform's environment variable system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Copy `.env.example` to `.env` and add your API key
4. Make your changes
5. Commit changes: `git commit -m 'Add feature'`
6. Push to branch: `git push origin feature-name`
7. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Free learning resource providers
- React and Vite communities
- Bootstrap for UI components

## 📞 Support

For support, email support@novalearn.com or create an issue in the repository.

---

**NovaLearn** - Empowering learners with AI-driven personalized education 🚀
