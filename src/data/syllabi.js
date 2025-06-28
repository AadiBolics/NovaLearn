// Comprehensive syllabus database with learning paths for different careers
export const syllabi = {
  "web developer": {
    title: "Web Development",
    description: "Full-stack web development from beginner to professional",
    roadmap: [
      {
        phase: "Foundation",
        duration: "4-6 weeks",
        topics: [
          {
            name: "HTML5 Fundamentals",
            description: "Structure, semantics, forms, and accessibility",
            resources: [
              { name: "MDN HTML Basics", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML", type: "documentation" },
              { name: "freeCodeCamp HTML", url: "https://www.freecodecamp.org/learn/responsive-web-design/", type: "course" },
              { name: "HTML5 Semantic Elements", url: "https://www.w3schools.com/html/html5_semantic_elements.asp", type: "tutorial" }
            ],
            projects: ["Personal portfolio page", "Restaurant menu website"],
            skills: ["HTML structure", "Semantic markup", "Forms", "Accessibility"]
          },
          {
            name: "CSS3 & Layout",
            description: "Styling, Flexbox, Grid, and responsive design",
            resources: [
              { name: "CSS-Tricks Flexbox Guide", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", type: "guide" },
              { name: "Grid Garden", url: "https://cssgridgarden.com/", type: "interactive" },
              { name: "Responsive Design Patterns", url: "https://developers.google.com/web/fundamentals/design-and-ux/responsive", type: "documentation" }
            ],
            projects: ["Responsive landing page", "CSS art gallery"],
            skills: ["CSS styling", "Flexbox", "CSS Grid", "Responsive design"]
          }
        ]
      },
      {
        phase: "JavaScript & Interactivity",
        duration: "6-8 weeks",
        topics: [
          {
            name: "JavaScript Fundamentals",
            description: "ES6+, DOM manipulation, async programming",
            resources: [
              { name: "Eloquent JavaScript", url: "https://eloquentjavascript.net/", type: "book" },
              { name: "JavaScript.info", url: "https://javascript.info/", type: "tutorial" },
              { name: "You Don't Know JS", url: "https://github.com/getify/You-Dont-Know-JS", type: "book" }
            ],
            projects: ["Todo app", "Weather dashboard", "Calculator"],
            skills: ["ES6+ syntax", "DOM manipulation", "Async/await", "Event handling"]
          },
          {
            name: "React Fundamentals",
            description: "Components, hooks, state management",
            resources: [
              { name: "React Official Tutorial", url: "https://react.dev/learn", type: "tutorial" },
              { name: "React Hooks Guide", url: "https://react.dev/reference/react", type: "documentation" },
              { name: "React Patterns", url: "https://reactpatterns.com/", type: "guide" }
            ],
            projects: ["E-commerce product page", "Social media feed", "Task management app"],
            skills: ["React components", "Hooks", "State management", "Props"]
          }
        ]
      },
      {
        phase: "Backend & Full-Stack",
        duration: "8-10 weeks",
        topics: [
          {
            name: "Node.js & Express",
            description: "Server-side JavaScript, APIs, databases",
            resources: [
              { name: "Node.js Official Docs", url: "https://nodejs.org/en/docs/", type: "documentation" },
              { name: "Express.js Guide", url: "https://expressjs.com/en/guide/routing.html", type: "guide" },
              { name: "MongoDB University", url: "https://university.mongodb.com/", type: "course" }
            ],
            projects: ["REST API", "Blog platform", "E-commerce backend"],
            skills: ["Node.js", "Express", "REST APIs", "Database design"]
          },
          {
            name: "Advanced Concepts",
            description: "Authentication, deployment, testing",
            resources: [
              { name: "JWT Authentication", url: "https://jwt.io/introduction", type: "guide" },
              { name: "Heroku Deployment", url: "https://devcenter.heroku.com/categories/nodejs-support", type: "tutorial" },
              { name: "Jest Testing", url: "https://jestjs.io/docs/getting-started", type: "documentation" }
            ],
            projects: ["Full-stack social app", "E-commerce platform", "Portfolio with blog"],
            skills: ["Authentication", "Deployment", "Testing", "Security"]
          }
        ]
      }
    ]
  },
  
  "data scientist": {
    title: "Data Science",
    description: "Data analysis, machine learning, and statistical modeling",
    roadmap: [
      {
        phase: "Foundation",
        duration: "6-8 weeks",
        topics: [
          {
            name: "Python for Data Science",
            description: "Python programming, pandas, numpy",
            resources: [
              { name: "Python for Everybody", url: "https://www.py4e.com/", type: "course" },
              { name: "Pandas Documentation", url: "https://pandas.pydata.org/docs/", type: "documentation" },
              { name: "NumPy Tutorial", url: "https://numpy.org/doc/stable/user/quickstart.html", type: "tutorial" }
            ],
            projects: ["Data cleaning script", "Exploratory data analysis", "Data visualization dashboard"],
            skills: ["Python", "Pandas", "NumPy", "Data manipulation"]
          },
          {
            name: "Statistics & Mathematics",
            description: "Probability, statistics, linear algebra",
            resources: [
              { name: "Khan Academy Statistics", url: "https://www.khanacademy.org/math/statistics-probability", type: "course" },
              { name: "3Blue1Brown Linear Algebra", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", type: "video" },
              { name: "Statistics in Python", url: "https://docs.scipy.org/doc/scipy/reference/stats.html", type: "documentation" }
            ],
            projects: ["Statistical analysis report", "Hypothesis testing", "Correlation analysis"],
            skills: ["Statistics", "Probability", "Linear algebra", "Hypothesis testing"]
          }
        ]
      },
      {
        phase: "Machine Learning",
        duration: "8-10 weeks",
        topics: [
          {
            name: "Machine Learning Fundamentals",
            description: "Supervised learning, classification, regression",
            resources: [
              { name: "Coursera ML Course", url: "https://www.coursera.org/learn/machine-learning", type: "course" },
              { name: "Scikit-learn Tutorial", url: "https://scikit-learn.org/stable/tutorial/", type: "tutorial" },
              { name: "Hands-On ML Book", url: "https://github.com/ageron/handson-ml2", type: "book" }
            ],
            projects: ["Classification model", "Regression analysis", "Model evaluation"],
            skills: ["Supervised learning", "Classification", "Regression", "Model evaluation"]
          },
          {
            name: "Deep Learning",
            description: "Neural networks, TensorFlow, PyTorch",
            resources: [
              { name: "TensorFlow Tutorials", url: "https://www.tensorflow.org/tutorials", type: "tutorial" },
              { name: "PyTorch Tutorials", url: "https://pytorch.org/tutorials/", type: "tutorial" },
              { name: "Deep Learning Book", url: "https://www.deeplearningbook.org/", type: "book" }
            ],
            projects: ["Image classification", "Text generation", "Neural network from scratch"],
            skills: ["Neural networks", "Deep learning", "TensorFlow", "PyTorch"]
          }
        ]
      },
      {
        phase: "Advanced Applications",
        duration: "6-8 weeks",
        topics: [
          {
            name: "Natural Language Processing",
            description: "Text analysis, sentiment analysis, language models",
            resources: [
              { name: "NLTK Tutorial", url: "https://www.nltk.org/book/", type: "tutorial" },
              { name: "Hugging Face Course", url: "https://huggingface.co/course", type: "course" },
              { name: "SpaCy Tutorial", url: "https://spacy.io/usage", type: "tutorial" }
            ],
            projects: ["Sentiment analysis", "Text classification", "Chatbot"],
            skills: ["NLP", "Text processing", "Language models", "Sentiment analysis"]
          },
          {
            name: "Data Engineering",
            description: "Big data, data pipelines, cloud platforms",
            resources: [
              { name: "Apache Spark Guide", url: "https://spark.apache.org/docs/latest/", type: "documentation" },
              { name: "AWS Data Analytics", url: "https://aws.amazon.com/data-analytics/", type: "tutorial" },
              { name: "Data Pipeline Design", url: "https://www.databricks.com/glossary/data-pipeline", type: "guide" }
            ],
            projects: ["ETL pipeline", "Data warehouse", "Real-time analytics"],
            skills: ["Big data", "Data pipelines", "Cloud platforms", "ETL"]
          }
        ]
      }
    ]
  },

  "mobile developer": {
    title: "Mobile Development",
    description: "iOS and Android app development",
    roadmap: [
      {
        phase: "Foundation",
        duration: "4-6 weeks",
        topics: [
          {
            name: "Programming Fundamentals",
            description: "Swift/Java basics, object-oriented programming",
            resources: [
              { name: "Swift Documentation", url: "https://docs.swift.org/swift-book/", type: "documentation" },
              { name: "Java Tutorial", url: "https://docs.oracle.com/javase/tutorial/", type: "tutorial" },
              { name: "Kotlin Guide", url: "https://kotlinlang.org/docs/home.html", type: "documentation" }
            ],
            projects: ["Simple calculator app", "Todo list", "Weather app"],
            skills: ["Swift/Java/Kotlin", "OOP", "Basic UI", "App lifecycle"]
          }
        ]
      },
      {
        phase: "Platform Development",
        duration: "8-10 weeks",
        topics: [
          {
            name: "iOS Development",
            description: "UIKit, SwiftUI, iOS frameworks",
            resources: [
              { name: "Apple Developer Docs", url: "https://developer.apple.com/documentation/", type: "documentation" },
              { name: "Hacking with Swift", url: "https://www.hackingwithswift.com/", type: "tutorial" },
              { name: "SwiftUI Tutorial", url: "https://developer.apple.com/tutorials/swiftui", type: "tutorial" }
            ],
            projects: ["Social media app", "E-commerce app", "Fitness tracker"],
            skills: ["UIKit", "SwiftUI", "Core Data", "iOS deployment"]
          },
          {
            name: "Android Development",
            description: "Android SDK, Jetpack Compose, Material Design",
            resources: [
              { name: "Android Developer Guide", url: "https://developer.android.com/guide", type: "guide" },
              { name: "Jetpack Compose Tutorial", url: "https://developer.android.com/jetpack/compose/tutorial", type: "tutorial" },
              { name: "Material Design", url: "https://material.io/design", type: "guide" }
            ],
            projects: ["News app", "Music player", "Task manager"],
            skills: ["Android SDK", "Jetpack Compose", "Room database", "Android deployment"]
          }
        ]
      },
      {
        phase: "Advanced Features",
        duration: "6-8 weeks",
        topics: [
          {
            name: "Cross-Platform Development",
            description: "React Native, Flutter, Xamarin",
            resources: [
              { name: "React Native Docs", url: "https://reactnative.dev/docs/getting-started", type: "documentation" },
              { name: "Flutter Tutorial", url: "https://flutter.dev/docs/get-started/tutorial", type: "tutorial" },
              { name: "Expo Guide", url: "https://docs.expo.dev/", type: "guide" }
            ],
            projects: ["Cross-platform social app", "E-commerce platform", "Fitness app"],
            skills: ["React Native", "Flutter", "Cross-platform", "App store deployment"]
          }
        ]
      }
    ]
  }
};

// Helper function to get syllabus by career goal
export const getSyllabus = (careerGoal) => {
  const normalizedGoal = careerGoal.toLowerCase().trim();
  
  // Map common variations to our syllabus keys
  const goalMapping = {
    'web developer': 'web developer',
    'frontend developer': 'web developer',
    'backend developer': 'web developer',
    'full stack developer': 'web developer',
    'software developer': 'web developer',
    'data scientist': 'data scientist',
    'data analyst': 'data scientist',
    'machine learning engineer': 'data scientist',
    'mobile developer': 'mobile developer',
    'ios developer': 'mobile developer',
    'android developer': 'mobile developer',
    'app developer': 'mobile developer'
  };
  
  const mappedGoal = goalMapping[normalizedGoal] || normalizedGoal;
  return syllabi[mappedGoal] || syllabi['web developer']; // Default fallback
};

// Get all available career paths
export const getAvailableCareers = () => {
  return Object.keys(syllabi).map(key => ({
    id: key,
    title: syllabi[key].title,
    description: syllabi[key].description
  }));
}; 