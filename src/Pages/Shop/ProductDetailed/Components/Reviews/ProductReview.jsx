import React, { useState, useContext, useEffect } from "react";
import Container from "Components/Container/Container";
import ReviewsForm from "./Components/ReviewsForm";
import ReviewDisplay from "./Components/ReviewDisplay";

// Context
import { UserLoginContext } from "context/Auth/UserLoginContext";

// Fetching data
import usePostDataTokenJson from "Hooks/Fetching/usePostDataTokenJson";
import useGetDataToken from "Hooks/Fetching/useGetDataToken";
import useGetData from "Hooks/Fetching/useGetData";
import Spinner from "Components/RequestHandler/Spinner";

const ProductReview = ({ isSignIn, product_id }) => {
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState("");
  const [formIsNotValid, setFormIsNotValid] = useState(false);
  const { userToken, userIsSignIn } = useContext(UserLoginContext);

  // Handling data
  // // get data
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [myReviewId, setMyReviewId] = useState(null);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  // delet handler
  const [deletIsLoading, setDeletIsLoading] = useState(false);
  const { error, fetchData } = useGetDataToken();

  // post data
  const { postData, loading: submitDataLoading } = usePostDataTokenJson();

  const submitNewReviewHandler = async () => {
    setFormIsNotValid(false);
    if (!newReview || !newRating) {
      setFormIsNotValid(true);
      return;
    }

    const data = {
      stars_count: newRating,
      review_text: newReview,
    };

    try {
      await postData(`reviews/${product_id}`, data, userToken);
      await getReview();
      setNewReview("");
      setNewRating("");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const getReview = async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      const result = await fetchData(`reviews/${product_id}`, userToken);

      setReviews(result);

      // Find the review with my_review true and set its ID
      const myReview = result.data?.[0].review_ids?.find(
        (review) => review?.my_review === true
      );
      if (myReview) {
        setMyReviewId(myReview.id);
      }

      setAlreadySubmitted(
        result.data?.[0].review_ids?.some((review) => review.my_review === true)
      );
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const deletReviewhandler = async () => {
    setDeletIsLoading(true);
    try {
      const data = await fetchData(
        `reviews/delete/${product_id}?review_ids=[${myReviewId}]`,
        userToken
      );
      if (data?.data) {
        setReviews(data);
        setAlreadySubmitted(false);
      }
    } catch (error) {
    } finally {
      setDeletIsLoading(false);
    }
  };

  useEffect(() => {
    getReview();
  }, [product_id, userIsSignIn, userToken]);

  return (
    <div className="my-primary">
      <Container>
        <h1 className="text-2xl lg:text-3xl rb-bold text-center mb-4">
          Read what people are saying
        </h1>

        {isSignIn && (
          <ReviewsForm
            onHandleNewReview={setNewReview}
            isLoading={submitDataLoading}
            onHandleNewRating={setNewRating}
            newReview={newReview}
            alreadySubmitted={alreadySubmitted}
            newRating={newRating}
            formIsNotValid={formIsNotValid}
            onSubmitNewReview={submitNewReviewHandler}
          />
        )}
        {isLoading && (
          <div className="mt-10">
            <Spinner />
            <p>Loading data ....</p>
          </div>
        )}

        {!isLoading && (
          <ReviewDisplay
            data={reviews}
            myReviewId={myReviewId}
            isLoading={deletIsLoading}
            onHandleDelet={deletReviewhandler}
          />
        )}
      </Container>
    </div>
  );
};

export default ProductReview;
