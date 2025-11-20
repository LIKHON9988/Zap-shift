import React from "react";
import { Star } from "lucide-react";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 max-w-md w-full mx-auto group border border-gray-200">
      {/* Profile */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={review.user_photoURL}
            alt={review.userName}
            className="w-16 h-16 rounded-full border-2 border-gray-300 shadow-sm group-hover:scale-105 transition duration-300"
          />
          <span className="absolute bottom-0 right-0 bg-green-500 w-3 h-3 rounded-full border border-white"></span>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {review.userName}
          </h3>
          <p className="text-gray-500 text-sm">
            {new Date(review.date).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-4">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={20}
            className={
              index < Math.round(review.ratings)
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300"
            }
          />
        ))}
        <span className="ml-2 text-gray-700 text-sm font-medium">
          {review.ratings}
        </span>
      </div>

      {/* Review Text */}
      <p className="mt-5 text-gray-700 leading-relaxed bg-gray-100 p-4 rounded-xl border border-gray-200 italic">
        “{review.review}”
      </p>
    </div>
  );
};

export default ReviewCard;
