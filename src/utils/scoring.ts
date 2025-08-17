import { Answer, AssessmentResult, ScoreBreakdown } from '@/types/assessment';
import { assessmentQuestions } from '@/data/questions';

export function calculateAssessmentResults(answers: Answer[]): AssessmentResult {
  const answerMap = new Map(answers.map(a => [a.questionId, a.value]));
  
  // Calculate Psychometric Score
  const psychometricQuestions = assessmentQuestions.filter(q => q.category === 'psychometric');
  const psychScore = calculateCategoryScore(psychometricQuestions, answerMap);
  
  // Calculate Technical Score
  const technicalQuestions = assessmentQuestions.filter(q => q.category === 'technical');
  const techScore = calculateTechnicalScore(technicalQuestions, answerMap);
  
  // Calculate WISCAR Scores
  const wiscarScores = calculateWiscarScores(answerMap);
  
  // Overall confidence score
  const wiscarValues = Object.values(wiscarScores) as number[];
  const wiscarAverage = wiscarValues.reduce((sum: number, score: number) => sum + score, 0) / 6;
  const confidenceScore = Math.round(
    (psychScore * 0.3 + techScore * 0.3 + wiscarAverage * 0.4)
  );
  
  const scores: ScoreBreakdown = {
    psychological_fit: psychScore,
    technical_readiness: techScore,
    wiscar: wiscarScores,
    confidence_score: confidenceScore
  };
  
  // Determine recommendation
  let recommendation: 'YES' | 'MAYBE' | 'NO';
  if (confidenceScore >= 80) recommendation = 'YES';
  else if (confidenceScore >= 60) recommendation = 'MAYBE';
  else recommendation = 'NO';
  
  // Generate insights
  const insights = generateInsights(scores, answerMap);
  
  return {
    scores,
    recommendation,
    skillGaps: generateSkillGaps(scores),
    nextSteps: generateNextSteps(recommendation, scores),
    careerMatches: generateCareerMatches(recommendation),
    alternativePaths: generateAlternativePaths(recommendation),
    insights
  };
}

function calculateCategoryScore(questions: any[], answerMap: Map<string, any>): number {
  let totalScore = 0;
  let maxScore = 0;
  
  questions.forEach(q => {
    const answer = answerMap.get(q.id);
    if (answer !== undefined) {
      if (q.type === 'likert') {
        totalScore += Number(answer);
        maxScore += 5;
      } else if (q.type === 'multiple-choice' || q.type === 'scenario') {
        // Award points based on correct answers or good choices
        const points = getMultipleChoiceScore(q.id, answer);
        totalScore += points;
        maxScore += 5;
      }
    }
  });
  
  return Math.round((totalScore / maxScore) * 100);
}

function calculateTechnicalScore(questions: any[], answerMap: Map<string, any>): number {
  let totalScore = 0;
  let maxScore = 0;
  
  questions.forEach(q => {
    const answer = answerMap.get(q.id);
    if (answer !== undefined) {
      const points = getTechnicalQuestionScore(q.id, answer);
      totalScore += points;
      maxScore += 5;
    }
  });
  
  return Math.round((totalScore / maxScore) * 100);
}

function calculateWiscarScores(answerMap: Map<string, any>) {
  const wiscarCategories = ['will', 'interest', 'skill', 'cognitive', 'ability_to_learn', 'real_world_alignment'];
  const scores: any = {};
  
  wiscarCategories.forEach(category => {
    const questions = assessmentQuestions.filter(q => 
      q.category === 'wiscar' && q.subcategory === category
    );
    
    let totalScore = 0;
    let maxScore = 0;
    
    questions.forEach(q => {
      const answer = answerMap.get(q.id);
      if (answer !== undefined) {
        if (q.type === 'likert') {
          totalScore += Number(answer);
          maxScore += 5;
        } else {
          const points = getWiscarQuestionScore(q.id, answer);
          totalScore += points;
          maxScore += 5;
        }
      }
    });
    
    scores[category] = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 75;
  });
  
  return scores;
}

function getTechnicalQuestionScore(questionId: string, answer: any): number {
  const correctAnswers: { [key: string]: string } = {
    'tech_1': 'Service Level Agreement',
    'tech_2': 'Zendesk',
    'tech_3': '20 tickets',
    'tech_4': 'To ensure complex issues reach appropriate expertise levels',
    'tech_5': 'All of the above are important'
  };
  
  return correctAnswers[questionId] === answer ? 5 : 2;
}

function getMultipleChoiceScore(questionId: string, answer: any): number {
  // Award points based on the quality of the choice
  const scoringRules: { [key: string]: { [key: string]: number } } = {
    'wiscar_skill_1': {
      'Expert - I can configure and optimize these systems': 5,
      'Advanced - I can use advanced features effectively': 4,
      'Intermediate - I can handle most common tasks': 3,
      'Beginner - I have basic familiarity': 2,
      'No experience - I would need training': 1
    }
  };
  
  return scoringRules[questionId]?.[answer] || 3;
}

function getWiscarQuestionScore(questionId: string, answer: any): number {
  const bestAnswers: { [key: string]: string } = {
    'wiscar_will_1': 'Document the issue and propose improvements despite extra effort',
    'wiscar_cognitive_1': 'Analyze ticket data to identify patterns and bottlenecks',
    'wiscar_real_world_1': 'Investigate the root cause and implement process improvements'
  };
  
  if (bestAnswers[questionId] === answer) return 5;
  if (questionId === 'wiscar_skill_1') return getMultipleChoiceScore(questionId, answer);
  return 3;
}

function generateInsights(scores: ScoreBreakdown, answerMap: Map<string, any>) {
  const strengths: string[] = [];
  const improvements: string[] = [];
  
  if (scores.wiscar.will >= 80) strengths.push("Strong motivation and drive");
  if (scores.wiscar.interest >= 80) strengths.push("Genuine interest in support operations");
  if (scores.technical_readiness >= 80) strengths.push("Solid technical foundation");
  if (scores.wiscar.cognitive >= 80) strengths.push("Excellent analytical thinking");
  
  if (scores.technical_readiness < 70) improvements.push("Technical skills and tool familiarity");
  if (scores.wiscar.skill < 70) improvements.push("Hands-on experience with support tools");
  if (scores.psychological_fit < 70) improvements.push("Organizational and detail-oriented skills");
  
  let personality = "Balanced professional";
  if (scores.psychological_fit >= 85) personality = "Highly organized and detail-oriented";
  if (scores.wiscar.interest >= 85) personality = "Passionate about operational excellence";
  
  return { strengths, improvements, personality };
}

function generateSkillGaps(scores: ScoreBreakdown): string[] {
  const gaps: string[] = [];
  
  if (scores.technical_readiness < 70) {
    gaps.push("CRM and ticketing system proficiency");
    gaps.push("Data analysis and reporting skills");
  }
  if (scores.wiscar.skill < 70) {
    gaps.push("Process optimization techniques");
  }
  if (scores.psychological_fit < 70) {
    gaps.push("Project coordination and time management");
  }
  
  return gaps;
}

function generateNextSteps(recommendation: string, scores: ScoreBreakdown): string[] {
  const steps: string[] = [];
  
  if (recommendation === 'YES') {
    steps.push("Apply for Support Operations Coordinator positions");
    steps.push("Highlight your analytical and organizational strengths");
    steps.push("Consider obtaining ITIL certification");
  } else if (recommendation === 'MAYBE') {
    steps.push("Complete CRM training course (Salesforce/Zendesk)");
    steps.push("Practice with support metrics and KPI analysis");
    steps.push("Gain experience through internships or volunteer projects");
  } else {
    steps.push("Focus on developing organizational and analytical skills");
    steps.push("Consider entry-level customer support roles first");
    steps.push("Build familiarity with basic support tools");
  }
  
  return steps;
}

function generateCareerMatches(recommendation: string): string[] {
  if (recommendation === 'YES') {
    return [
      "Support Operations Coordinator",
      "Customer Success Operations Specialist",
      "Service Delivery Manager",
      "CRM Administrator"
    ];
  } else if (recommendation === 'MAYBE') {
    return [
      "Junior Support Operations Coordinator",
      "Customer Support Specialist",
      "Data Entry Specialist",
      "Process Improvement Assistant"
    ];
  } else {
    return [
      "Customer Support Representative",
      "Administrative Assistant",
      "Data Entry Clerk",
      "Junior Business Analyst"
    ];
  }
}

function generateAlternativePaths(recommendation: string): string[] {
  if (recommendation === 'NO') {
    return [
      "Customer Support Representative",
      "Office Administrator",
      "Data Entry Specialist",
      "Junior Project Coordinator"
    ];
  }
  return [];
}