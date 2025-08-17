import { Card } from '@/components/ui/card';

interface WiscarChartProps {
  scores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability_to_learn: number;
    real_world_alignment: number;
  };
}

export const WiscarChart = ({ scores }: WiscarChartProps) => {
  const categories = [
    { key: 'will', label: 'Will', value: scores.will },
    { key: 'interest', label: 'Interest', value: scores.interest },
    { key: 'skill', label: 'Skill', value: scores.skill },
    { key: 'cognitive', label: 'Cognitive', value: scores.cognitive },
    { key: 'ability_to_learn', label: 'Learning', value: scores.ability_to_learn },
    { key: 'real_world_alignment', label: 'Alignment', value: scores.real_world_alignment }
  ];

  const maxValue = 100;
  const centerX = 150;
  const centerY = 150;
  const radius = 100;
  
  // Calculate polygon points
  const points = categories.map((category, index) => {
    const angle = (index * 2 * Math.PI) / categories.length - Math.PI / 2;
    const value = (category.value / maxValue) * radius;
    const x = centerX + Math.cos(angle) * value;
    const y = centerY + Math.sin(angle) * value;
    return `${x},${y}`;
  }).join(' ');

  // Calculate label positions
  const labelPositions = categories.map((category, index) => {
    const angle = (index * 2 * Math.PI) / categories.length - Math.PI / 2;
    const labelRadius = radius + 30;
    const x = centerX + Math.cos(angle) * labelRadius;
    const y = centerY + Math.sin(angle) * labelRadius;
    return { x, y, label: category.label, value: category.value };
  });

  return (
    <div className="w-full">
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        {/* Background circles */}
        {[20, 40, 60, 80, 100].map((percent) => (
          <circle
            key={percent}
            cx={centerX}
            cy={centerY}
            r={(percent / 100) * radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            opacity="0.3"
          />
        ))}
        
        {/* Grid lines */}
        {categories.map((_, index) => {
          const angle = (index * 2 * Math.PI) / categories.length - Math.PI / 2;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          return (
            <line
              key={index}
              x1={centerX}
              y1={centerY}
              x2={x}
              y2={y}
              stroke="hsl(var(--border))"
              strokeWidth="1"
              opacity="0.3"
            />
          );
        })}
        
        {/* Score polygon */}
        <polygon
          points={points}
          fill="hsl(var(--primary) / 0.2)"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />
        
        {/* Score dots */}
        {categories.map((category, index) => {
          const angle = (index * 2 * Math.PI) / categories.length - Math.PI / 2;
          const value = (category.value / maxValue) * radius;
          const x = centerX + Math.cos(angle) * value;
          const y = centerY + Math.sin(angle) * value;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="4"
              fill="hsl(var(--primary))"
            />
          );
        })}
      </svg>
      
      {/* Labels and values */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {categories.map((category) => (
          <div key={category.key} className="text-center">
            <div className="text-sm font-medium text-foreground">{category.label}</div>
            <div className="text-lg font-bold text-primary">{category.value}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};