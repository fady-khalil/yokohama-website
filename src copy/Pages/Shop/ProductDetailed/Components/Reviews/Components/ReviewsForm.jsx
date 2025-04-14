import { PaperPlaneRight } from "@phosphor-icons/react";
import Spinner from "Components/RequestHandler/Spinner";

const ReviewsForm = ({
  onHandleNewReview,
  newReview,
  onHandleNewRating,
  newRating,
  formIsNotValid,
  onSubmitNewReview,
  alreadySubmitted,
  isLoading,
}) => {
  return (
    <div className="bg-[#efefef] p-2 lg:p-4 rounded-sm">
      <div className="flex flex-col md:flex-row items-center">
        <span className="text-lg font-semibold mr-2">Rate the product!</span>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              onClick={() => !alreadySubmitted && onHandleNewRating(star)}
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
      {formIsNotValid && (
        <p className="text-red-400">
          Please ensure you have provided both a review and a rating before
          submitting your feedback.
        </p>
      )}

      <div className="bg-white  p-2 lg:p-4 flex items-center justify-between gap-x-6 mt-4 rounded-md ">
        <textarea
          disabled={alreadySubmitted}
          className="flex-1"
          value={newReview}
          onChange={(e) => onHandleNewReview(e.target.value)}
          placeholder="Type your review here..."
        />
        <button onClick={onSubmitNewReview}>
          {isLoading && <Spinner />}
          {!isLoading && <PaperPlaneRight size={26} />}
        </button>
      </div>
    </div>
  );
};

export default ReviewsForm;
