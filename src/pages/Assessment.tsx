import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { QuestionComponent } from '@/components/assessment/QuestionComponent';
import { assessmentQuestions, questionsBySection } from '@/data/questions';
import { Answer, AssessmentData } from '@/types/assessment';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    answers: [],
    timeSpent: 0,
    startTime: Date.now(),
    completedSections: []
  });

  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / assessmentQuestions.length) * 100;

  // Get current section info
  const getCurrentSection = () => {
    if (currentQuestionIndex < questionsBySection.psychometric.length) return 'Psychological Assessment';
    if (currentQuestionIndex < questionsBySection.psychometric.length + questionsBySection.technical.length) return 'Technical Assessment';
    return 'WISCAR Framework';
  };

  const handleAnswer = (value: number | string) => {
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      value,
      timestamp: Date.now()
    };

    setAssessmentData(prev => ({
      ...prev,
      answers: [...prev.answers.filter(a => a.questionId !== currentQuestion.id), newAnswer]
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Assessment complete, navigate to results
      const finalData = {
        ...assessmentData,
        timeSpent: Date.now() - assessmentData.startTime
      };
      
      // Store results in localStorage for the results page
      localStorage.setItem('assessmentData', JSON.stringify(finalData));
      navigate('/results');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const currentAnswer = assessmentData.answers.find(a => a.questionId === currentQuestion.id);
  const canProceed = currentAnswer !== undefined;

  return (
    <div className="min-h-screen bg-assessment-gradient px-6 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={handleBackToHome}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">Career Assessment</h1>
            <div className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {assessmentQuestions.length}
            </div>
          </div>
          
          <Progress value={progress} className="mb-2" />
          <div className="text-sm text-muted-foreground">
            {getCurrentSection()} • {Math.round(progress)}% Complete
          </div>
        </div>

        {/* Question Card */}
        <Card className="shadow-elegant mb-8">
          <CardHeader>
            <CardTitle className="text-lg">
              {getCurrentSection()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <QuestionComponent
              question={currentQuestion}
              value={currentAnswer?.value}
              onChange={handleAnswer}
            />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            variant={currentQuestionIndex === assessmentQuestions.length - 1 ? "success" : "default"}
          >
            {currentQuestionIndex === assessmentQuestions.length - 1 ? "Complete Assessment" : "Next"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Progress Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Estimated time remaining: {Math.max(1, Math.round((assessmentQuestions.length - currentQuestionIndex - 1) * 1.5))} minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default Assessment;