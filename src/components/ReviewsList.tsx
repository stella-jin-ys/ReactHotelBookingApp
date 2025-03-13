// components/ReviewsList.tsx
import React from 'react';
import ReviewItem from './ReviewItem';

// Define an interface for the review object
interface Review {
  text: string;
  author: string;
  country: string;
  avatar: string | React.ReactNode;
}

const ReviewsList: React.FC = () => {
  // Sample reviews
  const reviews: Review[] = [
    {
      text: "TThe culinary experience truly exceeded my expectations. Although the prices were a bit on the higher side, the quality and variety of dishes made every meal memorable.",
      author: "Isabella",
      country: "Italy",
      avatar: "I"
    },
    {
      text: "I loved the cozy room, superb service, and unbeatable location. It made for a thoroughly relaxing stay.",
      author: "Marco",
      country: "Spain",
      avatar: "M"
    },
    {
      text: "The entire facility was immaculate, and the friendly staff went out of their way to ensure my comfort. The spacious rooms were a delightful bonus.",
      author: "Avery",
      country: "Canada",
      avatar: "A"
    },
    {
      text: "Situated right in the heart of the city and close to major transport hubs, this hotel was the ideal base for exploring the local attractions.",
      author: "Nadia ",
      country: "United States",
      avatar: "N"
    }
  ];

  return (
    <div className="space-y-4 mb-6">
      {reviews.map((review, idx) => (
        <ReviewItem key={idx} review={review} />
      ))}
    </div>
  );
};

export default ReviewsList;