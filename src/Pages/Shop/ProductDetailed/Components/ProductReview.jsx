import React, { useState } from "react";
import Container from "Components/Container/Container";
import { PaperPlaneRight } from "@phosphor-icons/react";
const ProductReview = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: "Joyce Attoue",
      rating: 2,
      text: "The women's hunting Extrelle HeatDry jacket is designed to satisfy the most demanding hunters when and where it is essential not to be heard and to give maximum comfort. It is waterproof, windproof and very breathable thanks to...",
    },
    {
      id: 2,
      author: "Joyce Attoue",
      rating: 2,
      text: "Designed to satisfy the most demanding hunters when and where it is essential not to be heard and to give maximum comfort. It is waterproof, windproof and very breathable thanks to...",
    },
  ]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);

  const handleReviewSubmit = () => {
    const newReviewObj = {
      id: reviews.length + 1,
      author: "Anonymous",
      rating: newRating,
      text: newReview,
    };
    setReviews([...reviews, newReviewObj]);
    setNewReview("");
    setNewRating(0);
  };

  return (
    <div className="my-secondary">
      <Container>
        <h1 className="text-3xl rb-bold text-center  mb-4">
          Read what people are saying
        </h1>
        <div className="bg-[#efefef] p-4 rounded-sm">
          <div>
            <div className="flex items-center">
              <span className="text-lg font-semibold mr-2">
                Rate the product!
              </span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    onClick={() => setNewRating(star)}
                    className={`w-6 h-6 cursor-pointer ${
                      star <= newRating ? "text-primary" : "text-gray-400"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white p-4 flex items-center justify-between gap-x-32 mt-4 rounded-md ">
            <textarea
              className="flex-1"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Type your review here..."
            />
            <button onClick={handleReviewSubmit} className="">
              <PaperPlaneRight size={26} />
            </button>
          </div>
        </div>
        <div className="mt-6">
          <div className="text-lg font-semibold mb-2">
            {reviews.length} Reviews
          </div>
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 py-4">
              <div className="flex items-center mb-1">
                <span className="text-lg font-semibold">{review.author}</span>
                <div className="flex ml-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating ? "text-primary" : "text-gray-400"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="text-gray-700">{review.text}</div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ProductReview;
