import { Trash } from "@phosphor-icons/react";
import Spinner from "Components/RequestHandler/Spinner";

const ReviewDisplay = ({ data, myReviewId, onHandleDelet, isLoading }) => {
  if (!data || data.all === 0) {
    return (
      <div className="mt-6 text-center text-gray-500">
        <p>No reviews yet.</p>
        <p>Write a review and be the first one!</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="text-lg font-semibold mb-2">{data.all} Reviews</div>
      {data?.data?.[0]?.review_ids?.map(
        ({ review_text, stars_count, date, my_review, user_id, id }, index) => (
          <div key={id} className={`border-b border-gray-200 py-4 `}>
            <div className="flex items-center justify-between mb-1">
              <span>
                <span className="text-lg font-semibold">{user_id.name}</span>
                <div className="flex ml-2">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-4 h-4 ${
                        index < stars_count ? "text-primary" : "text-gray-400"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
                    </svg>
                  ))}
                </div>
              </span>
              {myReviewId === id && (
                <button onClick={onHandleDelet} className="text-primary">
                  {!isLoading && <Trash size={26} />}

                  {isLoading && <Spinner />}
                </button>
              )}
            </div>
            <div className="text-gray-700">{review_text}</div>
          </div>
        )
      )}
    </div>
  );
};

export default ReviewDisplay;
