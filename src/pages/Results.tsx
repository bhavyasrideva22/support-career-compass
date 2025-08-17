import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AssessmentData, AssessmentResult } from '@/types/assessment';
import { calculateAssessmentResults } from '@/utils/scoring';
import { WiscarChart } from '@/components/assessment/WiscarChart';
import { 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  TrendingUp, 
  Target, 
  BookOpen,
  ArrowLeft,
  Download
} from 'lucide-react';

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const assessmentDataString = localStorage.getItem('assessmentData');
    
    if (!assessmentDataString) {
      navigate('/');
      return;
    }

    try {
      const assessmentData: AssessmentData = JSON.parse(assessmentDataString);
      const calculatedResults = calculateAssessmentResults(assessmentData.answers);
      setResults(calculatedResults);
    } catch (error) {
      console.error('Error processing assessment results:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleRetakeAssessment = () => {
    localStorage.removeItem('assessmentData');
    navigate('/assessment');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'YES':
        return <CheckCircle2 className="h-6 w-6 text-success" />;
      case 'MAYBE':
        return <AlertCircle className="h-6 w-6 text-warning" />;
      case 'NO':
        return <XCircle className="h-6 w-6 text-destructive" />;
      default:
        return null;
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'YES':
        return 'text-success';
      case 'MAYBE':
        return 'text-warning';
      case 'NO':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getRecommendationMessage = (recommendation: string, score: number) => {
    switch (recommendation) {
      case 'YES':
        return `Excellent! With a confidence score of ${score}%, you have a strong profile for Support Operations Coordination. Your skills, interests, and mindset align well with this career path.`;
      case 'MAYBE':
        return `Good potential! With a confidence score of ${score}%, you show promise for Support Operations Coordination but may benefit from developing certain skills first.`;
      case 'NO':
        return `While Support Operations Coordination might not be the ideal fit right now (confidence score: ${score}%), there are alternative paths that could lead you there or to similar roles.`;
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-assessment-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Analyzing your results...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-assessment-gradient flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">Error loading results. Please try again.</p>
          <Button onClick={handleBackToHome} className="mt-4">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-assessment-gradient px-6 py-8">
      <div className="mx-auto max-w-6xl">
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
          
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Assessment Results</h1>
          <p className="text-muted-foreground">
            Support Operations Coordinator Career Readiness Report
          </p>
        </div>

        {/* Main Recommendation */}
        <Card className="shadow-elegant mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              {getRecommendationIcon(results.recommendation)}
              <span className={getRecommendationColor(results.recommendation)}>
                {results.recommendation === 'YES' ? 'Highly Recommended' : 
                 results.recommendation === 'MAYBE' ? 'Potential Match' : 'Consider Alternatives'}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Confidence Score</span>
                <span className="text-2xl font-bold text-primary">
                  {results.scores.confidence_score}%
                </span>
              </div>
              <Progress value={results.scores.confidence_score} className="mb-4" />
            </div>
            
            <p className="text-foreground leading-relaxed">
              {getRecommendationMessage(results.recommendation, results.scores.confidence_score)}
            </p>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Detailed Scores */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Detailed Scores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Psychological Fit</span>
                  <span>{results.scores.psychological_fit}%</span>
                </div>
                <Progress value={results.scores.psychological_fit} />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Technical Readiness</span>
                  <span>{results.scores.technical_readiness}%</span>
                </div>
                <Progress value={results.scores.technical_readiness} />
              </div>

              <div className="pt-2">
                <h4 className="font-medium mb-3">WISCAR Framework</h4>
                <div className="space-y-2">
                  {Object.entries(results.scores.wiscar).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="capitalize">{key.replace('_', ' ')}</span>
                        <span>{value}%</span>
                      </div>
                      <Progress value={value} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* WISCAR Radar Chart */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>WISCAR Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <WiscarChart scores={results.scores.wiscar} />
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Insights */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Your Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.insights.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{strength}</span>
                  </div>
                ))}
                <div className="mt-4 p-3 bg-primary/10 rounded-md">
                  <p className="text-sm font-medium text-primary">Personality Profile</p>
                  <p className="text-sm text-muted-foreground">{results.insights.personality}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Improvement Areas */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Development Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.insights.improvements.map((improvement, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{improvement}</span>
                  </div>
                ))}
                
                {results.skillGaps.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Skill Gaps to Address:</p>
                    <div className="space-y-1">
                      {results.skillGaps.map((gap, index) => (
                        <Badge key={index} variant="outline" className="mr-1 mb-1">
                          {gap}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Recommended Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center font-medium">
                      {index + 1}
                    </span>
                    <span className="text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Career Matches */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle>Career Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3 text-success">Recommended Roles</h4>
                <div className="space-y-2">
                  {results.careerMatches.map((role, index) => (
                    <Badge key={index} variant="outline" className="mr-1 mb-1 border-success text-success">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {results.alternativePaths.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3 text-muted-foreground">Alternative Paths</h4>
                  <div className="space-y-2">
                    {results.alternativePaths.map((path, index) => (
                      <Badge key={index} variant="outline" className="mr-1 mb-1">
                        {path}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={handleRetakeAssessment} variant="outline">
            Retake Assessment
          </Button>
          <Button onClick={() => window.print()} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Save Results
          </Button>
          <Button onClick={handleBackToHome} variant="hero">
            Explore More Careers
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;