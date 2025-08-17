export interface Question {
  id: string;
  type: 'likert' | 'multiple-choice' | 'scenario' | 'boolean';
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory?: string;
  question: string;
  options?: string[];
  likertScale?: {
    min: number;
    max: number;
    minLabel: string;
    maxLabel: string;
  };
}

export interface Answer {
  questionId: string;
  value: number | string;
  timestamp: number;
}

export interface AssessmentData {
  answers: Answer[];
  timeSpent: number;
  startTime: number;
  completedSections: string[];
}

export interface ScoreBreakdown {
  psychological_fit: number;
  technical_readiness: number;
  wiscar: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability_to_learn: number;
    real_world_alignment: number;
  };
  confidence_score: number;
}

export interface AssessmentResult {
  scores: ScoreBreakdown;
  recommendation: 'YES' | 'MAYBE' | 'NO';
  skillGaps: string[];
  nextSteps: string[];
  careerMatches: string[];
  alternativePaths: string[];
  insights: {
    strengths: string[];
    improvements: string[];
    personality: string;
  };
}