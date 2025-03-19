// components/ReviewItem.tsx
import React from 'react';

// Define a type for the review object
type Review = {
  text: string;
  avatar: React.ReactNode;
  author: string;
  country: string;
}

// Define props type
type ReviewItemProps = {
  review: Review;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  return (
    <div className="border-b pb-4 last:border-b-0">
      <p className="text-sm mb-2">"{review.text}"</p>
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-red-100 text-black flex items-center justify-center mr-2 font-medium">
          {review.avatar}
        </div>
        <div>
          <div className="font-medium text-sm">{review.author}</div>
          <div className="text-xs text-gray-500">{review.country}</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;