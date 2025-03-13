// components/ScoreCategory.tsx
import React from 'react';

// Define interface for component props
interface ScoreCategoryProps {
  name: string;
  score: number;
  percentage: number;
}

const ScoreCategory: React.FC<ScoreCategoryProps> = ({ name, score, percentage }) => {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{name}</span>
        <span className="font-medium">{score}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded overflow-hidden">
        <div className="h-full bg-red-300" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export default ScoreCategory;