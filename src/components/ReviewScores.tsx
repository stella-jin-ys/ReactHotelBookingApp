// components/ReviewScores.tsx
import React from 'react';
import ReviewsList from './ReviewsList';
import ScoreCategory from './ScoreCategory';

// Define a type for category
type Category = {
  name: string;
  score: number;
}

const ReviewScores: React.FC = () => {
  const categories: Category[] = [
    { name: "Staff", score: 8.7 },
    { name: "Facilities", score: 8.1 },
    { name: "Cleanliness", score: 8.4 },
    { name: "Comfort", score: 8.5 },
    { name: "Value for money", score: 8.1 },
    { name: "Location", score: 9.0 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center mb-4">
        <div className="bg-red-100 text-black rounded w-12 h-12 flex items-center justify-center text-2xl font-bold mr-3">
          8.0
        </div>
        <div>
          <div className="font-medium">Very good</div>
          <div className="text-sm text-gray-500">8,687 reviews</div>
        </div>
      </div>

      <h3 className="font-medium mb-4">Guests who stayed here shared their feedback:</h3>
      <ReviewsList />

      <h3 className="font-medium mb-3 text-gray-500">Categories:</h3>
      <div className="space-y-3">
        {categories.map((category) => (
          <ScoreCategory 
            key={category.name}
            name={category.name}
            score={category.score}
            percentage={category.score * 10}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewScores;