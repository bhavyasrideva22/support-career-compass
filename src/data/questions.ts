import { Question } from '@/types/assessment';

export const assessmentQuestions: Question[] = [
  // Psychometric Section - Interest in Support Operations
  {
    id: 'psych_1',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest',
    question: 'I enjoy organizing and coordinating workflows between different teams.',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    }
  },
  {
    id: 'psych_2',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest',
    question: 'I find satisfaction in helping teams operate more efficiently.',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    }
  },
  {
    id: 'psych_3',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'personality',
    question: 'I am naturally detail-oriented and rarely miss important information.',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    }
  },
  {
    id: 'psych_4',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'personality',
    question: 'I prefer structured environments with clear processes and procedures.',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    }
  },
  {
    id: 'psych_5',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'motivation',
    question: 'I am motivated by improving systems and processes for long-term benefit.',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    }
  },

  // Technical & Aptitude Section
  {
    id: 'tech_1',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'domain_knowledge',
    question: 'What does SLA stand for in support operations?',
    options: [
      'Service Level Agreement',
      'Support Level Analysis',
      'System Level Automation',
      'Service Line Application'
    ]
  },
  {
    id: 'tech_2',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'tools',
    question: 'Which of these is typically used for ticket management in support operations?',
    options: [
      'Zendesk',
      'Photoshop',
      'AutoCAD',
      'Final Cut Pro'
    ]
  },
  {
    id: 'tech_3',
    type: 'scenario',
    category: 'technical',
    subcategory: 'logical_reasoning',
    question: 'A support team receives 100 tickets daily. High priority tickets must be resolved within 4 hours, medium priority within 24 hours, and low priority within 72 hours. If 20% are high priority, 50% are medium, and 30% are low priority, what is the maximum number of high priority tickets the team should handle per day to meet SLA?',
    options: [
      '20 tickets',
      '15 tickets',
      '25 tickets',
      '10 tickets'
    ]
  },
  {
    id: 'tech_4',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'processes',
    question: 'What is the primary purpose of escalation protocols in support operations?',
    options: [
      'To ensure complex issues reach appropriate expertise levels',
      'To increase ticket volume',
      'To reduce customer satisfaction',
      'To eliminate the need for documentation'
    ]
  },

  // WISCAR Framework
  {
    id: 'wiscar_will_1',
    type: 'scenario',
    category: 'wiscar',
    subcategory: 'will',
    question: 'You encounter a repetitive process that could be improved, but it would require extra effort to document and propose changes. What would you do?',
    options: [
      'Continue with the current process to avoid extra work',
      'Document the issue and propose improvements despite extra effort',
      'Mention it to someone else and hope they handle it',
      'Wait for someone else to notice the problem'
    ]
  },
  {
    id: 'wiscar_interest_1',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'interest',
    question: 'I genuinely enjoy analyzing data to identify trends and improvement opportunities.',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    }
  },
  {
    id: 'wiscar_skill_1',
    type: 'multiple-choice',
    category: 'wiscar',
    subcategory: 'skill',
    question: 'How would you rate your current proficiency with CRM and ticketing systems?',
    options: [
      'Expert - I can configure and optimize these systems',
      'Advanced - I can use advanced features effectively',
      'Intermediate - I can handle most common tasks',
      'Beginner - I have basic familiarity',
      'No experience - I would need training'
    ]
  },
  {
    id: 'wiscar_cognitive_1',
    type: 'scenario',
    category: 'wiscar',
    subcategory: 'cognitive',
    question: 'Your team is experiencing longer resolution times. How would you approach diagnosing the problem?',
    options: [
      'Ask team members what they think is wrong',
      'Analyze ticket data to identify patterns and bottlenecks',
      'Wait for management to address it',
      'Suggest hiring more people'
    ]
  },
  {
    id: 'wiscar_learning_1',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'ability_to_learn',
    question: 'I actively seek feedback on my work and use it to improve.',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    }
  },
  {
    id: 'wiscar_real_world_1',
    type: 'scenario',
    category: 'wiscar',
    subcategory: 'real_world_alignment',
    question: 'A customer escalates a complaint about slow response times. As a Support Operations Coordinator, what would be your primary focus?',
    options: [
      'Apologize to the customer and move on',
      'Investigate the root cause and implement process improvements',
      'Blame the support team for poor performance',
      'Escalate to management immediately'
    ]
  },
  
  // Additional questions for comprehensive assessment
  {
    id: 'psych_6',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'personality',
    question: 'I work well under pressure and can maintain quality when managing multiple priorities.',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    }
  },
  {
    id: 'tech_5',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'metrics',
    question: 'Which metric is most important for measuring support team efficiency?',
    options: [
      'First Response Time',
      'Number of tickets closed',
      'Customer Satisfaction Score',
      'All of the above are important'
    ]
  },
  {
    id: 'wiscar_will_2',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'will',
    question: 'I am willing to learn new tools and technologies to improve operational efficiency.',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    }
  }
];

export const questionsBySection = {
  psychometric: assessmentQuestions.filter(q => q.category === 'psychometric'),
  technical: assessmentQuestions.filter(q => q.category === 'technical'),
  wiscar: assessmentQuestions.filter(q => q.category === 'wiscar')
};