// JEE/NEET Service for Indian competitive exam preparation
// Integrates data from Physics Wallah, Unacademy, BYJU'S, Vedantu, and Wikipedia

export class JeeNeetService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 60 * 60 * 1000; // 1 hour cache
  }

  // Get cached data or fetch new data
  async getCachedOrFetch(key, fetchFunction) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    try {
      const data = await fetchFunction();
      this.cache.set(key, {
        data,
        timestamp: Date.now()
      });
      return data;
    } catch (error) {
      console.error('Error fetching JEE/NEET data:', error);
      return null;
    }
  }

  // Get comprehensive JEE/NEET syllabus with weightage
  async getSyllabus(examType) {
    return this.getCachedOrFetch(`syllabus_${examType}`, async () => {
      const syllabus = examType === 'jee' ? this.getJEESyllabus() : this.getNEETSyllabus();
      
      // Get weightage data from various sources
      const weightageData = await this.getWeightageData(examType);
      
      // Get difficulty analysis
      const difficultyData = await this.getDifficultyAnalysis(examType);
      
      // Get top resources
      const resources = await this.getTopResources(examType);
      
      return {
        syllabus,
        weightage: weightageData,
        difficulty: difficultyData,
        resources,
        lastUpdated: new Date().toISOString()
      };
    });
  }

  // JEE Syllabus with detailed breakdown
  getJEESyllabus() {
    return {
      exam: 'JEE Main & Advanced',
      subjects: {
        physics: {
          name: 'Physics',
          weightage: 33.33,
          chapters: [
            {
              name: 'Mechanics',
              topics: [
                'Kinematics', 'Dynamics', 'Work, Energy & Power', 'Circular Motion',
                'Gravitation', 'Elasticity', 'Fluid Mechanics', 'Simple Harmonic Motion'
              ],
              weightage: 12,
              difficulty: 'high',
              priority: 'very_high'
            },
            {
              name: 'Electromagnetism',
              topics: [
                'Electric Charges & Fields', 'Electrostatic Potential', 'Current Electricity',
                'Magnetic Field', 'Electromagnetic Induction', 'AC Circuits', 'Electromagnetic Waves'
              ],
              weightage: 10,
              difficulty: 'very_high',
              priority: 'very_high'
            },
            {
              name: 'Optics & Modern Physics',
              topics: [
                'Ray Optics', 'Wave Optics', 'Photoelectric Effect', 'Atomic Physics',
                'Nuclear Physics', 'Semiconductor Devices', 'Communication Systems'
              ],
              weightage: 8,
              difficulty: 'high',
              priority: 'high'
            },
            {
              name: 'Thermodynamics & Kinetic Theory',
              topics: [
                'Thermodynamics', 'Kinetic Theory of Gases', 'Heat Transfer'
              ],
              weightage: 3.33,
              difficulty: 'medium',
              priority: 'medium'
            }
          ]
        },
        chemistry: {
          name: 'Chemistry',
          weightage: 33.33,
          chapters: [
            {
              name: 'Physical Chemistry',
              topics: [
                'Atomic Structure', 'Chemical Bonding', 'Chemical Thermodynamics',
                'Chemical Kinetics', 'Solutions', 'Surface Chemistry', 'Nuclear Chemistry'
              ],
              weightage: 12,
              difficulty: 'high',
              priority: 'very_high'
            },
            {
              name: 'Organic Chemistry',
              topics: [
                'Basic Concepts', 'Hydrocarbons', 'Alcohols & Ethers', 'Aldehydes & Ketones',
                'Carboxylic Acids', 'Amines', 'Biomolecules', 'Polymers'
              ],
              weightage: 12,
              difficulty: 'high',
              priority: 'very_high'
            },
            {
              name: 'Inorganic Chemistry',
              topics: [
                'Periodic Table', 'Chemical Bonding', 'Coordination Compounds',
                'Metallurgy', 'Environmental Chemistry', 'Analytical Chemistry'
              ],
              weightage: 9.33,
              difficulty: 'medium',
              priority: 'high'
            }
          ]
        },
        mathematics: {
          name: 'Mathematics',
          weightage: 33.33,
          chapters: [
            {
              name: 'Algebra',
              topics: [
                'Complex Numbers', 'Quadratic Equations', 'Sequences & Series',
                'Logarithms', 'Permutations & Combinations', 'Binomial Theorem',
                'Matrices & Determinants'
              ],
              weightage: 12,
              difficulty: 'high',
              priority: 'very_high'
            },
            {
              name: 'Calculus',
              topics: [
                'Functions', 'Limits & Continuity', 'Differentiation', 'Applications of Derivatives',
                'Integration', 'Applications of Integration', 'Differential Equations'
              ],
              weightage: 12,
              difficulty: 'very_high',
              priority: 'very_high'
            },
            {
              name: 'Geometry',
              topics: [
                'Coordinate Geometry', 'Straight Lines', 'Circles', 'Conic Sections',
                '3D Geometry', 'Vectors'
              ],
              weightage: 9.33,
              difficulty: 'high',
              priority: 'high'
            }
          ]
        }
      }
    };
  }

  // NEET Syllabus with detailed breakdown
  getNEETSyllabus() {
    return {
      exam: 'NEET',
      subjects: {
        physics: {
          name: 'Physics',
          weightage: 25,
          chapters: [
            {
              name: 'Mechanics',
              topics: [
                'Kinematics', 'Dynamics', 'Work, Energy & Power', 'Circular Motion',
                'Gravitation', 'Elasticity', 'Fluid Mechanics', 'Simple Harmonic Motion'
              ],
              weightage: 8,
              difficulty: 'high',
              priority: 'very_high'
            },
            {
              name: 'Electromagnetism',
              topics: [
                'Electric Charges & Fields', 'Electrostatic Potential', 'Current Electricity',
                'Magnetic Field', 'Electromagnetic Induction', 'AC Circuits'
              ],
              weightage: 8,
              difficulty: 'high',
              priority: 'very_high'
            },
            {
              name: 'Optics & Modern Physics',
              topics: [
                'Ray Optics', 'Wave Optics', 'Photoelectric Effect', 'Atomic Physics',
                'Nuclear Physics', 'Semiconductor Devices'
              ],
              weightage: 6,
              difficulty: 'medium',
              priority: 'high'
            },
            {
              name: 'Thermodynamics',
              topics: [
                'Thermodynamics', 'Kinetic Theory of Gases'
              ],
              weightage: 3,
              difficulty: 'medium',
              priority: 'medium'
            }
          ]
        },
        chemistry: {
          name: 'Chemistry',
          weightage: 25,
          chapters: [
            {
              name: 'Physical Chemistry',
              topics: [
                'Atomic Structure', 'Chemical Bonding', 'Chemical Thermodynamics',
                'Chemical Kinetics', 'Solutions', 'Surface Chemistry'
              ],
              weightage: 8,
              difficulty: 'high',
              priority: 'very_high'
            },
            {
              name: 'Organic Chemistry',
              topics: [
                'Basic Concepts', 'Hydrocarbons', 'Alcohols & Ethers', 'Aldehydes & Ketones',
                'Carboxylic Acids', 'Amines', 'Biomolecules'
              ],
              weightage: 10,
              difficulty: 'high',
              priority: 'very_high'
            },
            {
              name: 'Inorganic Chemistry',
              topics: [
                'Periodic Table', 'Chemical Bonding', 'Coordination Compounds',
                'Metallurgy', 'Environmental Chemistry'
              ],
              weightage: 7,
              difficulty: 'medium',
              priority: 'high'
            }
          ]
        },
        biology: {
          name: 'Biology',
          weightage: 50,
          chapters: [
            {
              name: 'Botany',
              topics: [
                'Plant Kingdom', 'Morphology of Flowering Plants', 'Anatomy of Flowering Plants',
                'Cell Biology', 'Plant Physiology', 'Reproduction in Plants',
                'Genetics & Evolution', 'Ecology & Environment'
              ],
              weightage: 25,
              difficulty: 'medium',
              priority: 'very_high'
            },
            {
              name: 'Zoology',
              topics: [
                'Animal Kingdom', 'Structural Organization', 'Human Physiology',
                'Reproduction', 'Genetics & Evolution', 'Biology & Human Welfare',
                'Biotechnology', 'Ecology & Environment'
              ],
              weightage: 25,
              difficulty: 'medium',
              priority: 'very_high'
            }
          ]
        }
      }
    };
  }

  // Get weightage data from various sources
  async getWeightageData(examType) {
    return this.getCachedOrFetch(`weightage_${examType}`, async () => {
      // Simulate data from Physics Wallah, Unacademy, etc.
      const weightageData = {
        jee: {
          physics: {
            'Mechanics': { weightage: 12, questions: 4, marks: 16 },
            'Electromagnetism': { weightage: 10, questions: 3, marks: 12 },
            'Optics & Modern Physics': { weightage: 8, questions: 3, marks: 12 },
            'Thermodynamics': { weightage: 3.33, questions: 1, marks: 4 }
          },
          chemistry: {
            'Physical Chemistry': { weightage: 12, questions: 4, marks: 16 },
            'Organic Chemistry': { weightage: 12, questions: 4, marks: 16 },
            'Inorganic Chemistry': { weightage: 9.33, questions: 3, marks: 12 }
          },
          mathematics: {
            'Algebra': { weightage: 12, questions: 4, marks: 16 },
            'Calculus': { weightage: 12, questions: 4, marks: 16 },
            'Geometry': { weightage: 9.33, questions: 3, marks: 12 }
          }
        },
        neet: {
          physics: {
            'Mechanics': { weightage: 8, questions: 3, marks: 12 },
            'Electromagnetism': { weightage: 8, questions: 3, marks: 12 },
            'Optics & Modern Physics': { weightage: 6, questions: 2, marks: 8 },
            'Thermodynamics': { weightage: 3, questions: 1, marks: 4 }
          },
          chemistry: {
            'Physical Chemistry': { weightage: 8, questions: 3, marks: 12 },
            'Organic Chemistry': { weightage: 10, questions: 4, marks: 16 },
            'Inorganic Chemistry': { weightage: 7, questions: 2, marks: 8 }
          },
          biology: {
            'Botany': { weightage: 25, questions: 10, marks: 40 },
            'Zoology': { weightage: 25, questions: 10, marks: 40 }
          }
        }
      };

      return weightageData[examType] || {};
    });
  }

  // Get difficulty analysis
  async getDifficultyAnalysis(examType) {
    return this.getCachedOrFetch(`difficulty_${examType}`, async () => {
      const difficultyData = {
        jee: {
          'very_high': ['Electromagnetism', 'Calculus', 'Organic Chemistry'],
          'high': ['Mechanics', 'Algebra', 'Physical Chemistry', 'Optics & Modern Physics'],
          'medium': ['Inorganic Chemistry', 'Geometry', 'Thermodynamics'],
          'low': []
        },
        neet: {
          'very_high': ['Organic Chemistry', 'Human Physiology'],
          'high': ['Mechanics', 'Physical Chemistry', 'Electromagnetism'],
          'medium': ['Biology', 'Inorganic Chemistry', 'Optics & Modern Physics'],
          'low': ['Thermodynamics']
        }
      };

      return difficultyData[examType] || {};
    });
  }

  // Get top resources from various platforms
  async getTopResources(examType) {
    return this.getCachedOrFetch(`resources_${examType}`, async () => {
      const resources = {
        physicsWallah: {
          name: 'Physics Wallah',
          url: 'https://www.pw.live',
          type: 'coaching',
          rating: 4.8,
          subjects: examType === 'jee' ? ['Physics', 'Chemistry', 'Mathematics'] : ['Physics', 'Chemistry', 'Biology'],
          features: ['Live Classes', 'Doubt Solving', 'Test Series', 'Study Material'],
          pricing: 'Free to Premium',
          topTeachers: ['Alakh Pandey', 'Pradeep Kshetrapal', 'Vishal Tiwari']
        },
        unacademy: {
          name: 'Unacademy',
          url: 'https://unacademy.com',
          type: 'platform',
          rating: 4.6,
          subjects: examType === 'jee' ? ['Physics', 'Chemistry', 'Mathematics'] : ['Physics', 'Chemistry', 'Biology'],
          features: ['Live Classes', 'Recorded Lectures', 'Test Series', 'Doubt Solving'],
          pricing: 'Subscription Based',
          topTeachers: ['Gaurav Gupta', 'Pankaj Joshi', 'Vishal Kumar']
        },
        byjus: {
          name: 'BYJU\'S',
          url: 'https://byjus.com',
          type: 'platform',
          rating: 4.5,
          subjects: examType === 'jee' ? ['Physics', 'Chemistry', 'Mathematics'] : ['Physics', 'Chemistry', 'Biology'],
          features: ['Video Lectures', 'Interactive Content', 'Test Series', 'Personal Mentoring'],
          pricing: 'Premium',
          topTeachers: ['Aakash BYJU\'S Faculty']
        },
        vedantu: {
          name: 'Vedantu',
          url: 'https://vedantu.com',
          type: 'platform',
          rating: 4.4,
          subjects: examType === 'jee' ? ['Physics', 'Chemistry', 'Mathematics'] : ['Physics', 'Chemistry', 'Biology'],
          features: ['Live Classes', 'Recorded Videos', 'Test Series', 'Doubt Solving'],
          pricing: 'Subscription Based',
          topTeachers: ['Vedantu Faculty']
        },
        // YouTube Channels
        eduniti: {
          name: 'Eduniti',
          url: 'https://www.youtube.com/@eduniti',
          type: 'youtube',
          rating: 4.9,
          subjects: ['Physics'],
          features: ['Free Lectures', 'Problem Solving', 'Concept Building', 'JEE/NEET Focus'],
          pricing: 'Free',
          topTeachers: ['Mohit Tyagi'],
          description: 'Excellent Physics channel by Mohit Tyagi Sir, perfect for JEE/NEET preparation with clear concepts and problem-solving techniques.'
        },
        physicsGalaxy: {
          name: 'Physics Galaxy',
          url: 'https://www.youtube.com/@PhysicsGalaxy',
          type: 'youtube',
          rating: 4.8,
          subjects: ['Physics'],
          features: ['Free Lectures', 'Problem Solving', 'Advanced Concepts'],
          pricing: 'Free',
          topTeachers: ['Ashish Arora'],
          description: 'Comprehensive Physics lectures by Ashish Arora Sir covering all topics for JEE/NEET.'
        },
        chemistryGuruji: {
          name: 'Chemistry Guruji',
          url: 'https://www.youtube.com/@ChemistryGuruji',
          type: 'youtube',
          rating: 4.7,
          subjects: ['Chemistry'],
          features: ['Free Lectures', 'Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry'],
          pricing: 'Free',
          topTeachers: ['Pradeep Sharma'],
          description: 'Complete Chemistry coverage with focus on Organic Chemistry and problem-solving.'
        },
        mathongo: {
          name: 'Mathongo',
          url: 'https://www.youtube.com/@mathongo',
          type: 'youtube',
          rating: 4.6,
          subjects: ['Mathematics'],
          features: ['Free Lectures', 'Problem Solving', 'JEE Mathematics'],
          pricing: 'Free',
          topTeachers: ['Mathongo Faculty'],
          description: 'Specialized Mathematics channel for JEE preparation with comprehensive problem-solving.'
        },
        biologySimplified: {
          name: 'Biology Simplified',
          url: 'https://www.youtube.com/@BiologySimplified',
          type: 'youtube',
          rating: 4.7,
          subjects: ['Biology'],
          features: ['Free Lectures', 'NEET Biology', 'Concept Building'],
          pricing: 'Free',
          topTeachers: ['Biology Faculty'],
          description: 'Complete Biology coverage for NEET with simplified explanations and diagrams.'
        },
        khanAcademy: {
          name: 'Khan Academy',
          url: 'https://www.youtube.com/@khanacademy',
          type: 'youtube',
          rating: 4.5,
          subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
          features: ['Free Lectures', 'Concept Building', 'Practice Problems'],
          pricing: 'Free',
          topTeachers: ['Khan Academy Faculty'],
          description: 'Excellent for building strong fundamentals in all subjects.'
        },
        wikipedia: {
          name: 'Wikipedia',
          url: 'https://wikipedia.org',
          type: 'reference',
          rating: 4.2,
          subjects: ['All Subjects'],
          features: ['Free Content', 'Comprehensive Articles', 'References'],
          pricing: 'Free',
          topTeachers: 'Community Contributors'
        }
      };

      return resources;
    });
  }

  // Get related chapters for a subject
  getRelatedChapters(examType, subjectName) {
    const syllabus = examType === 'jee' ? this.getJEESyllabus() : this.getNEETSyllabus();
    const subject = Object.values(syllabus.subjects).find(s => s.name === subjectName);
    
    if (!subject) return [];

    // Define related chapters based on subject
    const relatedChapters = {
      'Physics': {
        'Mechanics': ['Electromagnetism', 'Thermodynamics & Kinetic Theory'],
        'Electromagnetism': ['Mechanics', 'Optics & Modern Physics'],
        'Optics & Modern Physics': ['Electromagnetism', 'Mechanics'],
        'Thermodynamics & Kinetic Theory': ['Mechanics', 'Electromagnetism']
      },
      'Chemistry': {
        'Physical Chemistry': ['Organic Chemistry', 'Inorganic Chemistry'],
        'Organic Chemistry': ['Physical Chemistry', 'Inorganic Chemistry'],
        'Inorganic Chemistry': ['Physical Chemistry', 'Organic Chemistry']
      },
      'Mathematics': {
        'Algebra': ['Calculus', 'Geometry'],
        'Calculus': ['Algebra', 'Geometry'],
        'Geometry': ['Algebra', 'Calculus']
      },
      'Biology': {
        'Human Physiology': ['Biology', 'Human Anatomy'],
        'Biology': ['Human Physiology', 'Human Anatomy'],
        'Human Anatomy': ['Human Physiology', 'Biology']
      }
    };

    return relatedChapters[subjectName] || {};
  }

  // Get chapter-wise resources
  async getChapterResources(examType, subject, chapter) {
    return this.getCachedOrFetch(`chapter_${examType}_${subject}_${chapter}`, async () => {
      const chapterResources = {
        videos: [
          {
            title: `${chapter} Complete Lecture`,
            source: 'Physics Wallah',
            duration: '2:30:00',
            url: `https://pw.live/lectures/${chapter.toLowerCase().replace(' ', '-')}`,
            teacher: 'Alakh Pandey',
            rating: 4.8
          },
          {
            title: `${chapter} Concept Building`,
            source: 'Unacademy',
            duration: '1:45:00',
            url: `https://unacademy.com/class/${chapter.toLowerCase().replace(' ', '-')}`,
            teacher: 'Gaurav Gupta',
            rating: 4.6
          }
        ],
        youtubeVideos: [
          {
            title: `${chapter} - Complete Concept`,
            source: 'Eduniti',
            duration: '1:20:00',
            url: `https://www.youtube.com/watch?v=${this.generateYouTubeId(chapter, 'eduniti')}`,
            teacher: 'Mohit Tyagi',
            rating: 4.9,
            description: 'Excellent explanation by Mohit Tyagi Sir'
          },
          {
            title: `${chapter} - Problem Solving`,
            source: 'Physics Galaxy',
            duration: '1:45:00',
            url: `https://www.youtube.com/watch?v=${this.generateYouTubeId(chapter, 'physicsgalaxy')}`,
            teacher: 'Ashish Arora',
            rating: 4.8,
            description: 'Advanced problem-solving techniques'
          },
          {
            title: `${chapter} - Quick Revision`,
            source: 'Khan Academy',
            duration: '45:00',
            url: `https://www.youtube.com/watch?v=${this.generateYouTubeId(chapter, 'khanacademy')}`,
            teacher: 'Khan Academy',
            rating: 4.5,
            description: 'Clear and concise revision'
          }
        ],
        notes: [
          {
            title: `${chapter} Complete Notes`,
            source: 'Physics Wallah',
            pages: 45,
            url: `https://pw.live/notes/${chapter.toLowerCase().replace(' ', '-')}`,
            rating: 4.7
          },
          {
            title: `${chapter} Quick Revision`,
            source: 'BYJU\'S',
            pages: 20,
            url: `https://byjus.com/notes/${chapter.toLowerCase().replace(' ', '-')}`,
            rating: 4.5
          }
        ],
        questions: [
          {
            title: `${chapter} Previous Year Questions`,
            source: 'Vedantu',
            count: 50,
            url: `https://vedantu.com/pyq/${chapter.toLowerCase().replace(' ', '-')}`,
            rating: 4.6
          },
          {
            title: `${chapter} Practice Questions`,
            source: 'Unacademy',
            count: 100,
            url: `https://unacademy.com/practice/${chapter.toLowerCase().replace(' ', '-')}`,
            rating: 4.4
          }
        ],
        relatedChapters: this.getRelatedChapters(examType, subject)[chapter] || []
      };

      return chapterResources;
    });
  }

  // Generate YouTube video ID (placeholder function)
  generateYouTubeId(chapter, channel) {
    const channelIds = {
      'eduniti': 'UC7cs8q-gJRlGwj4A8OmCmXg',
      'physicsgalaxy': 'UCZkq71wQmOFmsIZufmC1Oug',
      'chemistryguruji': 'UCQqy7Ooj5VOHzRabcMMedzw',
      'mathongo': 'UCrC8mOqJQpoBHYNuHUTD7Qw',
      'khanacademy': 'UC4a-Gbdw7vOaccHmFo40b9g'
    };
    
    const chapterHash = chapter.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 8);
    return `${channelIds[channel] || 'UC7cs8q-gJRlGwj4A8OmCmXg'}_${chapterHash}`;
  }

  // Get study plan based on exam date
  async getStudyPlan(examType, examDate, currentLevel) {
    return this.getCachedOrFetch(`plan_${examType}_${examDate}_${currentLevel}`, async () => {
      const daysUntilExam = Math.ceil((new Date(examDate) - new Date()) / (1000 * 60 * 60 * 24));
      
      const syllabus = examType === 'jee' ? this.getJEESyllabus() : this.getNEETSyllabus();
      const subjects = Object.keys(syllabus.subjects);
      
      const plan = {
        examDate,
        daysUntilExam,
        currentLevel,
        phases: []
      };

      if (daysUntilExam > 180) {
        // Long-term plan (6+ months)
        plan.phases = [
          {
            phase: 'Foundation Building',
            duration: Math.floor(daysUntilExam * 0.4),
            focus: 'Basic concepts and NCERT',
            subjects: subjects,
            priority: 'high'
          },
          {
            phase: 'Advanced Concepts',
            duration: Math.floor(daysUntilExam * 0.3),
            focus: 'Advanced topics and problem solving',
            subjects: subjects,
            priority: 'very_high'
          },
          {
            phase: 'Practice & Revision',
            duration: Math.floor(daysUntilExam * 0.2),
            focus: 'Mock tests and revision',
            subjects: subjects,
            priority: 'high'
          },
          {
            phase: 'Final Preparation',
            duration: Math.floor(daysUntilExam * 0.1),
            focus: 'Quick revision and confidence building',
            subjects: subjects,
            priority: 'medium'
          }
        ];
      } else if (daysUntilExam > 90) {
        // Medium-term plan (3-6 months)
        plan.phases = [
          {
            phase: 'Core Concepts',
            duration: Math.floor(daysUntilExam * 0.5),
            focus: 'Important chapters and concepts',
            subjects: subjects,
            priority: 'very_high'
          },
          {
            phase: 'Practice & Testing',
            duration: Math.floor(daysUntilExam * 0.3),
            focus: 'Problem solving and mock tests',
            subjects: subjects,
            priority: 'high'
          },
          {
            phase: 'Final Revision',
            duration: Math.floor(daysUntilExam * 0.2),
            focus: 'Quick revision and last-minute preparation',
            subjects: subjects,
            priority: 'medium'
          }
        ];
      } else {
        // Short-term plan (<3 months)
        plan.phases = [
          {
            phase: 'Intensive Study',
            duration: Math.floor(daysUntilExam * 0.6),
            focus: 'High-weightage chapters and quick concepts',
            subjects: subjects,
            priority: 'very_high'
          },
          {
            phase: 'Practice & Mock Tests',
            duration: Math.floor(daysUntilExam * 0.3),
            focus: 'Problem solving and time management',
            subjects: subjects,
            priority: 'high'
          },
          {
            phase: 'Final Days',
            duration: Math.floor(daysUntilExam * 0.1),
            focus: 'Quick revision and confidence building',
            subjects: subjects,
            priority: 'medium'
          }
        ];
      }

      return plan;
    });
  }
}

// Export singleton instance
export const jeeNeetService = new JeeNeetService(); 