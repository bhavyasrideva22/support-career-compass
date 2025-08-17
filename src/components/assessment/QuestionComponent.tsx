import { Question } from '@/types/assessment';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface QuestionComponentProps {
  question: Question;
  value?: number | string;
  onChange: (value: number | string) => void;
}

export const QuestionComponent = ({ question, value, onChange }: QuestionComponentProps) => {
  const renderLikertScale = () => {
    if (!question.likertScale) return null;
    
    const { min, max, minLabel, maxLabel } = question.likertScale;
    const options = [];
    
    for (let i = min; i <= max; i++) {
      options.push(i);
    }
    
    return (
      <div className="space-y-4">
        <p className="text-lg font-medium text-foreground mb-6">{question.question}</p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
        
        <div className="flex justify-between gap-2">
          {options.map(option => (
            <Button
              key={option}
              variant={value === option ? "default" : "outline"}
              onClick={() => onChange(option)}
              className="flex-1 h-12 text-lg font-semibold"
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  const renderMultipleChoice = () => {
    if (!question.options) return null;
    
    return (
      <div className="space-y-4">
        <p className="text-lg font-medium text-foreground mb-6">{question.question}</p>
        
        <div className="grid gap-3">
          {question.options.map((option, index) => (
            <Card
              key={index}
              className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-card ${
                value === option 
                  ? 'ring-2 ring-primary bg-primary/5' 
                  : 'hover:bg-muted/50'
              }`}
              onClick={() => onChange(option)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  value === option 
                    ? 'bg-primary border-primary' 
                    : 'border-muted-foreground'
                }`} />
                <span className="text-foreground">{option}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderScenario = () => {
    return renderMultipleChoice(); // Scenarios use the same UI as multiple choice
  };

  const renderBoolean = () => {
    return (
      <div className="space-y-4">
        <p className="text-lg font-medium text-foreground mb-6">{question.question}</p>
        
        <div className="flex gap-4">
          <Button
            variant={value === 'yes' ? "default" : "outline"}
            onClick={() => onChange('yes')}
            className="flex-1 h-12"
          >
            Yes
          </Button>
          <Button
            variant={value === 'no' ? "default" : "outline"}
            onClick={() => onChange('no')}
            className="flex-1 h-12"
          >
            No
          </Button>
        </div>
      </div>
    );
  };

  switch (question.type) {
    case 'likert':
      return renderLikertScale();
    case 'multiple-choice':
      return renderMultipleChoice();
    case 'scenario':
      return renderScenario();
    case 'boolean':
      return renderBoolean();
    default:
      return <div>Unknown question type</div>;
  }
};