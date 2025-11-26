import React from "react";
import { Star } from "lucide-react";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 max-w-sm w-full mx-auto group border border-gray-200">
      {/* Profile */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={review.user_photoURL}
            alt={review.userName}
            className="w-12 h-12 rounded-full border border-gray-300 shadow-sm group-hover:scale-105 transition duration-300"
          />
          <span className="absolute bottom-0 right-0 bg-green-500 w-2.5 h-2.5 rounded-full border border-white"></span>
        </div>

        <div>
          <h3 className="text-md font-semibold text-gray-900">
            {review.userName}
          </h3>
          <p className="text-gray-500 text-xs">
            {new Date(review.date).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-2">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            className={
              index < Math.round(review.ratings)
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300"
            }
          />
        ))}
        <span className="ml-1 text-gray-700 text-xs font-medium">
          {review.ratings}
        </span>
      </div>

      {/* Review Text */}
      <p className="mt-3 text-gray-700 leading-relaxed bg-gray-100 p-3 rounded-lg border border-gray-200 italic text-sm">
        “{review.review}”
      </p>
    </div>
  );
};

export default ReviewCard;
